<template>
  <VModal :show="isModalOpen" @on-close="closeModal">
    <div class="character">
      <div class="character__avatar-box">
        <img :src="character?.image" :alt="character?.name" class="character__avatar" />
      </div>

      <span class="character__name">{{ character?.name }}</span>

      <p class="character__summary">
        您成功获得了角色 <span class="character__summary-bold">«{{ character?.name }}»</span>！
        {{ character?.summary }}
      </p>
    </div>

    <button class="action" @click="onCharacterSubmited">接受角色</button>
  </VModal>

  <DefaultLayout class="result-view">
    <h1 class="result-view__title">结束了！</h1>
    <span class="result-view__description">恭喜！您在本次测验中获得了 {{ score }} 分！</span>

    <div class="result-view__actions">
      <button class="result-view__show-results" @click="openModal">查看结果</button>
      <RouterLink to="/quiz" class="result-view__retry">重试</RouterLink>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import VModal from '@/components/VModal/index.vue';
import DefaultLayout from '@/layouts/DefaultLayout/index.vue';

// Mock Api
import characters from '@/assets/mock/characters.json';

import { ref, computed, onBeforeMount } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

interface Character {
  id?: number,
  name: string,
  image: string,
  summary: string,
  minimumScore: number, 
}

interface LeaderboardItem {
  image: string,
  name: string,
  score: number,
}
const score = ref<number>(0)
const isModalOpen = ref<boolean>(false)
const router = useRouter()

const character = computed(() => {
      return characters.find((c) => score.value >= c.minimumScore);
    });
onBeforeMount(() => {
  const storedScore = localStorage.getItem('score');
  if (storedScore) {
    score.value = JSON.parse(storedScore)
  }
})
const openModal = (): void => {
  isModalOpen.value = true;
};

const closeModal = (): void => {
  isModalOpen.value = false;
};

/** 更新排行榜到 localStorage */
const updateLeaderboard = (character: LeaderboardItem): void => {
  let leaderboard: LeaderboardItem[] = [];
  const storedLeaderboard = localStorage.getItem('leaderboard');
  
  if (storedLeaderboard) {
    leaderboard = JSON.parse(storedLeaderboard) as LeaderboardItem[];
  }

  leaderboard.push(character);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
};

/** 接受角色按钮点击事件 */
const onCharacterSubmited = (): void => {
  if (!character.value) return;

  updateLeaderboard({
    image: character.value.image,
    name: character.value.name,
    score: score.value,
  });

  isModalOpen.value = false;
  router.push('/');
};

defineOptions({
  name: 'ResultView'
});
</script>

<style src="./ResultView.scss" lang="scss" scoped />
