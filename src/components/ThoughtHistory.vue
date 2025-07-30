<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useThoughts } from "../composables/useThoughts.js";
import { useTheme } from "../composables/useTheme.js";
import MarkdownIt from "markdown-it";

const emit = defineEmits(["back"]);

const { thoughts, subscribeToThoughts, streak } = useThoughts();
const { isDark } = useTheme();

let unsubscribe = null;
const md = new MarkdownIt({ breaks: true });

onMounted(() => {
  unsubscribe = subscribeToThoughts();
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.toDate();
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getToneColor = (tone) => {
  if (isDark) {
    const colors = {
      Polite: "bg-blue-900 text-blue-200",
      Playful: "bg-green-900 text-green-200",
      Philosophical: "bg-purple-900 text-purple-200",
    };
    return colors[tone] || colors["Polite"];
  } else {
    const colors = {
      Polite: "bg-blue-100 text-blue-800",
      Playful: "bg-green-100 text-green-800",
      Philosophical: "bg-purple-100 text-purple-800",
    };
    return colors[tone] || colors["Polite"];
  }
};

function cleanChallenge(challenge) {
  return (challenge || "").replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
}
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2
          :style="
            isDark
              ? { color: '#fff', fontWeight: 600, fontSize: '1.3rem' }
              : { color: '#18181b', fontWeight: 600, fontSize: '1.3rem' }
          "
          class="mb-1"
        >
          Your Journey
        </h2>
        <p
          :style="
            isDark
              ? { color: '#a1a1aa', fontSize: '0.95rem' }
              : { color: '#6b7280', fontSize: '0.95rem' }
          "
        >
          {{ thoughts.length }} thoughts explored
        </p>
      </div>
      <button
        @click="emit('back')"
        class="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
        :style="
          isDark
            ? {
                backgroundColor: '#23232a',
                color: '#fff',
                border: '1px solid #27272a',
              }
            : {
                backgroundColor: '#fff',
                color: '#18181b',
                border: '1px solid #e5e7eb',
              }
        "
      >
        ← Back
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div
        :style="
          isDark
            ? {
                backgroundColor: '#18181b',
                color: '#fff',
                borderRadius: '1rem',
                boxShadow: '0 2px 16px rgba(0,0,0,0.5)',
              }
            : {
                backgroundColor: '#fff',
                color: '#18181b',
                borderRadius: '1rem',
                boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
              }
        "
        class="p-5 text-center"
      >
        <div
          :style="
            isDark
              ? { color: '#3b82f6', fontWeight: 700, fontSize: '2rem' }
              : { color: '#2563eb', fontWeight: 700, fontSize: '2rem' }
          "
          class="mb-1"
        >
          {{ thoughts.length }}
        </div>
        <div
          :style="
            isDark
              ? { color: '#a1a1aa', fontSize: '0.95rem' }
              : { color: '#6b7280', fontSize: '0.95rem' }
          "
        >
          Total Thoughts
        </div>
      </div>
      <div
        :style="
          isDark
            ? {
                backgroundColor: '#18181b',
                color: '#fff',
                borderRadius: '1rem',
                boxShadow: '0 2px 16px rgba(0,0,0,0.5)',
              }
            : {
                backgroundColor: '#fff',
                color: '#18181b',
                borderRadius: '1rem',
                boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
              }
        "
        class="p-5 text-center"
      >
        <div
          :style="
            isDark
              ? { color: '#22c55e', fontWeight: 700, fontSize: '2rem' }
              : { color: '#16a34a', fontWeight: 700, fontSize: '2rem' }
          "
          class="mb-1"
        >
          {{ streak }}
        </div>
        <div
          :style="
            isDark
              ? { color: '#a1a1aa', fontSize: '0.95rem' }
              : { color: '#6b7280', fontSize: '0.95rem' }
          "
        >
          Day Streak
        </div>
      </div>
      <div
        :style="
          isDark
            ? {
                backgroundColor: '#18181b',
                color: '#fff',
                borderRadius: '1rem',
                boxShadow: '0 2px 16px rgba(0,0,0,0.5)',
              }
            : {
                backgroundColor: '#fff',
                color: '#18181b',
                borderRadius: '1rem',
                boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
              }
        "
        class="p-5 text-center"
      >
        <div
          :style="
            isDark
              ? { color: '#a78bfa', fontWeight: 700, fontSize: '2rem' }
              : { color: '#7c3aed', fontWeight: 700, fontSize: '2rem' }
          "
          class="mb-1"
        >
          3
        </div>
        <div
          :style="
            isDark
              ? { color: '#a1a1aa', fontSize: '0.95rem' }
              : { color: '#6b7280', fontSize: '0.95rem' }
          "
        >
          Tone Styles
        </div>
      </div>
    </div>

    <div
      v-if="thoughts.length === 0"
      :style="
        isDark
          ? {
              backgroundColor: '#18181b',
              color: '#fff',
              borderRadius: '1rem',
              boxShadow: '0 2px 24px rgba(0,0,0,0.7)',
            }
          : {
              backgroundColor: '#fff',
              color: '#18181b',
              borderRadius: '1rem',
              boxShadow: '0 2px 24px rgba(0,0,0,0.07)',
            }
      "
      class="p-12 text-center"
    >
      <div
        :style="
          isDark
            ? { backgroundColor: '#23232a' }
            : { backgroundColor: '#f3f4f6' }
        "
        class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <svg
          class="w-8 h-8"
          :style="isDark ? { color: '#a1a1aa' } : { color: '#6b7280' }"
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
      <h3
        :style="
          isDark
            ? { color: '#fff', fontWeight: 600, fontSize: '1.1rem' }
            : { color: '#18181b', fontWeight: 600, fontSize: '1.1rem' }
        "
        class="mb-2"
      >
        No thoughts yet
      </h3>
      <p
        :style="
          isDark
            ? { color: '#a1a1aa', fontSize: '0.95rem' }
            : { color: '#6b7280', fontSize: '0.95rem' }
        "
        class="mb-6"
      >
        Start your journey by challenging your first thought
      </p>
      <button
        @click="emit('back')"
        class="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
        :style="
          isDark
            ? { backgroundColor: '#2563eb', color: '#fff' }
            : { backgroundColor: '#2563eb', color: '#fff' }
        "
      >
        Add Your First Thought
      </button>
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="thought in thoughts"
        :key="thought.id"
        :style="
          isDark
            ? {
                backgroundColor: '#18181b',
                color: '#fff',
                borderRadius: '1rem',
                boxShadow: '0 2px 16px rgba(0,0,0,0.5)',
              }
            : {
                backgroundColor: '#fff',
                color: '#18181b',
                borderRadius: '1rem',
                boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
              }
        "
        class="p-6 transition-all duration-300"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div
              :style="
                isDark
                  ? { color: '#a1a1aa', fontSize: '0.95rem' }
                  : { color: '#6b7280', fontSize: '0.95rem' }
              "
              class="mb-1"
            >
              {{ formatDate(thought.createdAt) }}
            </div>
            <div
              :style="
                isDark
                  ? { color: '#fff', fontWeight: 500, fontSize: '1.05rem' }
                  : { color: '#18181b', fontWeight: 500, fontSize: '1.05rem' }
              "
              class="mb-2"
            >
              "{{ thought.originalThought }}"
            </div>
          </div>
          <span
            class="px-2 py-1 rounded-full text-xs font-medium ml-4"
            :class="getToneColor(thought.tone)"
          >
            {{ thought.tone }}
          </span>
        </div>
        <div
          :style="
            isDark
              ? { borderTop: '1px solid #23232a' }
              : { borderTop: '1px solid #e5e7eb' }
          "
          class="pt-4"
        >
          <div class="flex items-center mb-2">
            <div
              class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-2"
            >
              <svg
                class="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span
              :style="
                isDark
                  ? { color: '#3b82f6', fontWeight: 500 }
                  : { color: '#2563eb', fontWeight: 500 }
              "
              class="text-xs"
            >
              AI Challenge
            </span>
          </div>
          <div
            class="markdown-body pl-8"
            v-html="md.render(cleanChallenge(thought.challenge))"
            :style="
              isDark
                ? { color: '#a1a1aa', fontSize: '1rem', lineHeight: '1.7' }
                : { color: '#374151', fontSize: '1rem', lineHeight: '1.7' }
            "
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
