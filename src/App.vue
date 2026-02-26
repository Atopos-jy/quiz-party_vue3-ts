<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'QuizzoApp',
});
</script>

<style src="@/assets/styles/App.scss" lang="scss" />
