# 趣问派对 (Quiz Party)

一个基于 Vue3 + TypeScript + Pinia 的企业级问答游戏平台，支持趣味答题、角色生成、实时排行榜等功能。

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.4.5-4FC08D?logo=vue.js" alt="Vue3" />
  <img src="https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Pinia-3.0.4-FFE873?logo=vue.js" alt="Pinia" />
  <img src="https://img.shields.io/badge/Vite-7.3.1-646CFF?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Ant%20Design%20Vue-4.2.6-0170FE?logo=ant-design" alt="Ant Design Vue" />
</p>

<br />

<div align="center">
  
![1](./images/1.jpg)
**开始页面** - 查看排行榜，开始新测验

<br />
  
![2](./images/2.jpg)
**测验页面** - 限时答题，挑战自我

<br />
  
![3](./images/3.jpg)
**结果页面** - 查看成绩，生成专属角色

<br />

![4](./images/4.jpg)  
**排行榜** - 实时排名，与好友PK

</div>

## ✨ 核心功能

- 🎮 **趣味答题** - 多样化题目，倒计时挑战
- 🏆 **实时排行榜** - 本地与服务端数据合并，自动去重排序
- 🎭 **角色系统** - 根据答题结果生成趣味角色
- 💾 **数据持久化** - Pinia + localStorage 双存储
- 📱 **PWA 支持** - 可安装为桌面应用
- 🎨 **响应式设计** - 完美适配各种设备

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装与运行

```shell
# 克隆项目
git clone <repository-url>
cd quiz-party

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 运行测试
npm run test
```

### 环境变量配置

创建 `.env.local` 文件：

```env
VITE_API_BASE_URL=/api
VITE_API_PROXY_TARGET=http://127.0.0.1:4523/m1/7870295-7620021-default
```

## 📁 项目结构

```
quiz-party/
├── src/
│   ├── api/           # API 接口定义
│   ├── components/    # 公共组件
│   ├── config/        # 配置文件
│   ├── hooks/         # 组合式函数
│   ├── layouts/       # 布局组件
│   ├── store/         # Pinia 状态管理
│   ├── styles/        # 样式文件
│   ├── utils/         # 工具函数
│   └── views/         # 页面视图
├── test/              # 单元测试
└── ...
```

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | Vue 3 + Composition API |
| 类型系统 | TypeScript 5 |
| 状态管理 | Pinia + pinia-plugin-persistedstate |
| 构建工具 | Vite 7 |
| UI 组件库 | Ant Design Vue 4 |
| 样式方案 | Tailwind CSS + SCSS |
| HTTP 请求 | Axios |
| 单元测试 | Vitest |
| PWA | vite-plugin-pwa |

---

# 📖 开发文档

## 1. 技术架构

### 1.1 核心技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | ^3.4.5 | 前端框架 |
| TypeScript | ^5.9.3 | 类型系统 |
| Vite | ^7.3.1 | 构建工具 |
| Vue Router | ^4.2.5 | 路由管理 |
| Pinia | ^3.0.4 | 状态管理 |
| pinia-plugin-persistedstate | ^4.7.1 | 状态持久化 |
| Ant Design Vue | ^4.2.6 | UI 组件库 |
| Tailwind CSS | ^3.4.1 | 原子化 CSS |
| Axios | ^1.13.6 | HTTP 请求 |
| Dayjs | ^1.11.19 | 日期处理 |
| Vitest | ^4.0.18 | 单元测试 |

### 1.2 架构图

```
┌─────────────────────────────────────────────────────────────┐
│                        表现层 (Presentation)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Views      │  │  Components  │  │   Layouts    │       │
│  │  (页面视图)   │  │   (组件)      │  │   (布局)      │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                        业务逻辑层 (Business Logic)           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │    Store     │  │    Hooks     │  │    Utils     │       │
│  │  (Pinia状态)  │  │   (组合式)    │  │   (工具函数)  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                        数据层 (Data Layer)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │     API      │  │    HTTP      │  │ localStorage │       │
│  │   (接口定义)  │  │   (请求封装)  │  │   (本地存储)  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. 开发规范

### 2.1 文件命名规范

| 类型 | 命名规则 | 示例 |
|------|----------|------|
| 组件文件 | PascalCase + index.vue | `VLeaderboard/index.vue` |
| 组合式函数 | camelCase + use 前缀 | `useLeaderboard.ts` |
| 工具函数 | camelCase | `filterLeaderboard.ts` |
| 类型定义 | PascalCase + 后缀 | `RankListItem`, `ApiResponse` |
| 样式文件 | 同名 + .scss | `VLeaderboard.scss` |
| Store 模块 | camelCase | `quiz.ts` |

### 2.2 代码规范

#### TypeScript 规范
```typescript
// ✅ 正确：显式定义类型
interface UserInfo {
  id: number;
  username: string;
  avatar?: string;
}

