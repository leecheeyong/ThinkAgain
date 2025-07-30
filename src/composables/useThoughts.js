import { ref, computed } from "vue";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.js";
import { useAuth } from "./useAuth.js";

const thoughts = ref([]);
const loading = ref(false);

export function useThoughts() {
  const { user } = useAuth();

  const subscribeToThoughts = () => {
    if (!user.value) return;

    const q = query(
      collection(db, "thoughts"),
      where("userId", "==", user.value.uid),
      orderBy("createdAt", "desc"),
    );

    return onSnapshot(q, (snapshot) => {
      thoughts.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  };

  const saveThought = async (originalThought, challenge, tone = "Polite") => {
    if (!user.value) {
      console.error("User not authenticated");
      return { success: false, error: "User not authenticated" };
    }

    loading.value = true;
    try {
      const docRef = await addDoc(collection(db, "thoughts"), {
        userId: user.value.uid,
        originalThought,
        challenge,
        tone,
        createdAt: serverTimestamp(),
      });
      console.log("Thought saved:", docRef.id);
      return { success: true };
    } catch (error) {
      console.error("Error saving thought:", error);
      return { success: false, error: error.message };
    } finally {
      loading.value = false;
    }
  };

  const challengeThought = async (thought, tone = "Polite") => {
    loading.value = true;
    try {
      const toneInstructions = {
        Polite: "in a polite and respectful tone",
        Playful: "in a playful and lighthearted tone",
        Philosophical: "in a deep philosophical tone",
      };

      const response = await fetch("https://ai.hackclub.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Don't respond this like its a conversation, go straight to the point and prevent additional questioning and continuing the conversation. Challenge this belief ${toneInstructions[tone]} and make sure that you process this multiple times with the greatest defense: "${thought}"`,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();
      const challenge =
        data.choices?.[0]?.message?.content || "Unable to generate challenge";

      return { success: true, challenge };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      loading.value = false;
    }
  };

  const getStreak = () => {
    if (!thoughts.value.length) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = 0;
    const thoughtDates = thoughts.value
      .map((t) => {
        const date = new Date(t.createdAt?.toDate());
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      })
      .filter((date, index, array) => array.indexOf(date) === index)
      .sort((a, b) => b - a);

    for (let i = 0; i < thoughtDates.length; i++) {
      const expectedDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      if (thoughtDates[i] === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  return {
    thoughts: computed(() => thoughts.value),
    loading: computed(() => loading.value),
    subscribeToThoughts,
    saveThought,
    challengeThought,
    streak: computed(() => getStreak()),
  };
}
