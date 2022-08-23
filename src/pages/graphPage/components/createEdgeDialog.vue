<template>
  <ElDialog
    :model-value="props.dialogVisible"
    title="新增边"
    width="40%"
    @close="closeDialog(false)"
  >
    <ElForm ref="ruleFormRef" :model="form" :rules="rules">
      <ElFormItem label="当前元素id" :label-width="formLabelWidth" prop="source">
        <ElInput v-model="form.source" :disabled="sourceDisabled"></ElInput>
      </ElFormItem>
      <ElFormItem label="目标元素id" :label-width="formLabelWidth" prop="id">
        <ElInput v-model="form.id"></ElInput>
      </ElFormItem>
      <ElFormItem label="label" :label-width="formLabelWidth" prop="label">
        <ElInput v-model="form.label"></ElInput>
      </ElFormItem>
    </ElForm>
    <template #footer>
      <div class="footer">
        <ElButton @click="closeDialog(false)">取消</ElButton>
        <ElButton type="primary" @click="checkForm">提交</ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup>
import { reactive, ref, defineProps, defineEmits, onMounted } from 'vue'
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
    required: false
  },
  dialogVisible: Boolean
})
const $emit = defineEmits(['closeDialog'])
const eventSetup = Service.setup()

const ruleFormRef = ref<FormInstance>()
const sourceDisabled = ref(false)
const formLabelWidth = '100px'
// const dialogVisible = ref(false)
const form = reactive({
  source: '',
  id: '',
  label: ''
})
const rules = reactive<FormRules>({
  source: [{ required: true, message: '请输入id', trigger: 'blur' }],
  id: [{ required: true, message: '请输入id', trigger: 'blur' }],
  label: [{ required: true, message: '请输入label', trigger: 'blur' }]
})

onMounted(() => {
  initData()
})
function initData() {
  form.source = props.sourceId ?? ''
  if (props.sourceId) {
    form.source = props.sourceId
    sourceDisabled.value = true
  }
}
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
  if (!form.source) return
  let model = {
    id: String(Random.natural()),
    source: form.source,
    target: form.id,
    label: form.label
  }
  let source = eventSetup.findById(form.source)
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
