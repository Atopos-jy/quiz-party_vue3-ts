<template>
  <VModal :show="isModalOpen" @on-close="closeModal">
    <div class="character">
      <div class="character__avatar-box">
        <img :src="character?.image" :alt="character?.name" class="character__avatar" />
      </div>

      <span class="character__name">{{ character?.name }}</span>
      <span class="character__username" v-if="userName" style="display:block; margin-top: 5px; font-weight: bold;">玩家：{{ userName }}</span>

      <p class="character__summary">
        {{ userName }}，您成功获得了角色 <span class="character__summary-bold">«{{ character?.name }}»</span>！
        {{ character?.summary }}
      </p>
    </div>

    <button class="action" @click="onCharacterSubmited">接受角色</button>
  </VModal>

  <DefaultLayout class="result-view">
    <h1 class="result-view__title">结束了！</h1>
    <span class="result-view__description">恭喜！{{ userName }} 在本次测验中获得了 {{ score }} 分！</span>

    <div class="result-view__actions">
      <button class="result-view__show-results" @click="openModal">查看结果</button>
      <RouterLink to="/quiz" class="result-view__retry">重试</RouterLink>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import VModal from '@/components/VModal/index.vue';
import DefaultLayout from '@/layouts/DefaultLayout/index.vue';
import type { ApiResponse } from '@/utils/http';
import type { ScoreSubmitResponse } from '@/api/rank';
import { submitScore } from '@/api/rank';
import { onMounted } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useCharacters, useOpen, useLeaderboard, useLocalStorage } from '@/hooks';
import type { LeaderboardItem } from '@/hooks/useLeaderboard';

const router = useRouter();

// 1. 用户名与分数的本地存储（响应式）
const userName = useLocalStorage<string>('userName', '');
const score = useLocalStorage<number>('score', 0);

// 2. 角色数据获取与选取
const { characters, character, fetch: fetchCharacters } = useCharacters(score);

// 3. 弹窗显隐控制
const { isOpen: isModalOpen, open: openModal, close: closeModal } = useOpen(false);

// 4. 排行榜存储（响应式同步 localStorage）
const { add: addToLeaderboard } = useLeaderboard();

/** 接受角色按钮点击事件 */
const onCharacterSubmited = (): void => {
  if (!character.value) return;

  // 获取当前排行榜数量，用于生成递增ID
  const existingData = JSON.parse(localStorage.getItem('leaderboard') || '[]');
  const newId = existingData.length + 1;

  const newItem: LeaderboardItem = {
    id: newId,
    username: userName.value,
    avatar: character.value.image,
    score: score.value,
    character: character.value.name,
    rank: 0,
    lastsubmitTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
  };

  addToLeaderboard(newItem);

  closeModal();
  router.push('/');
};

const fetchData = async (): Promise<ApiResponse<ScoreSubmitResponse>> => {
    const res = await submitScore(score.value, userName.value);
    return res.data;
  };

onMounted(async () => {
  await fetchData();
  await fetchCharacters();
});

defineOptions({
  name: 'ResultView'
});
</script>

<style src="./ResultView.scss" lang="scss" scoped />
