<template>
  <section class="leaderboard">
    <h2 class="leaderboard-title">排行榜 ({{ list.length }}人)</h2>
    
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">加载中...</div>
    
    <!-- 排行榜列表 -->
    <div v-else class="leaderboard-list">
      <div
        v-for="(item, index) in sortedList"
        :key="item.id"
        class="leaderboard-item"
      >
        <span class="rank">#{{ index + 1 }}</span>
        <img :src="item.avatar" :alt="item.username" class="avatar" />
        <span class="username">{{ item.username }}</span>
        <span class="score">{{ item.score }} 分</span>
        <span class="character">{{ item.character }}</span>
      </div>
    </div>
    
    <!-- 空状态 -->
    <div v-if="list.length === 0" class="empty">
      暂无数据
    </div>
    
    <!-- 操作按钮 -->
    <div class="actions">
      <button @click="addTestData">添加测试数据</button>
      <button @click="clearList">清空</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useLeaderboardStore } from '@/store/modules/quiz';
import type { RankListItem } from '@/api/rank';
import dayjs from 'dayjs';

// 使用 Store
const store = useLeaderboardStore();

// 本地响应式数据
const list = computed(() => store.list);
const loading = computed(() => store.loading);

// 排序后的列表
const sortedList = computed(() => store.sortedList);

// 组件挂载时加载数据
onMounted(() => {
  store.load();
});

// 添加测试数据
const addTestData = () => {
  const newItem: RankListItem = {
    id: Date.now(),
    username: `用户${Math.floor(Math.random() * 1000)}`,
    avatar: 'https://via.placeholder.com/50',
    score: Math.floor(Math.random() * 1000),
    character: '测试角色',
    rank: 0,
    lastsubmitTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  };
  
  store.add(newItem);
};

// 清空列表
const clearList = () => {
  store.clear();
};
</script>

<style scoped>
.leaderboard {
  padding: 20px;
}

.leaderboard-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.leaderboard-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.leaderboard-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 8px;
}

.rank {
  font-weight: bold;
  color: #e5383b;
  width: 40px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.username {
  flex: 1;
  font-weight: 500;
}

.score {
  color: #e5383b;
  font-weight: bold;
}

.character {
  color: #666;
}

.time {
  color: #999;
  font-size: 12px;
}

.loading,
.empty {
  text-align: center;
  padding: 40px;
  color: #999;
}

.actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.actions button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #e5383b;
  color: white;
  cursor: pointer;
}

.actions button:hover {
  background: #c42d2f;
}
</style>