function getUserInfo(id: number): Promise<ApiResponse<UserInfo>> {
  return http.get<UserInfo>(`/user/${id}`);
}

// ❌ 错误：隐式 any
function getUser(id) {
  return http.get(`/user/${id}`);
}
```

#### Vue 组件规范
```vue
<script setup lang="ts">
// 1. 导入顺序：Vue → 第三方 → 本地
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useLeaderboardStore } from '@/store/modules/quiz';

// 2. 类型定义
interface Props {
  title: string;
}

// 3. 组件选项
defineOptions({
  name: 'ComponentName'
});

// 4. Props & Emits
defineProps<Props>();
const emit = defineEmits(['confirm', 'cancel']);

// 5. 响应式数据
const count = ref(0);
const double = computed(() => count.value * 2);

// 6. 方法定义
function increment() {
  count.value++;
}

// 7. 生命周期
onMounted(() => {
  console.log('Component mounted');
});
</script>
```

### 2.3 Git 规范

#### 分支命名
- `main` - 主分支，稳定版本
- `develop` - 开发分支
- `feature/xxx` - 功能分支
- `bugfix/xxx` - 修复分支
- `hotfix/xxx` - 紧急修复

#### Commit 规范
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型：**
- `feat` - 新功能
- `fix` - 修复
- `docs` - 文档
- `style` - 格式（不影响代码运行）
- `refactor` - 重构
- `test` - 测试
- `chore` - 构建过程或辅助工具变动

**示例：**
```bash
feat(leaderboard): 添加排行榜去重功能

- 实现按 username 去重逻辑
- 同分情况下按时间排序
- 添加单元测试

Closes #123
```

---

## 3. 目录结构说明

```
quiz-party/
├── .github/                 # GitHub 配置
│   └── workflows/           # CI/CD 工作流
├── public/                  # 静态资源
│   ├── favicon.ico
│   └── icon.png
├── src/
│   ├── api/                 # API 接口定义
│   │   ├── rank.ts          # 排行榜接口
│   │   ├── user.ts          # 用户接口
│   │   └── quiz.ts          # 答题接口
│   ├── assets/              # 资源文件
│   │   └── images/
│   ├── components/          # 公共组件
│   │   ├── VLeaderboard/    # 排行榜组件
│   │   ├── NameInput/       # 姓名输入弹窗
│   │   └── VModal/          # 通用弹窗
│   ├── config/              # 配置文件
│   │   ├── router.ts        # 路由配置
│   │   └── form-rules.ts    # 表单校验规则
│   ├── hooks/               # 组合式函数
│   │   ├── useLeaderboard.ts
│   │   ├── useLocalStorage.ts
│   │   └── useQuizFlow.ts
│   ├── layouts/             # 布局组件
│   │   └── DefaultLayout/
│   ├── store/               # Pinia 状态管理
│   │   ├── index.ts         # Store 入口
│   │   └── modules/
│   │       └── quiz.ts      # Quiz 相关状态
│   ├── styles/              # 样式文件
│   │   ├── global.scss      # 全局样式
│   │   ├── variables.scss   # SCSS 变量
│   │   ├── functions.scss   # SCSS 函数
│   │   ├── ant-theme.scss   # Ant Design 主题
│   │   └── tailwind.css     # Tailwind 配置
│   ├── utils/               # 工具函数
│   │   ├── http.ts          # HTTP 请求封装
│   │   ├── request.ts       # Axios 实例
│   │   ├── filterLeaderboard.ts
│   │   └── error-handler.ts
│   ├── views/               # 页面视图
│   │   ├── HomeView/        # 首页
│   │   ├── QuizView/        # 答题页
│   │   └── ResultView/      # 结果页
│   ├── App.vue              # 根组件
│   ├── main.ts              # 入口文件
│   └── vite-env.d.ts        # Vite 类型声明
├── test/                    # 测试文件
│   └── unit/
├── .env                     # 环境变量
├── .prettierrc.json         # Prettier 配置
├── index.html               # HTML 模板
├── package.json             # 依赖配置
├── tailwind.config.js       # Tailwind 配置
├── tsconfig.json            # TypeScript 配置
└── vite.config.ts           # Vite 配置
```

---

## 4. 环境变量说明

### 4.1 变量列表

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `VITE_API_BASE_URL` | API 基础路径 | `/api` |
| `VITE_API_PROXY_TARGET` | 代理目标地址 | `http://127.0.0.1:4523` |

