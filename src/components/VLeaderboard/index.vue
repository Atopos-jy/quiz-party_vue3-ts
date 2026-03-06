<template>
  <section id="leaderboard" class="leaderboard">
    <h2 class="leaderboard__title">排行榜</h2>

    <div v-if="leaderboard.length" class="leaders leaderboard__leaders">
      <template v-for="(leader, index) in leaderboard" :key="leader.id">
        <div class="leader">
          <div class="leader__image-box">
            <img :src="leader.avatar" :alt="leader.username" class="leader__image" />
          </div>

          <span class="leader__rank">#{{ leader.rank }}</span>
          <span class="leader__name">{{ leader.username }}</span>
          <span class="leader__score">{{ leader.score }} 分</span>
          <span class="leader__time">{{ leader.lastsubmitTime }}</span>
        </div>
      </template>
    </div>

    <div v-else class="leaderboard__empty">
      <span>暂无评分记录...</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { RankListItem } from '@/api/rank';

const props = defineProps({
  leaderboard: {
    type: Array as () => RankListItem[],
    required: true,
  },
});

defineOptions({
  name: 'VLeaderboard'
});
</script>

<style src="./VLeaderboard.scss" lang="scss" scoped />
