<template>
  <!-- 姓名输入弹窗组件（ant-design-vue 版） -->
  <a-modal
    :open="visible"
    title="请输入您的姓名"
    width="400px"
    :maskClosable="false"
    :keyboard="false"
    @cancel="handleCancel"
    @ok="handleConfirm"
  >
    <!-- 姓名输入表单 -->
    <a-form
      :model="form"
      :rules="rules"
      ref="formRef"
      layout="vertical"
    >
      <a-form-item
        name="name"
        noStyle
      >
        <a-input
          v-model:value="form.name"
          placeholder="请输入您的真实姓名"
          :maxlength="20"
          allowClear
          show-count
          @pressEnter="handleConfirm"
        />
      </a-form-item>
    </a-form>

    <template #footer>
      <a-button key="cancel" @click="handleCancel">取消</a-button>
      <a-button
        key="confirm"
        type="primary"
        :loading="loading"
        @click="handleConfirm"
      >
        确认
      </a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { message } from 'ant-design-vue';
import type { FormInstance } from 'ant-design-vue';

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
const visible = ref(props.modelValue);
const loading = ref(false);
const formRef = ref<FormInstance>();
const form = reactive({
  name: props.defaultName || ''
});

// 表单校验规则
const rules = reactive({
  name: [
    { required: true, message: '请输入您的姓名！', trigger: 'blur' },
    { pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/, message: '姓名仅支持中文/英文！', trigger: 'blur' }
  ]
});

// 监听 modelValue 变化，实现双向绑定
watch(
  () => props.modelValue,
  (val) => {
    visible.value = val;
    // 弹窗打开时清空输入框
    if (val) {
      form.name = '';
    }
  },
  { immediate: true }
);

// 监听弹窗自身显隐变化，同步给父组件
watch(
  () => visible.value,
  (val) => {
    emit('update:modelValue', val);
  }
);

// 取消按钮/弹窗关闭逻辑
const handleCancel = () => {
  visible.value = false;
  form.name = ''; // 关闭时清空输入
};

// 确认提交逻辑
const handleConfirm = async () => {
  try {
    // 表单校验
    await formRef.value?.validate();
    loading.value = true;

    // 模拟接口请求（可替换为真实业务逻辑）
    setTimeout(() => {
      loading.value = false;
      message.success('姓名提交成功！');
      // 向父组件传递输入的姓名
      emit('confirm', form.name);
      // 关闭弹窗
      handleCancel();
    }, 800);
  } catch (error) {
    message.error('请正确填写姓名！');
  }
};
</script>

<style scoped>
/* 自定义样式优化 */
:deep(.ant-modal-body) {
  padding-top: 20px;
}
:deep(.ant-input) {
  width: 100%;
}
</style>
