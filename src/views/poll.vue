<template>
  <div class="h-screen flex justify-center items-center">
 <div class="max-w-md mx-auto bg-white/10 border rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
    <div class="p-8">
      <h2 class="text-2xl font-bold !mb-4 text-gray-50">{{ question }}</h2>
      <div v-if="!hasVoted">
        <button
          v-for="(option, index) in options"
          :key="index"
          @click="vote(index)"
          class="w-full text-left p-4 mb-2 bg-gray-100 hover:bg-gray-200 rounded transition duration-300 ease-in-out"
        >
          {{ option.text }}
        </button>
      </div>
      <div v-else>
        <div
          v-for="(option, index) in options"
          :key="index"
          class="mb-4"
        >
          <div class="flex text-gray-50 justify-between mb-1">
            <span>{{ option.text }}</span>
            <span>{{ option.percentage.toFixed(1) }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
              class="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
              :style="{ width: `${option.percentage}%` }"
            ></div>
          </div>
        </div>
        <button
          @click="resetPoll"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Vote Again
        </button>
      </div>
    </div>
  </div>  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const question = ref('What is your favorite programming language?');
const options = ref([
  { text: 'JavaScript', votes: 0 },
  { text: 'Python', votes: 0 },
  { text: 'Java', votes: 0 },
  { text: 'C++', votes: 0 },
]);

const hasVoted = ref(false);

const totalVotes = computed(() => {
  return options.value.reduce((sum, option) => sum + option.votes, 0);
});

const vote = (index) => {
  options.value[index].votes++;
  hasVoted.value = true;
  calculatePercentages();
};

const calculatePercentages = () => {
  const total = totalVotes.value;
  options.value.forEach(option => {
    option.percentage = total > 0 ? (option.votes / total) * 100 : 0;
  });
};

const resetPoll = () => {
  options.value.forEach(option => {
    option.votes = 0;
    option.percentage = 0;
  });
  hasVoted.value = false;
};
</script>