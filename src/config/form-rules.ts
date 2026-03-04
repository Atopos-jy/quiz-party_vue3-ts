export const nameFieldRules = [
  { required: true, message: '请输入您的姓名！', trigger: 'blur' },
  { pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/, message: '姓名仅支持中文/英文！', trigger: 'blur' }
];
