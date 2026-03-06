<template>
  <DefaultLayout>
    <header class="header">
      <span class="header__text">准备好来一场小测验了吗？</span>
      <a class="header__link" @click="openNameInput">开始新测验</a>
    </header>

    <VLeaderboard :leaderboard="leaderboard" :loading="loading" />
    <NameInput v-model="isNameInputVisible" @confirm="handleNameConfirm" />
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout/index.vue';
import VLeaderboard from '@/components/VLeaderboard/index.vue';
import NameInput from '@/components/NameInput/index.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useLocalStorage } from '@/hooks';
import { getRankList, type RankListItem } from '@/api/rank';

const router = useRouter();
const leaderboard = ref<RankListItem[]>([]);
const isNameInputVisible = ref(false);
const loading = ref(false);

// 使用封装的 Hook 读取本地排行榜数据
const localLeaderboard = useLocalStorage<RankListItem[]>('leaderboard', []);

// 从接口获取排行榜数据（携带本地数据供后端合并处理）
// 错误处理已在 http.ts 中统一处理
const fetchLeaderboard = async () => {
  loading.value = true;
  const res = await getRankList(1, 10, localLeaderboard.value);
  console.log('排行榜接口响应:', res.data);
  if (res.data && res.data.list && Array.isArray(res.data.list)) {
    leaderboard.value = res.data.list;
  }
  loading.value = false;
};

const openNameInput = () => {
  isNameInputVisible.value = true;
};

const handleNameConfirm = (name: string) => {
  localStorage.setItem('userName', name);
  router.push('/quiz');
};

onMounted(() => {
  fetchLeaderboard();
});

defineOptions({
  name: 'HomeView'
});
</script>

<style src="./HomeView.scss" lang="scss"/>
