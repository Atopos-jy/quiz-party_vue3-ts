<template>
  <Transition name="modal">
    <div v-if="$props.show" class="modal-wrapper" @click="handleWrapperClick">
      <div class="modal">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: true,
  }
})
const emit = defineEmits(['on-close'])

const onClose = () => {
  emit('on-close');
};

const handleWrapperClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    onClose();
  }
};

const onEscapeKeyClicked = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    onClose();
  }
};
watch(
  () => props.show,
  (canShow) => {
    if (canShow) {
      document.addEventListener('keyup', onEscapeKeyClicked);
    } else {
      document.removeEventListener('keyup', onEscapeKeyClicked);
    }
  },
  { immediate: true }
);

defineExpose({
  name: 'VModal'
})
</script>

<style src="./VModal.scss" lang="scss" scoped />
