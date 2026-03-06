<template>
  <section id="leaderboard" class="max-w-6xl mx-auto p-5">
    <!-- Header -->
    <div class="flex justify-between items-center mb-5 pb-4 border-b border-gray-100">
      <h2 class="text-lg font-semibold text-gray-800">用户排行榜</h2>
      <a-tag color="blue">共 {{ total }} 条记录</a-tag>
    </div>

    <!-- Table -->
    <a-table
      :columns="columns"
      :data-source="leaderboard"
      :pagination="paginationConfig"
      :row-key="(record) => record.id"
      bordered
      size="middle"
      :loading="loading"
    >
      <template #bodyCell="{ column, record, index }">
        <!-- 排名 -->
        <template v-if="column.dataIndex === 'rank'">
          <a-badge
            :status="getRankStatus(index)"
            :text="getRankText(record.rank, index)"
            :color="getRankColor(index)"
          />
        </template>

        <!-- 头像 -->
        <template v-if="column.dataIndex === 'avatar'">
          <a-avatar
            :src="record.avatar"
            :alt="record.username"
            size="large"
            @error="handleAvatarError(record)"
          >
            {{ record.username.charAt(0) }}
          </a-avatar>
        </template>

        <!-- 用户名 -->
        <template v-if="column.dataIndex === 'username'">
          <span class="font-medium text-blue-500">{{ record.username }}</span>
        </template>

        <!-- 角色 -->
        <template v-if="column.dataIndex === 'character'">
          <a-tag color="purple">{{ record.character || '暂无角色' }}</a-tag>
        </template>

        <!-- 分数 -->
        <template v-if="column.dataIndex === 'score'">
          <span class="font-semibold text-orange-500">{{ record.score }} 分</span>
        </template>

        <!-- 提交时间 -->
        <template v-if="column.dataIndex === 'lastsubmitTime'">
          <span class="text-gray-500 text-sm">{{ formatTime(record.lastsubmitTime) }}</span>
        </template>
      </template>

      <template #emptyText>
        <div class="py-10">
          <a-empty description="暂无排行榜数据~" />
        </div>
      </template>
    </a-table>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { message } from 'ant-design-vue';
import type { RankListItem } from '@/api/rank';
import dayjs from 'dayjs';

// 格式化时间
const formatTime = (timeStr: string) => {
  if (!timeStr) return '-';
  const date = dayjs(timeStr);
  if (!date.isValid()) return timeStr;
  return date.format('YYYY-MM-DD HH:mm:ss');
};
const props = defineProps({
  leaderboard: {
    type: Array as () => RankListItem[],
    required: true,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
});

// 计算属性：总记录数
const total = computed(() => props.leaderboard.length);

// 分页配置
const paginationConfig = computed(() => ({
  current: 1,
  pageSize: 10,
  total: total.value,
  showTotal: (total: number) => `共 ${total} 条记录`,
}));

// 表格列配置
const columns = [
  {
    title: '排名',
    dataIndex: 'rank',
    key: 'rank',
    width: 100,
    align: 'center'
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 100,
    align: 'center'
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    width: 150,
    align: 'center'
  },
  {
    title: '角色',
    dataIndex: 'character',
    key: 'character',
    width: 150,
    align: 'center'
  },
  {
    title: '分数',
    dataIndex: 'score',
    key: 'score',
    width: 120,
    align: 'center',
    sorter: (a: RankListItem, b: RankListItem) => a.score - b.score
  },
  {
    title: '最后提交时间',
    dataIndex: 'lastsubmitTime',
    key: 'lastsubmitTime',
    width: 180,
    align: 'center',
    sorter: (a: RankListItem, b: RankListItem) =>
      dayjs(a.lastsubmitTime).valueOf() - dayjs(b.lastsubmitTime).valueOf()
  }
];

// 头像加载失败处理
const handleAvatarError = (record: RankListItem) => {
  record.avatar = '';
  message.warning(`【${record.username}】的头像加载失败`);
};

// 获取排名状态
const getRankStatus = (index: number) => {
  if (index === 0) return 'success';
  if (index === 1) return 'processing';
  if (index === 2) return 'warning';
  return 'default';
};

// 获取排名文本
const getRankText = (rank: number, index: number) => {
  const realRank = rank || index + 1;
  if (index === 0) return `🥇 ${realRank}`;
  if (index === 1) return `🥈 ${realRank}`;
  if (index === 2) return `🥉 ${realRank}`;
  return `#${realRank}`;
};

// 获取排名徽章颜色
const getRankColor = (index: number) => {
  if (index === 0) return '#f59e0b';
  if (index === 1) return '#94a3b8';
  if (index === 2) return '#b45309';
  return '#64748b';
};

defineOptions({
  name: 'VLeaderboard'
});
</script>

<style scoped>
/* 表格行 hover 效果 */
:deep(.ant-table-tbody > tr:hover > td) {
  background-color: #f0f7ff !important;
}

/* 前3名行特殊背景色 */
:deep(.ant-table-tbody > tr:nth-child(1) > td) {
  background-color: #fffbeb !important;
}
:deep(.ant-table-tbody > tr:nth-child(2) > td) {
  background-color: #f8fafc !important;
}
:deep(.ant-table-tbody > tr:nth-child(3) > td) {
  background-color: #fff7ed !important;
}
</style>
