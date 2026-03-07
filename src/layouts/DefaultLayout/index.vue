<template>
  <main class="default-layout max-w-[1500px] mx-auto">
    <slot />
  </main>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DefaultLayout'
});
</script>

<style src="./DefaultLayout.scss" lang="scss" scoped />
