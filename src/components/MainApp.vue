<script setup>
import { ref, onMounted } from "vue";
import { useAuth } from "../composables/useAuth.js";
import { useThoughts } from "../composables/useThoughts.js";
import UIComponents from "./UIComponents.vue";
import ThoughtForm from "./ThoughtForm.vue";
import ThoughtHistory from "./ThoughtHistory.vue";
import { useTheme } from "../composables/useTheme.js";

const { user, logout } = useAuth();
const { streak } = useThoughts();
const { isDark } = useTheme();

const currentView = ref("form");

const showHistory = () => {
  currentView.value = "history";
};

const showForm = () => {
  currentView.value = "form";
};

const handleLogout = async () => {
  await logout();
};
</script>

<template>
  <div
    :class="[
      'min-h-screen transition-colors duration-300',
      isDark
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800'
        : 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50',
    ]"
  >
    <header
      :style="
        isDark
          ? {
              background: 'rgba(24,24,27,0.85)',
              color: '#fff',
              borderBottom: '1px solid #23232a',
              backdropFilter: 'blur(12px)',
            }
          : {
              background: 'rgba(255,255,255,0.85)',
              color: '#18181b',
              borderBottom: '1px solid #e5e7eb',
              backdropFilter: 'blur(12px)',
            }
      "
      class="px-0 py-0 shadow-lg"
    >
      <div class="container mx-auto px-4 py-4">
        <div class="flex flex-wrap items-center justify-between gap-y-4">
          <div class="flex flex-wrap items-center gap-3 min-w-0">
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style="
                background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
                box-shadow: 0 2px 12px rgba(124, 60, 237, 0.15);
              "
            >
              <img
                src="/logo.png"
                alt="Logo"
                class="w-8 h-8 object-contain rounded"
              />
            </div>
            <div class="min-w-0">
              <h1
                :style="
                  isDark
                    ? {
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        letterSpacing: '0.02em',
                      }
                    : {
                        color: '#18181b',
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        letterSpacing: '0.02em',
                      }
                "
                class="truncate"
              >
                ThinkAgain
              </h1>
              <div
                class="flex flex-wrap items-center gap-2 text-xs mt-1 min-w-0"
              >
                <span
                  :style="isDark ? { color: '#a1a1aa' } : { color: '#6b7280' }"
                  class="truncate max-w-[120px] sm:max-w-[200px]"
                  >{{ user?.email }}</span
                >
                <span
                  v-if="streak > 0"
                  class="flex items-center px-3 py-1 rounded-xl font-semibold"
                  :style="
                    isDark
                      ? {
                          background: 'linear-gradient(90deg,#3b82f6,#a78bfa)',
                          color: '#fff',
                          fontSize: '0.95rem',
                          boxShadow: '0 2px 8px rgba(59,130,246,0.12)',
                        }
                      : {
                          background: 'linear-gradient(90deg,#2563eb,#a78bfa)',
                          color: '#fff',
                          fontSize: '0.95rem',
                          boxShadow: '0 2px 8px rgba(59,130,246,0.12)',
                        }
                  "
                >
                  🔥 {{ streak }} day{{ streak === 1 ? "" : "s" }}
                </span>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto justify-end"
          >
            <div class="flex gap-2">
              <button
                @click="showForm"
                class="relative font-semibold text-base px-5 py-2 rounded-xl transition-all duration-200 focus:outline-none"
                :style="
                  currentView === 'form'
                    ? isDark
                      ? {
                          background: 'linear-gradient(90deg,#3b82f6,#a78bfa)',
                          color: '#fff',
                        }
                      : {
                          background: 'linear-gradient(90deg,#2563eb,#a78bfa)',
                          color: '#fff',
                        }
                    : isDark
                      ? { background: 'rgba(36,36,40,0.25)', color: '#a1a1aa' }
                      : {
                          background: 'rgba(255,255,255,0.25)',
                          color: '#6b7280',
                        }
                "
              >
                New Thought
              </button>
              <button
                @click="showHistory"
                class="relative font-semibold text-base px-5 py-2 rounded-xl transition-all duration-200 focus:outline-none"
                :style="
                  currentView === 'history'
                    ? isDark
                      ? {
                          background: 'linear-gradient(90deg,#3b82f6,#a78bfa)',
                          color: '#fff',
                        }
                      : {
                          background: 'linear-gradient(90deg,#2563eb,#a78bfa)',
                          color: '#fff',
                        }
                    : isDark
                      ? { background: 'rgba(36,36,40,0.25)', color: '#a1a1aa' }
                      : {
                          background: 'rgba(255,255,255,0.25)',
                          color: '#6b7280',
                        }
                "
              >
                History
              </button>
            </div>
            <UIComponents component="ThemeToggle" />
            <button
              @click="handleLogout"
              :style="
                isDark
                  ? { color: '#a1a1aa', background: 'transparent' }
                  : { color: '#6b7280', background: 'transparent' }
              "
              class="p-2 rounded-full focus:outline-none hover:bg-blue-100/30 transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <ThoughtForm v-if="currentView === 'form'" @show-history="showHistory" />
      <ThoughtHistory v-else-if="currentView === 'history'" @back="showForm" />
    </main>
  </div>
</template>
