/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. 指定要处理的文件（Vue/JS/TS 文件）
  content: [
    "./index.html",
    "styles/**/*.css",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // 覆盖所有 src 下的组件
  ],
  // 2. 主题配置（可选，自定义颜色/字体等）
  theme: {
    extend: {
      colors: {
        rank: {
          gold: '#f59e0b',    // 金牌色
          silver: '#94a3b8',  // 银牌色
          bronze: '#b45309',  // 铜牌色
          default: '#64748b'  // 默认排名色
        },
        table: {
          hover: '#f0f7ff',   // 表格行 hover 色
          top1: '#fffbeb',    // 第一名行背景
          top2: '#f8fafc',    // 第二名行背景
          top3: '#fff7ed'     // 第三名行背景
        }
      },
      // 自定义字体（可选）
      fontFamily: {
        sans: ['Microsoft YaHei', 'sans-serif'],
      },
    },
  },
  // 3. 插件（默认即可）
  plugins: [],
}