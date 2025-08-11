<template>
  <div class="business-edit">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1>{{ isEdit ? '编辑' : '新增' }}{{ pageTitle }}</h1>
      <div class="header-actions">
        <a-button @click="handleBack(false)">返回</a-button>
      </div>
    </div>

    <!-- 表单内容 -->
    <div class="form-container">
      <a-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        layout="vertical"
        @finish="handleSubmit"
      >
        <a-row :gutter="24">
          <!-- 基本信息 -->
          <a-col :span="24">
            <div class="form-section">
              <h3>基本信息</h3>
              <a-row :gutter="16">
                <a-col :span="12">
                  <a-form-item label="名称" name="name">
                    <a-input
                      v-model:value="formData.name"
                      placeholder="请输入名称"
                      :maxlength="50"
                      show-count
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="类型" name="type">
                    <a-select v-model:value="formData.type" placeholder="请选择类型">
                      <a-select-option value="type1">类型1</a-select-option>
                      <a-select-option value="type2">类型2</a-select-option>
                      <a-select-option value="type3">类型3</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row :gutter="16">
                <a-col :span="12">
                  <a-form-item label="状态" name="status">
                    <a-radio-group v-model:value="formData.status">
                      <a-radio value="active">启用</a-radio>
                      <a-radio value="inactive">禁用</a-radio>
                    </a-radio-group>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="优先级" name="priority">
                    <a-select v-model:value="formData.priority" placeholder="请选择优先级">
                      <a-select-option value="high">高</a-select-option>
                      <a-select-option value="medium">中</a-select-option>
                      <a-select-option value="low">低</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-form-item label="描述" name="description">
                <a-textarea
                  v-model:value="formData.description"
                  placeholder="请输入描述信息"
                  :rows="4"
                  :maxlength="200"
                  show-count
                />
              </a-form-item>
            </div>
          </a-col>
        </a-row>

        <!-- 表单操作按钮 -->
        <div class="form-actions">
          <a-space>
            <a-button @click="handleReset">重置</a-button>
            <a-button type="primary" html-type="submit" :loading="submitLoading">
              {{ isEdit ? '保存' : '创建' }}
            </a-button>
          </a-space>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import dayjs, { type Dayjs } from 'dayjs'
import { useTabs } from '@/hooks/tabs'

// 定义组件名称
defineOptions({
  name: 'BusinessEdit',
})

// 路由和基本状态
const route = useRoute()
const router = useRouter()
const formRef = ref<FormInstance>()
const submitLoading = ref(false)
const tab = useTabs()
// 页面状态
const pageTitle = computed(() => '业务项目')
const isEdit = computed(() => !!route.params.id)
const itemId = computed(() => route.params.id as string)

// 表单数据接口
interface FormData {
  name: string
  type: string
  status: 'active' | 'inactive'
  priority: 'high' | 'medium' | 'low'
  description: string
  price: number | null
  quantity: number | null
  validDate: Dayjs | null
  tags: string[]
  owner: string
  isRecommended: boolean
  remarks: string
}

// 表单数据
const formData = reactive<FormData>({
  name: '',
  type: '',
  status: 'active',
  priority: 'medium',
  description: '',
  price: null,
  quantity: null,
  validDate: null,
  tags: [],
  owner: '',
  isRecommended: false,
  remarks: '',
})

// 标签选项
const tagOptions = [
  { label: '热门', value: 'hot' },
  { label: '新品', value: 'new' },
  { label: '促销', value: 'promotion' },
  { label: '限时', value: 'limited' },
]

// 表单验证规则
const formRules: Record<string, Rule[]> = {
  name: [
    { required: false, message: '请输入名称', trigger: 'blur' },
    { min: 2, max: 50, message: '名称长度在 2 到 50 个字符', trigger: 'blur' },
  ],
  type: [{ required: false, message: '请选择类型', trigger: 'change' }],
  status: [{ required: false, message: '请选择状态', trigger: 'change' }],
  description: [{ max: 200, message: '描述不能超过200个字符', trigger: 'blur' }],
  price: [
    { required: false, message: '请输入价格', trigger: 'blur' },
    { type: 'number', min: 0, message: '价格不能小于0', trigger: 'blur' },
  ],
  quantity: [
    { required: false, message: '请输入数量', trigger: 'blur' },
    { type: 'number', min: 0, message: '数量不能小于0', trigger: 'blur' },
  ],
}

// 加载数据
const loadData = async () => {
  if (!isEdit.value) return

  try {
    // 模拟 API 调用
    await new Promise((resolve) => setTimeout(resolve, 500))

    // 模拟加载的数据
    Object.assign(formData, {
      name: '示例项目',
      type: 'type1',
      status: 'active',
      priority: 'high',
      description: '这是一个示例项目的描述信息',
      price: 99.99,
      quantity: 100,
      validDate: dayjs().add(30, 'day'),
      tags: ['hot', 'new'],
      owner: 'user1',
      isRecommended: true,
      remarks: '这是备注信息',
    })

    message.success('数据加载成功')
  } catch (error) {
    message.error('数据加载失败')
    console.error('加载数据失败:', error)
  }
}

// 提交表单
const handleSubmit = async (values: FormData) => {
  submitLoading.value = true

  try {
    // 模拟 API 调用
    await new Promise((resolve) => setTimeout(resolve, 500))

    console.log('提交的数据:', values)

    if (isEdit.value) {
      message.success('保存成功')
    } else {
      message.success('创建成功')
    }

    // 提交成功后返回列表页
    handleBack(true)
  } catch (error) {
    message.error(isEdit.value ? '保存失败' : '创建失败')
    console.error('提交失败:', error)
  } finally {
    submitLoading.value = false
  }
}

// 重置表单
const handleReset = () => {
  formRef.value?.resetFields()
  message.info('表单已重置')
}

// 返回上一页
const handleBack = (refresh: boolean) => {
  console.log('返回上一页, refresh:', refresh)
  tab.back({
    name: 'main-business-customers',
    refresh,
  })
}

// 页面初始化
onMounted(() => {
  if (isEdit.value) {
    loadData()
  }
})
</script>

<style scoped lang="scss">
.business-edit {
  padding: 20px;
  background: #fff;
  min-height: 100vh;

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;

    h1 {
      margin: 0;
      color: #2c3e50;
      font-size: 24px;
      font-weight: 600;
    }
  }

  .form-container {
    max-width: 1000px;

    .form-section {
      margin-bottom: 32px;
      padding: 24px;
      background: #fafafa;
      border-radius: 8px;
      border: 1px solid #e8e8e8;

      h3 {
        margin: 0 0 20px 0;
        color: #1890ff;
        font-size: 16px;
        font-weight: 600;
        border-bottom: 2px solid #1890ff;
        padding-bottom: 8px;
      }

      :deep(.ant-form-item) {
        margin-bottom: 16px;
      }

      :deep(.ant-form-item-label) {
        font-weight: 500;
      }
    }

    .form-actions {
      margin-top: 32px;
      padding: 24px 0;
      text-align: center;
      border-top: 1px solid #f0f0f0;
    }
  }

  // 表单项样式优化
  :deep(.ant-input-number) {
    width: 100%;
  }

  :deep(.ant-select) {
    width: 100%;
  }

  :deep(.ant-date-picker) {
    width: 100%;
  }

  :deep(.ant-input) {
    &:focus {
      border-color: #1890ff;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }

  :deep(.ant-btn-primary) {
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    border: none;

    &:hover {
      background: linear-gradient(135deg, #40a9ff 0%, #1890ff 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
    }
  }
}
</style>
