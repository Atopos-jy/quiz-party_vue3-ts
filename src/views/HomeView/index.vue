<template>
  <DefaultLayout>
    <header class="header">
      <span class="header__text">准备好来一场小测验了吗？</span>
      <RouterLink class="header__link" to="/quiz">开始新测验</RouterLink>
    </header>

    <VLeaderboard :leaderboard="leaderboard" class="leaderboard" />
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout/index.vue';
import VLeaderboard from '@/components/VLeaderboard/index.vue';
import { ref, type Ref } from 'vue';
import { RouterLink } from 'vue-router';

interface LeaderboardItem {
  image: string;
  name: string;
  score: number;
}

const leaderboard: Ref<LeaderboardItem[]> = ref([]);
leaderboard.value = localStorage.getItem('leaderboard') ? JSON.parse(localStorage.getItem('leaderboard') || '[]') : [];

defineOptions({
  name: 'HomeView'
});
</script>

<style src="./HomeView.scss" lang="scss"/>
