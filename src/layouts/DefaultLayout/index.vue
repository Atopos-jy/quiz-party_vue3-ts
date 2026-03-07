<template>
  <!-- default-layout: 最大宽度1500px居中，响应式内边距 -->
  <main class="max-w-[1500px] mx-auto px-32 py-16 max-xs:px-8 max-xs:py-8">
    <slot />
  </main>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DefaultLayout'
});
</script>