### 4.2 使用方式

```typescript
// 在代码中使用
const baseURL = import.meta.env.VITE_API_BASE_URL;
```

### 4.3 环境文件

- `.env` - 默认环境
- `.env.development` - 开发环境
- `.env.production` - 生产环境

---

## 5. 接口请求封装说明

### 5.1 核心架构

```
┌─────────────────────────────────────┐
│           业务代码调用层              │
│    api.rank.getRankList()           │
└─────────────────────────────────────┘
                  │
┌─────────────────────────────────────┐
│           HTTP 方法封装层            │
│    http.get() / http.post()         │
│    统一返回 ApiResponse<T>          │
└─────────────────────────────────────┘
                  │
┌─────────────────────────────────────┐
│           Axios 实例层              │
│    request (拦截器处理)              │
│    - 请求拦截                       │
│    - 响应拦截 (错误处理)             │
└─────────────────────────────────────┘
```

### 5.2 使用示例

#### 定义接口 (api/rank.ts)
```typescript
import { http, type ApiResponse } from '@/utils/http';

export interface RankListItem {
  id: number;
  username: string;
  avatar: string;
  score: number;
  character: string;
  rank: number;
  lastsubmitTime: string;
}

export function getRankList(page: number, pageSize: number, leaderboard: RankListItem[]) {
  return http.post<RankListResponse>('/leaderboard', { page, pageSize, leaderboard });
}
```

#### 业务调用
```typescript
import { getRankList } from '@/api/rank';

// 使用
const res = await getRankList(1, 10, []);
// res.data.list - 排行榜列表
// res.data.total - 总条数
```

### 5.3 响应结构

```typescript
interface ApiResponse<T> {
  code: number;      // 状态码
  message: string;   // 提示信息
  data: T;           // 业务数据
}
```

### 5.4 错误处理

统一在 `request.ts` 的响应拦截器中处理，通过 `error-handler.ts` 展示错误提示。

---

## 6. 路由使用说明

### 6.1 路由配置

```typescript
// src/config/router.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView/index.vue'),
  },
  {
    path: '/quiz',
    component: () => import('@/views/QuizView/index.vue'),
  },
  {
    path: '/result',
    component: () => import('@/views/ResultView/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory('/quizzo/'),
  routes,
});
```

### 6.2 路由跳转

```typescript
import { useRouter } from 'vue-router';

const router = useRouter();

// 编程式导航
router.push('/quiz');
router.push({ path: '/result', query: { score: 100 } });

// 带参数
router.push(`/result/${id}`);
```

### 6.3 路由守卫

```typescript
router.beforeEach((to, from, next) => {
  // 权限验证
  const isLoggedIn = localStorage.getItem('userName');
  if (to.path === '/quiz' && !isLoggedIn) {
    next('/');
  } else {
    next();
  }
});
```

---

## 7. 状态管理说明

### 7.1 Store 架构

```
src/store/
├── index.ts          # Store 入口，注册持久化插件
└── modules/
    └── quiz.ts       # Quiz 相关状态
```

### 7.2 Store 定义

```typescript
// src/store/modules/quiz.ts
import { defineStore } from 'pinia';

export const useLeaderboardStore = defineStore('leaderboard', {
  state: () => ({
    list: [] as RankListItem[],
    loading: false,
  }),
  
  getters: {
    total(): number {
      return this.list.length;
    },
    sortedList(): RankListItem[] {
      return [...this.list].sort((a, b) => b.score - a.score);
    },
  },
  
  actions: {
    async fetchFromAPI(page = 1, pageSize = 10) {
      this.loading = true;
      // 异步操作
      this.loading = false;
    },
    
    add(item: RankListItem) {
      this.list.push(item);
      this.list = filterLeaderboard(this.list);
    },
  },
});
```

### 7.3 组件中使用

```vue
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLeaderboardStore } from '@/store/modules/quiz';

const store = useLeaderboardStore();

// 使用 storeToRefs 保持响应式
const { list, loading, total } = storeToRefs(store);

// 直接调用 action
onMounted(() => {
  store.fetchFromAPI();
});
</script>
```

### 7.4 持久化配置

```typescript
// src/store/index.ts
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
```

---

## 8. 通用组件说明

### 8.1 VLeaderboard 排行榜组件

