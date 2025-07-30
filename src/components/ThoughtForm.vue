<template>
  <div class="max-w-xl mx-auto">
    <div
      v-if="!showResult"
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
      class="p-6"
    >
      <div class="text-center mb-6">
        <h2
          class="text-xl font-semibold mb-1"
          :style="isDark ? { color: '#fff' } : { color: '#18181b' }"
        >
          What's on your mind?
        </h2>
        <p
          :style="
            isDark
              ? { color: '#a1a1aa', fontSize: '0.95rem' }
              : { color: '#6b7280', fontSize: '0.95rem' }
          "
        >
          Share a thought, belief, or opinion you'd like to explore
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label
            for="thought"
            class="block text-xs font-medium mb-1"
            :style="isDark ? { color: '#a1a1aa' } : { color: '#6b7280' }"
          >
            Your thought
          </label>
          <textarea
            id="thought"
            v-model="thought"
            rows="4"
            class="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 resize-none"
            :style="
              isDark
                ? {
                    backgroundColor: '#23232a',
                    color: '#fff',
                    borderColor: '#27272a',
                  }
                : {
                    backgroundColor: '#f9fafb',
                    color: '#18181b',
                    borderColor: '#e5e7eb',
                  }
            "
            placeholder="I believe that..."
            :disabled="loading"
          ></textarea>
        </div>

        <div>
          <label
            class="block text-xs font-medium mb-2"
            :style="isDark ? { color: '#a1a1aa' } : { color: '#6b7280' }"
          >
            Challenge tone
          </label>
          <div class="flex gap-2">
            <label
              v-for="toneOption in tones"
              :key="toneOption.value"
              class="flex-1 cursor-pointer"
            >
              <input
                v-model="tone"
                :value="toneOption.value"
                type="radio"
                class="sr-only"
                :disabled="loading"
              />
              <div
                class="rounded-lg p-3 text-center transition-all duration-200 border"
                :style="
                  tone === toneOption.value
                    ? isDark
                      ? {
                          borderColor: '#3b82f6',
                          backgroundColor: '#23232a',
                          color: '#3b82f6',
                        }
                      : {
                          borderColor: '#2563eb',
                          backgroundColor: '#eff6ff',
                          color: '#2563eb',
                        }
                    : isDark
                      ? {
                          borderColor: '#27272a',
                          backgroundColor: '#18181b',
                          color: '#a1a1aa',
                        }
                      : {
                          borderColor: '#e5e7eb',
                          backgroundColor: '#fff',
                          color: '#6b7280',
                        }
                "
              >
                <div class="font-medium" :style="{ fontSize: '1rem' }">
                  {{ toneOption.label }}
                </div>
                <div class="text-xs mt-1">
                  {{ toneOption.description }}
                </div>
              </div>
            </label>
          </div>
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
          :disabled="!canSubmit"
          class="w-full rounded-lg px-3 py-2 text-sm font-medium flex items-center justify-center transition-colors"
          :style="
            isDark
              ? {
                  backgroundColor: !canSubmit ? '#23232a' : '#2563eb',
                  color: '#fff',
                  opacity: !canSubmit ? 0.6 : 1,
                }
              : {
                  backgroundColor: !canSubmit ? '#e5e7eb' : '#2563eb',
                  color: !canSubmit ? '#6b7280' : '#fff',
                  opacity: !canSubmit ? 0.6 : 1,
                }
          "
        >
          <UIComponents v-if="loading" component="LoadingDots" />
          <span v-else>Challenge Me</span>
        </button>
      </form>
    </div>

    <div v-else class="space-y-6">
      <div
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
        class="p-5"
      >
        <div
          class="text-xs mb-1"
          :style="isDark ? { color: '#a1a1aa' } : { color: '#6b7280' }"
        >
          Your thought:
        </div>
        <div
          class="text-base"
          :style="isDark ? { color: '#fff' } : { color: '#18181b' }"
        >
          "{{ thought }}"
        </div>
      </div>

      <div
        :style="
          isDark
            ? {
                borderColor: '#3b82f6',
                backgroundColor: '#18181b',
                color: '#fff',
                borderRadius: '1rem',
                boxShadow: '0 2px 24px rgba(0,0,0,0.7)',
              }
            : {
                borderColor: '#2563eb',
                backgroundColor: '#fff',
                color: '#18181b',
                borderRadius: '1rem',
                boxShadow: '0 2px 24px rgba(0,0,0,0.07)',
              }
        "
        class="p-5 border-l-4"
      >
        <div class="flex items-center mb-2">
          <div
            class="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center mr-2"
          >
            <svg
              class="w-4 h-4 text-white"
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
          <div
            class="text-xs font-medium"
            :style="isDark ? { color: '#3b82f6' } : { color: '#2563eb' }"
          >
            AI Challenge ({{ tone }})
          </div>
        </div>
        <div
          class="markdown-body"
          v-html="md.render(cleanChallenge)"
          :style="
            isDark
              ? { color: '#a1a1aa', fontSize: '1.05rem', lineHeight: '1.7' }
              : { color: '#374151', fontSize: '1.05rem', lineHeight: '1.7' }
          "
        ></div>
      </div>

      <div class="flex flex-col sm:flex-row gap-2">
        <button
          @click="startOver"
          class="rounded-lg px-3 py-2 text-sm font-medium flex-1 transition-colors"
          :style="
            isDark
              ? { backgroundColor: '#2563eb', color: '#fff' }
              : { backgroundColor: '#2563eb', color: '#fff' }
          "
        >
          Challenge Another Thought
        </button>
        <button
          @click="$emit('show-history')"
          class="rounded-lg px-3 py-2 text-sm font-medium flex-1 transition-colors"
          :style="
            isDark
              ? {
                  backgroundColor: '#18181b',
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
          View History
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useThoughts } from "../composables/useThoughts.js";
import UIComponents from "./UIComponents.vue";
import { useTheme } from "../composables/useTheme.js";
import MarkdownIt from "markdown-it";

const { challengeThought, saveThought, loading } = useThoughts();
const { isDark } = useTheme();
const md = new MarkdownIt({ breaks: true });

const thought = ref("");
const tone = ref("Polite");
const challenge = ref("");
const showResult = ref(false);
const error = ref("");

const tones = [
  { value: "Polite", label: "Polite", description: "Respectful and gentle" },
  { value: "Playful", label: "Playful", description: "Lighthearted and fun" },
  {
    value: "Philosophical",
    label: "Philosophical",
    description: "Deep and thoughtful",
  },
];

const canSubmit = computed(
  () => thought.value.trim().length > 0 && !loading.value,
);

const handleSubmit = async () => {
  if (!canSubmit.value) return;

  error.value = "";
  showResult.value = false;

  const result = await challengeThought(thought.value, tone.value);

  if (result.success) {
    challenge.value = result.challenge;
    showResult.value = true;

    await saveThought(thought.value, result.challenge, tone.value);
  } else {
    error.value = result.error;
  }
};

const startOver = () => {
  thought.value = "";
  challenge.value = "";
  showResult.value = false;
  error.value = "";
};

const cleanChallenge = computed(() => {
  // Remove <think>...</think> blocks if present
  return challenge.value.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
});
</script>
