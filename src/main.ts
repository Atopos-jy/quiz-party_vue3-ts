import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// Pinia 状态管理
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// Tailwind CSS
import './styles/tailwind.css';

// 全局样式（CSS 变量、滚动条、Vue 过渡动画）
import './styles/global.scss';

// Ant Design 主题补充
import './styles/ant-theme.scss';

import App from './App.vue';
import router from '@/config/router';

// 创建 Pinia 实例
const pinia = createPinia();

// 注册持久化插件
pinia.use(piniaPluginPersistedstate);

createApp(App)
  .use(router)
  .use(pinia)
  .use(Antd)
  .mount('#app');
