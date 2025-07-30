<template>
  <div>
    <div v-if="component === 'LoadingSpinner'">
      <div class="flex items-center justify-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2"
          :style="
            isDark ? { borderColor: '#3b82f6' } : { borderColor: '#2563eb' }
          "
        ></div>
      </div>
    </div>
    <div v-else-if="component === 'LoadingDots'">
      <div class="flex items-center space-x-1">
        <div
          v-for="i in 3"
          :key="i"
          class="w-2 h-2 rounded-full animate-pulse"
          :style="
            isDark
              ? {
                  backgroundColor: '#3b82f6',
                  animationDelay: `${(i - 1) * 0.2}s`,
                }
              : {
                  backgroundColor: '#2563eb',
                  animationDelay: `${(i - 1) * 0.2}s`,
                }
          "
        ></div>
      </div>
    </div>
    <div v-else-if="component === 'ThemeToggle'">
      <button
        @click="toggleTheme"
        class="p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        :style="
          isDark
            ? { backgroundColor: '#334155', color: '#fff' }
            : { backgroundColor: '#e5e7eb', color: '#1e293b' }
        "
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        <svg
          v-if="isDark"
          class="w-5 h-5"
          :style="{ color: '#fde047' }"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else
          class="w-5 h-5"
          :style="{ color: '#1e293b' }"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from "../composables/useTheme.js";

const props = defineProps({
  component: {
    type: String,
    required: true,
    validator: (value) =>
      ["LoadingSpinner", "LoadingDots", "ThemeToggle"].includes(value),
  },
});

const { isDark, toggle: toggleTheme } = useTheme();
</script>
