<template>
  <DefaultLayout>
    <header class="header">
      <span class="header__text">准备好来一场小测验了吗？</span>
      <a class="header__link" @click="openNameInput">开始新测验</a>
    </header>

    <VLeaderboard :leaderboard="leaderboard" class="leaderboard" />
    <NameInput v-model="isNameInputVisible" @confirm="handleNameConfirm" />
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout/index.vue';
import VLeaderboard from '@/components/VLeaderboard/index.vue';
import NameInput from '@/components/NameInput/index.vue';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

interface LeaderboardItem {
  image: string;
  name: string;
  score: number;
}

const router = useRouter();
const leaderboard: Ref<LeaderboardItem[]> = ref([]);
leaderboard.value = localStorage.getItem('leaderboard') ? JSON.parse(localStorage.getItem('leaderboard') || '[]') : [];
const isNameInputVisible = ref(false);

const openNameInput = () => {
  isNameInputVisible.value = true;
};

const handleNameConfirm = (name: string) => {
  localStorage.setItem('userName', name);
  router.push('/quiz');
};

defineOptions({
  name: 'HomeView'
});
</script>

<style src="./HomeView.scss" lang="scss"/>
