<template>
  <div class="quiz-container">
    <h2>Guess the Song!</h2>
    <div v-if="currentTrack">
      <audio :src="currentTrack.preview_url" controls autoplay></audio>
      <div class="options">
        <button
          v-for="option in options"
          :key="option.id"
          @click="checkAnswer(option)"
        >
          {{ option.name }}
        </button>
      </div>
      <button @click="skipTrack" class="skip-button">Skip</button>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <div class="score">
      <p>Score: {{ score }}</p>
    </div>
    <button @click="goBack" class="back-button">Back to Home</button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'Quiz',
  setup() {
    const store = useStore();
    const router = useRouter();
    const playlistTracks = computed(() => store.getters.playlistTracks);
    const currentTrack = ref(null);
    const options = ref([]);
    const score = ref(0);

    const getRandomTrack = () => {
      const randomIndex = Math.floor(Math.random() * playlistTracks.value.length);
      return playlistTracks.value[randomIndex];
    };

    const generateOptions = (correctTrack) => {
      const allTracks = [...playlistTracks.value];
      const optionsSet = new Set();
      optionsSet.add(correctTrack);

      while (optionsSet.size < 4) {
        const randomTrack = getRandomTrack();
        optionsSet.add(randomTrack);
      }

      return Array.from(optionsSet).sort(() => Math.random() - 0.5);
    };

    const checkAnswer = (selectedOption) => {
      if (selectedOption.id === currentTrack.value.id) {
        score.value += 1;
        alert('Correct!');
      } else {
        alert('Wrong! Try again.');
      }
      startQuiz();
    };

    const skipTrack = () => {
      alert('Track skipped!');
      startQuiz();
    };

    const startQuiz = () => {
      const track = getRandomTrack();
      currentTrack.value = track;
      options.value = generateOptions(track);
    };

    const goBack = () => {
      router.push('/');
    };

    onMounted(() => {
      if (playlistTracks.value.length === 0) {
        router.push('/');
      } else {
        startQuiz();
      }
    });

    return {
      currentTrack,
      options,
      checkAnswer,
      skipTrack,
      score,
      goBack,
    };
  },
};
</script>

<style scoped>
.quiz-container {
  padding: 20px;
  text-align: center;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #1db954;
  color: white;
}

button:hover {
  background-color: #1ed760;
}

.skip-button {
  margin-top: 20px;
  background-color: #ff6347;
}

.skip-button:hover {
  background-color: #ff4500;
}

.back-button {
  margin-top: 20px;
  background-color: #cccccc;
}

.back-button:hover {
  background-color: #aaaaaa;
}

.score {
  margin-top: 20px;
  font-size: 18px;
}
</style>
