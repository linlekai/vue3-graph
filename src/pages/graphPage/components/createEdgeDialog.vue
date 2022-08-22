<template>
  <ElDialog :model-value="props.dialogVisible" title="Tips" width="30%" @close="closeDialog">
    <ElForm ref="ruleFormRef" :model="form" :rules="rules">
      <ElFormItem label="id" :label-width="formLabelWidth" prop="id">
        <ElInput v-model="form.id"></ElInput>
      </ElFormItem>
      <ElFormItem label="label" :label-width="formLabelWidth" prop="label">
        <ElInput v-model="form.label"></ElInput>
      </ElFormItem>
    </ElForm>
    <template #footer>
      <div class="footer">
        <ElButton @click="closeDialog">取消</ElButton>
        <ElButton type="primary" @click="checkForm">提交</ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup>
import { reactive, ref, defineProps, defineEmits } from 'vue'
import {
  ElDialog,
  ElForm,
  ElFormItem,
  ElButton,
  ElInput,
  FormRules,
  FormInstance,
  ElMessage
} from 'element-plus'
import Service from '../graphService'
import { Random } from 'mockjs'
import { stubFalse } from 'lodash'

const props = defineProps({
  sourceId: {
    type: String,
    required: true
  },
  dialogVisible: Boolean
})
const $emit = defineEmits(['closeDialog'])
const eventSetup = Service.setup()

const ruleFormRef = ref<FormInstance>()
const formLabelWidth = '80px'
// const dialogVisible = ref(false)
const form = reactive({
  id: '',
  label: ''
})
const rules = reactive<FormRules>({
  id: [{ required: true, message: '请输入id', trigger: 'blur' }],
  label: [{ required: true, message: '请输入label', trigger: 'blur' }]
})
async function checkForm() {
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      comfirm()
    }
  })
}
function clearForm() {
  if (!ruleFormRef.value) return
  ruleFormRef.value.resetFields()
}

function closeDialog(flag = false) {
  clearForm()
  $emit('closeDialog', flag)
}
function comfirm() {
  let model = {
    id: String(Random.natural()),
    source: props.sourceId,
    target: form.id,
    label: form.label
  }
  let source = eventSetup.findById(props.sourceId)
  let target = eventSetup.findById(form.id)
  if (source && target) {
    eventSetup.addItem('edge', model)
    ElMessage({
      type: 'success',
      message: '创建成功'
    })
    closeDialog(true)
  } else {
    ElMessage({
      type: 'error',
      message: '元素未找到'
    })
  }
}
</script>

<style scoped lang="less"></style>
