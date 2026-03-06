<template>
  <a-modal
    :open="visible"
    title="请给自己取一个好听的名字吧~🥰"
    width="400px"
    :maskClosable="false"
    :keyboard="false"
    :centered="true"
    @cancel="handleCancel"
    @ok="handleConfirm"
  >
    <!-- 姓名输入表单 -->
    <a-form
      :model="form"
      :rules="rules"
      ref="formRef"
      layout="vertical"
      class="m-0"
    >
      <a-form-item
        name="name"
        class="mt-3"
      >
        <a-input
          v-model:value="form.name"
          placeholder="请输入您的真实姓名"
          :maxlength="20"
          allowClear
          @pressEnter="handleConfirm"
        />
      </a-form-item>
    </a-form>

    <template #footer>
      <a-button 
        key="confirm" 
        :loading="loading" 
        class="w-full h-11 rounded-lg bg-[var(--primary)] text-white !border-none" 
        @click="handleConfirm"
      >
        确认
      </a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { getUserInfo } from '@/api/user';
import type { FormInstance } from 'ant-design-vue';
import  {nameFieldRules } from '@/config/form-rules';

// 定义组件属性
const props = defineProps({
  // 控制弹窗显示/隐藏（v-model 绑定）
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  },
  // 可选：默认填充的姓名
  defaultName: {
    type: String,
    default: ''
  }
});

// 定义组件事件
const emit = defineEmits([
  'update:modelValue', // 弹窗显隐双向绑定
  'confirm' // 确认提交事件，返回姓名
]);

// 响应式数据
const visible = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val)
});
const loading = ref(false);
const formRef = ref<FormInstance>();
const form = reactive({
  name: props.defaultName || ''
});

// 表单校验规则
const rules = { name: nameFieldRules };

// 取消按钮/弹窗关闭逻辑
const handleCancel = () => {
  visible.value = false;
  form.name = ''; // 关闭时清空输入
};

// 确认提交逻辑
const handleConfirm = async () => {
  // 表单校验
  await formRef.value?.validate();
  
  loading.value = true;
  try {
      const res = await getUserInfo(form.name);
      emit('confirm', res.data.username || form.name);
      handleCancel();
   } finally {
    loading.value = false;
  }
};
</script>

<style lang="postcss" scoped>
/* 
  Ant Design Vue 组件样式覆盖：
  1. 弹窗内容区域样式
  2. 弹窗头部样式
  3. 弹窗标题样式
  4. 弹窗主体和底部样式
  5. 输入框样式
*/

/* 弹窗内容区域 */
:deep(.ant-modal-content) {
  border-radius: 1rem;
  border: 2px solid var(--primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 1.5rem;
  min-height: 220px;
}

/* 弹窗头部 */
:deep(.ant-modal-header) {
  border: none;
  text-align: center;
  min-height: 64px;
}

/* 弹窗标题 */
:deep(.ant-modal-title) {
  font-size: 20px;
  font-weight: 700;
  color: var(--black);
  min-height: 42px;
}

/* 弹窗主体 */
:deep(.ant-modal-body) {
  padding: 0 1.5rem;
}

/* 弹窗底部 */
:deep(.ant-modal-footer) {
  border: none;
  padding: 0 1.5rem;
}

/* 输入框容器 */
:deep(.ant-input-affix-wrapper) {
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid var(--gray-200) !important;
  box-shadow: none;
}

/* 输入框 */
:deep(.ant-input-affix-wrapper .ant-input) {
  height: 100%;
  padding: 0;
  border: none !important;
  box-shadow: none;
  background: transparent;
}
</style>
