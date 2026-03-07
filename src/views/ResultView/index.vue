<template>
  <VModal :show="isModalOpen" @on-close="closeModal">
    <div class="flex flex-col items-center w-[400px]">
      <div class="relative w-32 h-32 rounded-full overflow-hidden border-[3px] border-[var(--primary)]">
        <img 
          :src="character?.image" 
          :alt="character?.name" 
          class="absolute inset-0 w-full h-full object-cover" 
        />
      </div>

      <span class="font-bold text-[var(--black)] text-2xl mt-8">{{ character?.name }}</span>
      
      <span v-if="userName" class="block mt-1.5 font-bold">玩家：{{ userName }}</span>

      <p class="text-center text-[var(--gray)] mt-6">
        {{ userName }}，您成功获得了角色 <span class="font-bold text-[var(--black)]">«{{ character?.name }}»</span>！
        {{ character?.summary }}
      </p>
    </div>

    <button 
      class="w-full mt-12 py-4 px-6 bg-[var(--primary)] text-[var(--white)] font-bold text-sm rounded-lg cursor-pointer border border-[var(--primary)]" 
      @click="onCharacterSubmited"
    >
      接受角色
    </button>
  </VModal>

  <!-- result-view: flex纵向居中布局，最小高度100vh -->
  <DefaultLayout class="flex flex-col min-h-screen items-center justify-center">
    <!-- result-view__title: 标题样式 -->
    <h1 class="font-bold text-[var(--black)] text-[1.75rem]">结束了！</h1>
    
    <!-- result-view__description: 描述文字，顶部间距 -->
    <span class="text-[var(--gray)] mt-4">恭喜！{{ userName }} 在本次测验中获得了 {{ score }} 分！</span>

    <!-- result-view__actions: 按钮组，顶部间距 -->
    <div class="mt-14">
      <!-- result-view__show-results: 查看结果按钮 -->
      <button 
        class="py-4 px-6 bg-[var(--primary)] text-[var(--white)] font-bold text-sm rounded-lg cursor-pointer border border-[var(--primary)]" 
        @click="openModal"
      >
        查看结果
      </button>
      
      <!-- result-view__retry: 重试链接 -->
      <RouterLink 
        to="/quiz" 
        class="inline-block ml-4 py-4 px-6 text-[var(--primary)] font-bold text-sm rounded-lg border border-[var(--primary)]"
      >
        重试
      </RouterLink>
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
import type { RankListItem } from '@/api/rank';
import dayjs from 'dayjs';

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

  const newItem: RankListItem = {
    id: newId,
    username: userName.value,
    avatar: character.value.image,
    score: score.value,
    character: character.value.name,
    rank: 0,
    lastsubmitTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  };

  addToLeaderboard(newItem);

  closeModal();
  router.push('/');
};

const fetchData = async (): Promise<ApiResponse<ScoreSubmitResponse>> => {
    const res = await submitScore(score.value, userName.value);
    return res;
  };

onMounted(async () => {
  await fetchData();
  await fetchCharacters();
});

defineOptions({
  name: 'ResultView'
});
</script>

<style lang="postcss" scoped>
/* 
  保留复杂样式：
  :deep(.modal) 最大宽度限制
*/
:deep(.modal) {
  max-width: 24rem;
}
</style>
