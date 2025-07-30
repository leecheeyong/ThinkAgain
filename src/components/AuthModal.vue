<template>
  <div
    :class="[
      'fixed inset-0 flex items-center justify-center p-4 z-50',
      isDark ? 'bg-black' : 'bg-black',
      isDark ? '' : 'bg-opacity-50',
    ]"
    :style="
      isDark
        ? { backgroundColor: 'rgba(0,0,0,0.85)' }
        : { backgroundColor: 'rgba(0,0,0,0.5)' }
    "
  >
    <div
      class="w-full max-w-sm p-6 relative rounded-xl"
      :style="
        isDark
          ? {
              backgroundColor: '#18181b',
              color: '#fff',
              boxShadow: '0 2px 24px rgba(0,0,0,0.7)',
            }
          : {
              backgroundColor: '#fff',
              color: '#18181b',
              boxShadow: '0 2px 24px rgba(0,0,0,0.07)',
            }
      "
    >
      <button
        @click="close"
        class="absolute top-3 right-3 p-2 rounded-full focus:outline-none"
        :style="
          isDark
            ? { color: '#a1a1aa', background: 'transparent' }
            : { color: '#6b7280', background: 'transparent' }
        "
        aria-label="Close modal"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div class="text-center mb-6">
        <h2
          class="text-xl font-semibold mb-1"
          :style="isDark ? { color: '#fff' } : { color: '#18181b' }"
        >
          {{ title }}
        </h2>
        <p
          :style="
            isDark
              ? { color: '#a1a1aa', fontSize: '0.95rem' }
              : { color: '#6b7280', fontSize: '0.95rem' }
          "
        >
          {{
            isLogin
              ? "Continue your journey of cognitive growth"
              : "Start challenging your perspective today"
          }}
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-3">
        <div>
          <label
            for="email"
            class="block text-xs font-medium mb-1"
            :style="isDark ? { color: '#a1a1aa' } : { color: '#6b7280' }"
          >
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2"
            :style="
              isDark
                ? {
                    backgroundColor: '#23232a',
                    color: '#fff',
                    borderColor: '#27272a',
                    focusRingColor: '#3b82f6',
                  }
                : {
                    backgroundColor: '#f9fafb',
                    color: '#18181b',
                    borderColor: '#e5e7eb',
                    focusRingColor: '#2563eb',
                  }
            "
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label
            for="password"
            class="block text-xs font-medium mb-1"
            :style="isDark ? { color: '#a1a1aa' } : { color: '#6b7280' }"
          >
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2"
            :style="
              isDark
                ? {
                    backgroundColor: '#23232a',
                    color: '#fff',
                    borderColor: '#27272a',
                    focusRingColor: '#3b82f6',
                  }
                : {
                    backgroundColor: '#f9fafb',
                    color: '#18181b',
                    borderColor: '#e5e7eb',
                    focusRingColor: '#2563eb',
                  }
            "
            placeholder="Enter your password"
          />
        </div>

        <div v-if="!isLogin">
          <label
            for="confirmPassword"
            class="block text-xs font-medium mb-1"
            :style="isDark ? { color: '#a1a1aa' } : { color: '#6b7280' }"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            class="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2"
            :style="
              isDark
                ? {
                    backgroundColor: '#23232a',
                    color: '#fff',
                    borderColor: '#27272a',
                    focusRingColor: '#3b82f6',
                  }
                : {
                    backgroundColor: '#f9fafb',
                    color: '#18181b',
                    borderColor: '#e5e7eb',
                    focusRingColor: '#2563eb',
                  }
            "
            placeholder="Confirm your password"
          />
        </div>

        <div
          v-if="error"
          class="text-xs"
          :style="isDark ? { color: '#f87171' } : { color: '#dc2626' }"
        >
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="!isValid || loading"
          class="w-full rounded-lg px-3 py-2 text-sm font-medium flex items-center justify-center transition-colors"
          :style="
            isDark
              ? {
                  backgroundColor: !isValid || loading ? '#23232a' : '#2563eb',
                  color: '#fff',
                  opacity: !isValid || loading ? 0.6 : 1,
                }
              : {
                  backgroundColor: !isValid || loading ? '#e5e7eb' : '#2563eb',
                  color: !isValid || loading ? '#6b7280' : '#fff',
                  opacity: !isValid || loading ? 0.6 : 1,
                }
          "
        >
          <UIComponents v-if="loading" component="LoadingSpinner" />
          <span v-else>{{ submitText }}</span>
        </button>
      </form>

      <div class="text-center mt-4">
        <p
          :style="
            isDark
              ? { color: '#a1a1aa', fontSize: '0.95rem' }
              : { color: '#6b7280', fontSize: '0.95rem' }
          "
        >
          {{ switchText }}
          <button
            @click="switchMode"
            class="font-medium ml-1 px-2 py-1 rounded transition-colors"
            :style="
              isDark
                ? { color: '#60a5fa', backgroundColor: 'transparent' }
                : { color: '#2563eb', backgroundColor: 'transparent' }
            "
          >
            {{ switchLinkText }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuth } from "../composables/useAuth.js";
import UIComponents from "./UIComponents.vue";
import { useTheme } from "../composables/useTheme.js";

const props = defineProps({
  mode: {
    type: String,
    default: "login",
    validator: (value) => ["login", "register"].includes(value),
  },
});

const emit = defineEmits(["close", "switch-mode"]);

const { login, register } = useAuth();
const { isDark } = useTheme();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const error = ref("");

const isLogin = computed(() => props.mode === "login");
const title = computed(() =>
  isLogin.value ? "Welcome Back" : "Create Account",
);
const submitText = computed(() =>
  isLogin.value ? "Sign In" : "Create Account",
);
const switchText = computed(() =>
  isLogin.value ? "Don't have an account?" : "Already have an account?",
);
const switchLinkText = computed(() => (isLogin.value ? "Sign up" : "Sign in"));

const isValid = computed(() => {
  if (!email.value || !password.value) return false;
  if (!isLogin.value && password.value !== confirmPassword.value) return false;
  return true;
});

const handleSubmit = async () => {
  if (!isValid.value) return;

  loading.value = true;
  error.value = "";

  try {
    let result;
    if (isLogin.value) {
      result = await login(email.value, password.value);
    } else {
      result = await register(email.value, password.value);
    }

    if (result.success) {
      emit("close");
    } else {
      error.value = result.error;
    }
  } catch (err) {
    error.value = "An unexpected error occurred";
  } finally {
    loading.value = false;
  }
};

const switchMode = () => {
  error.value = "";
  emit("switch-mode");
};

const close = () => {
  emit("close");
};
</script>
