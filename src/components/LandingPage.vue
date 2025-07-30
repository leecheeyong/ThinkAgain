<script setup>
import { ref } from "vue";
import { useAuth } from "../composables/useAuth.js";
import { useTheme } from "../composables/useTheme.js";
import UIComponents from "./UIComponents.vue";

const emit = defineEmits(["show-auth"]);

const { isAuthenticated } = useAuth();
const isLoading = ref(false);
const { isDark } = useTheme();

const showLogin = () => {
  emit("show-auth", "login");
};

const showRegister = () => {
  emit("show-auth", "register");
};
</script>

<template>
  <div
    :class="[
      'min-h-screen transition-colors duration-300',
      isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100',
    ]"
  >
    <div class="container mx-auto px-4 py-8">
      <header class="flex justify-between items-center mb-16">
        <div class="flex items-center space-x-3">
          <div
            :class="[
              'w-10 h-10 rounded-xl flex items-center justify-center',
              isDark ? 'bg-blue-600' : 'bg-blue-600',
            ]"
          >
            <img src="/logo.png" alt="Logo" class="w-8 h-8 object-contain rounded" />
          </div>
          <h1
            :class="[
              'text-2xl font-bold',
              isDark ? 'text-white' : 'text-gray-900',
            ]"
          >
            ThinkAgain
          </h1>
        </div>
        <UIComponents component="ThemeToggle" />
      </header>

      <div class="max-w-4xl mx-auto text-center mb-16">
        <h2
          :class="[
            'text-5xl md:text-6xl font-bold mb-6 leading-tight',
            isDark ? 'text-white' : 'text-gray-900',
          ]"
        >
          Challenge Your
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Perspective
          </span>
        </h2>
        <p
          :class="[
            'text-xl mb-8 leading-relaxed max-w-2xl mx-auto',
            isDark ? 'text-gray-300' : 'text-gray-600',
          ]"
        >
          Submit your thoughts, beliefs, and opinions. Get thoughtful AI-powered
          challenges that expand your mind and spark new insights.
        </p>
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <button
            @click="showLogin"
            class="px-10 py-4 text-lg font-bold rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            :disabled="isLoading"
            style="letter-spacing:0.02em;"
          >
            <UIComponents v-if="isLoading" component="LoadingSpinner" />
            <span v-else>Get Started</span>
          </button>
        </div>
      </div>

      <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
        <div class="text-center">
          <div
            :class="[
              'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4',
              isDark ? 'bg-blue-900' : 'bg-blue-100',
            ]"
          >
            <svg
              class="w-8 h-8"
              :class="isDark ? 'text-blue-400' : 'text-blue-600'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h4
            :class="[
              'text-lg font-semibold mb-2',
              isDark ? 'text-white' : 'text-gray-900',
            ]"
          >
            AI-Powered Insights
          </h4>
          <p :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            Get thoughtful challenges tailored to your unique perspective
          </p>
        </div>
        <div class="text-center">
          <div
            :class="[
              'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4',
              isDark ? 'bg-green-900' : 'bg-green-100',
            ]"
          >
            <svg
              class="w-8 h-8"
              :class="isDark ? 'text-green-400' : 'text-green-600'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h4
            :class="[
              'text-lg font-semibold mb-2',
              isDark ? 'text-white' : 'text-gray-900',
            ]"
          >
            Track Your Growth
          </h4>
          <p :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            Build daily reflection habits with streak tracking
          </p>
        </div>
        <div class="text-center">
          <div
            :class="[
              'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4',
              isDark ? 'bg-purple-900' : 'bg-purple-100',
            ]"
          >
            <svg
              class="w-8 h-8"
              :class="isDark ? 'text-purple-400' : 'text-purple-600'"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h4
            :class="[
              'text-lg font-semibold mb-2',
              isDark ? 'text-white' : 'text-gray-900',
            ]"
          >
            Personal History
          </h4>
          <p :class="isDark ? 'text-gray-400' : 'text-gray-600'">
            Review your journey of cognitive growth over time
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
