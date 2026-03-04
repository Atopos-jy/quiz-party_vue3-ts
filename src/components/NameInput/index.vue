<template>
  <a-modal
    class="nameinput-modal"
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
      class="name-form"
      :model="form"
      :rules="rules"
      ref="formRef"
      layout="vertical"
    >
      <a-form-item
        name="name"
        class="name-form-item"
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
      <a-button key="confirm" :loading="loading" class="confirm-btn" @click="handleConfirm">确认</a-button>
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

<style src="./NameInput.scss" lang="scss" />