**Props：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| leaderboard | RankListItem[] | [] | 排行榜数据 |
| loading | boolean | false | 加载状态 |
| total | number | 0 | 总条数 |
| currentPage | number | 1 | 当前页 |
| pageSize | number | 10 | 每页条数 |

**Events：**

| 事件 | 参数 | 说明 |
|------|------|------|
| pageChange | (page, pageSize) | 分页切换 |

**使用示例：**

```vue
<VLeaderboard
  :leaderboard="leaderboard"
  :loading="loading"
  :total="total"
  :current-page="currentPage"
  :page-size="pageSize"
  @page-change="handlePageChange"
/>
```

### 8.2 NameInput 姓名输入组件

**Props：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | boolean | false | 弹窗显示状态 |
| defaultName | string | '' | 默认填充姓名 |

**Events：**

| 事件 | 参数 | 说明 |
|------|------|------|
| update:modelValue | boolean | 弹窗状态更新 |
| confirm | string | 确认提交，返回姓名 |

**使用示例：**

```vue
<NameInput v-model="isVisible" @confirm="handleConfirm" />
```

---

## 9. 构建与部署

### 9.1 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行测试
npm run test

# 类型检查
npm run type-check
```

### 9.2 生产构建

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 9.3 构建配置

```typescript
// vite.config.ts
export default defineConfig({
  base: '/quizzo/',           // 部署基础路径
  
  plugins: [
    vue(),
    VitePWA({                // PWA 配置
      registerType: 'autoUpdate',
      manifest: {
        name: 'Quizzo',
        theme_color: '#e5383b',
      },
    }),
  ],
  
  resolve: {
    alias: {
      '@': './src',          // 路径别名
    },
  },
  
  server: {
    proxy: {                 // 开发代理
      '/api': {
        target: 'http://127.0.0.1:4523',
        changeOrigin: true,
      },
    },
  },
});
```

### 9.4 部署检查清单

- [ ] 修改 `.env.production` 中的 API 地址
- [ ] 确认 `vite.config.ts` 中的 `base` 路径
- [ ] 运行 `npm run build` 检查是否有错误
- [ ] 确认 `dist` 目录输出正常
- [ ] 测试生产环境功能

---

## 10. 常见问题

### Q1: 排行榜数据没有去重？

**原因：** 直接调用 API 而不是使用 Pinia Store。

**解决：** 确保使用 `useLeaderboardStore` 的 `fetchFromAPI` 方法：

```typescript
const store = useLeaderboardStore();
await store.fetchFromAPI(page, pageSize);
```

### Q2: 背景颜色丢失？

**原因：** SCSS 变量未正确导入或 Tailwind 样式覆盖。

**解决：** 检查 `tailwind.css` 中是否设置了 `body` 背景色：

```css
body {
  background-color: #ffffff;
}
```

### Q3: Pinia 状态没有持久化？

**原因：** 持久化插件未正确注册。

**解决：** 确认 `main.ts` 中已注册插件：

```typescript
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
```

### Q4: API 请求返回 404？

**原因：** 代理配置错误或环境变量不正确。

**解决：**
1. 检查 `.env` 中的 `VITE_API_PROXY_TARGET`
2. 确认 `vite.config.ts` 中的 proxy 配置
3. 重启开发服务器

### Q5: TypeScript 类型错误？

**原因：** 类型定义不匹配或缺少类型声明。

**解决：**
1. 运行 `npm run type-check` 查看详细错误
2. 检查接口定义是否与实际数据一致
3. 确保 `ApiResponse<T>` 的泛型参数正确

---

## 附录

### A. 推荐 VSCode 插件

- Vue Language Features (Volar)
- TypeScript Vue Plugin
- ESLint
- Prettier
- Tailwind CSS IntelliSense

### B. 相关文档链接

- [Vue3 官方文档](https://vuejs.org/)
- [Pinia 官方文档](https://pinia.vuejs.org/)
- [Ant Design Vue](https://www.antdv.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite 官方文档](https://vitejs.dev/)

## ✏️ 待办事项

- [x] ~~使用 Composition API~~
- [x] ~~迁移到 Pinia 状态管理~~
- [x] ~~添加排行榜去重功能~~
- [x] ~~PWA 支持~~
- [ ] 添加更多测验题目
- [ ] 添加更多角色
- [ ] 用户登录系统
- [ ] 多语言支持

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/xxx`)
3. 提交更改 (`git commit -m 'feat: add xxx'`)
4. 推送到分支 (`git push origin feature/xxx`)
5. 创建 Pull Request

## 📄 许可证

[MIT](./LICENSE)

---

<p align="center">
  Made with ❤️ by Quiz Party Team
</p>
