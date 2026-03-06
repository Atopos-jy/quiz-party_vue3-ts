<template>
  <Transition name="modal">
    <!-- modal-wrapper: 固定定位全屏遮罩，flex居中，背景模糊 -->
    <div 
      v-if="$props.show" 
      class="fixed inset-0 flex items-center justify-center"
      style="backdrop-filter: blur(0.5rem); background-color: rgba(217, 217, 217, 0.1);"
      @click="handleWrapperClick"
    >
      <!-- modal: 白色卡片，圆角，阴影，内边距，动画 -->
      <div 
        class="bg-[var(--white)] rounded-2xl px-6 py-12 animate-[show_0.5s_forwards]"
        style="box-shadow: 0 0.125rem 0.25rem 0.125rem rgba(11, 9, 10, 0.04);"
      >
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

<style lang="postcss" scoped>
/* 
  保留动画和过渡效果：
  1. modal过渡动画
  2. show/leave关键帧
*/

/* modal过渡效果 */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-leave-to :deep(.modal) {
  animation: leave 0.5s forwards;
}

/* 关键帧动画 */
@keyframes show {
  from {
    opacity: 0.7;
    margin-top: -10rem;
  }
  to {
    opacity: 1;
    margin-top: 0;
  }
}

@keyframes leave {
  from {
    opacity: 1;
    margin-top: 0;
  }
  to {
    opacity: 0;
    margin-top: -10rem;
  }
}
</style>
