<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

defineExpose({
  name: 'QuizzoApp'
})
</script>

<style src="@/styles/App.scss" lang="scss" />
