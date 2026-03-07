<template>
  <DefaultLayout>
    <header class="flex items-center justify-between py-6 px-8 bg-white rounded-lg shadow-sm mb-6">
      <span class="text-xl font-semibold text-gray-800">准备好来一场小测验了吗？</span>
      <a 
        class="inline-flex items-center px-6 py-3 bg-[var(--primary)] hover:bg-red-600 text-white font-medium rounded-lg cursor-pointer transition-colors duration-200 shadow-sm hover:shadow-md" 
        @click="openNameInput"
      >
        开始新测验
      </a>
    </header>

    <VLeaderboard 
          :leaderboard="leaderboard" 
          :loading="loading"
          :total="total"
          :current-page="currentPage"
          :page-size="pageSize"
          @page-change="handlePageChange"
        />
    <NameInput v-model="isNameInputVisible" @confirm="handleNameConfirm" />
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout/index.vue';
import VLeaderboard from '@/components/VLeaderboard/index.vue';
import NameInput from '@/components/NameInput/index.vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useLeaderboardStore } from '@/store/modules/quiz';
import { storeToRefs } from 'pinia';

const router = useRouter();
const leaderboardStore = useLeaderboardStore();
const { list: leaderboard, loading, total } = storeToRefs(leaderboardStore);

const isNameInputVisible = ref(false);

// 分页状态
const currentPage = ref(1);
const pageSize = ref(10);

// 从 Store 获取排行榜数据（自动去重）
const fetchLeaderboard = async () => {
  await leaderboardStore.fetchFromAPI(currentPage.value, pageSize.value);
};

// 分页切换事件
const handlePageChange = (page: number, size: number) => {
  currentPage.value = page;
  pageSize.value = size;
  fetchLeaderboard();
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

