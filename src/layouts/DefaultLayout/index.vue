<template>
  <main class="default-layout">
    <slot />
  </main>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DefaultLayout'
});
</script>

<style src="./DefaultLayout.scss" lang="scss" scoped />
