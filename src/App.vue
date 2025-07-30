<script setup>
import { ref, computed } from "vue";
import { useAuth } from "./composables/useAuth.js";
import LandingPage from "./components/LandingPage.vue";
import AuthModal from "./components/AuthModal.vue";
import MainApp from "./components/MainApp.vue";
import UIComponents from "./components/UIComponents.vue";
import { useTheme } from "./composables/useTheme.js";

const { isAuthenticated, loading } = useAuth();
const { isDark } = useTheme();

const showAuth = ref(false);
const authMode = ref("login");

const handleShowAuth = (mode) => {
  authMode.value = mode;
  showAuth.value = true;
};

const handleCloseAuth = () => {
  showAuth.value = false;
};

const handleSwitchAuthMode = () => {
  authMode.value = authMode.value === "login" ? "register" : "login";
};
</script>

<template>
  <div class="app">
    <div
      v-if="loading"
      :class="[
        'min-h-screen flex items-center justify-center',
        isDark ? 'bg-gray-900' : 'bg-gray-50',
      ]"
    >
      <div class="text-center">
        <UIComponents component="LoadingSpinner" />
        <p :class="isDark ? 'text-gray-400' : 'text-gray-600'" class="mt-4">
          Loading ThinkAgain...
        </p>
      </div>
    </div>

    <MainApp v-else-if="isAuthenticated" />

    <LandingPage v-else @show-auth="handleShowAuth" />

    <AuthModal
      v-if="showAuth"
      :mode="authMode"
      @close="handleCloseAuth"
      @switch-mode="handleSwitchAuthMode"
    />
  </div>
  <footer
    :class="[
      isDark ? 'bg-gray-900' : 'bg-gray-200',
      'py-8 text-center text-gray-500 text-sm',
    ]"
  >
    <p :class="isDark ? 'text-gray-400' : 'text-gray-600'">
      Made with <span class="text-red-500">❤️</span> by
      <a
        href="https://github.com/leecheeyong"
        target="_blank"
        :class="[isDark ? 'text-gray-200' : 'text-gray-700', 'hover:underline']"
      >
        Chee Yong Lee
      </a>
    </p>
    <p class="mt-1">
      Project available as open source under the terms of
      <a
        href="https://github.com/leecheeyong/ThinkAgain/blob/main/LICENSE"
        target="_blank"
        :class="[isDark ? 'text-gray-200' : 'text-gray-700', 'hover:underline']"
        >MIT License</a>
    </p>
  </footer>
</template>
