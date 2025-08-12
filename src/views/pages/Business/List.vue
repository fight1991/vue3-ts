<template>
  <div class="business-list">
    <!-- 搜索栏 -->
    <div class="search-form">
      <a-form layout="inline" :model="searchForm">
        <a-form-item label="名称">
          <a-input
            v-model:value="searchForm.name"
            placeholder="请输入名称"
            allow-clear
            style="width: 200px"
          />
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-model:value="searchForm.status"
            placeholder="请选择状态"
            allow-clear
            style="width: 120px"
          >
            <a-select-option value="active">启用</a-select-option>
            <a-select-option value="inactive">禁用</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleSearch" :loading="loading"> 搜索 </a-button>
          <a-button @click="handleReset" style="margin-left: 8px"> 重置 </a-button>
        </a-form-item>
      </a-form>
    </div>

    <!-- 操作栏 -->
    <div class="action-bar">
      <a-button type="primary" @click="handleAdd"> 新增 </a-button>
      <a-button :disabled="!hasSelected" @click="handleBatchDelete"> 批量删除 </a-button>
    </div>

    <!-- 数据表格 -->
    <div class="data-table">
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
        :row-selection="rowSelection"
        @change="handleTableChange"
        size="middle"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="(record as ListItem).status === 'active' ? 'green' : 'red'">
              {{ (record as ListItem).status === 'active' ? '启用' : '禁用' }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleEdit(record as ListItem)">
                编辑
              </a-button>
              <a-button type="link" size="small" @click="handleView(record as ListItem)">
                查看
              </a-button>
              <a-popconfirm title="确定要删除吗？" @confirm="handleDelete(record as ListItem)">
                <a-button type="link" size="small" danger> 删除 </a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import type { TableProps, TableColumnsType } from 'ant-design-vue'
import { useTabs } from '@/hooks/tabs'
const tab = useTabs()
// 定义Key类型
type Key = string | number

// 定义组件名称
defineOptions({
  name: 'BusinessList',
})

// 数据接口
interface ListItem {
  id: number
  name: string
  type: string
  status: 'active' | 'inactive'
  createTime: string
  updateTime: string
}

interface SearchForm {
  name: string
  status: string
}

// 分页类型
type PaginationConfig = NonNullable<TableProps['pagination']>

// 响应式数据
const loading = ref(false)
const selectedRowKeys = ref<Key[]>([])

const searchForm = reactive<SearchForm>({
  name: '',
  status: '',
})

onMounted(() => {
  console.log('我是列表页------> BusinessList mounted')
})

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条数据`,
})

const tableData = ref<ListItem[]>([
  {
    id: 1,
    name: '业务项目A',
    type: '类型1',
    status: 'active',
    createTime: '2024-01-10 10:30:00',
    updateTime: '2024-01-10 14:20:00',
  },
  {
    id: 2,
    name: '业务项目B',
    type: '类型2',
    status: 'inactive',
    createTime: '2024-01-09 15:20:00',
    updateTime: '2024-01-09 16:45:00',
  },
  {
    id: 3,
    name: '业务项目C',
    type: '类型1',
    status: 'active',
    createTime: '2024-01-08 09:15:00',
    updateTime: '2024-01-08 11:30:00',
  },
])

// 表格列配置
const columns: TableColumnsType<ListItem> = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: '名称', dataIndex: 'name', key: 'name', width: 200 },
  { title: '类型', dataIndex: 'type', key: 'type', width: 120 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 160 },
  { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', width: 160 },
  { title: '操作', key: 'action', width: 180, fixed: 'right' as const },
]

// 行选择配置
const rowSelection = {
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys: Key[]) => {
    selectedRowKeys.value = keys
  },
}

// 计算属性
const hasSelected = computed(() => selectedRowKeys.value.length > 0)

// 方法
const handleSearch = async () => {
  loading.value = true
  try {
    // 模拟搜索请求
    await new Promise((resolve) => setTimeout(resolve, 500))
    message.success('搜索完成')
    pagination.current = 1
  } catch (error) {
    message.error('搜索失败')
  } finally {
    loading.value = false
  }
}

const handleReset = () => {
  searchForm.name = ''
  searchForm.status = ''
  handleSearch()
}

const handleAdd = () => {
  message.info('跳转到新增页面')
}

const handleEdit = (record: ListItem) => {
  tab.replace({
    name: 'main-business-customers-op',
    tabTitle: '客户管理-' + '编辑',
    query: {
      opType: 'edit',
      id: record.id,
    },
  })
}

const handleView = (record: ListItem) => {
  message.info(`查看项目: ${record.name}`)
}

const handleDelete = async (record: ListItem) => {
  try {
    // 模拟删除请求
    await new Promise((resolve) => setTimeout(resolve, 300))
    message.success(`删除成功: ${record.name}`)
    // 这里应该重新加载数据
  } catch (error) {
    message.error('删除失败')
  }
}

const handleBatchDelete = async () => {
  try {
    // 模拟批量删除请求
    await new Promise((resolve) => setTimeout(resolve, 500))
    message.success(`批量删除成功，共删除 ${selectedRowKeys.value.length} 项`)
    selectedRowKeys.value = []
    // 这里应该重新加载数据
  } catch (error) {
    message.error('批量删除失败')
  }
}

const handleTableChange = (pag: PaginationConfig) => {
  if (pag && typeof pag === 'object' && 'current' in pag) {
    pagination.current = pag.current || 1
    pagination.pageSize = pag.pageSize || 10
    // 这里应该重新加载数据
  }
}

// 初始化数据
const loadData = async () => {
  loading.value = true
  try {
    // 模拟数据加载
    await new Promise((resolve) => setTimeout(resolve, 300))
    pagination.total = 50 // 模拟总数
  } catch (error) {
    message.error('数据加载失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped lang="scss">
.business-list {
  padding: 20px;
  background: #fff;

  .search-form {
    background: #fafafa;
    padding: 16px;
    border-radius: 6px;
    margin-bottom: 16px;

    :deep(.ant-form-item) {
      margin-bottom: 0;
    }
  }

  .action-bar {
    margin-bottom: 16px;
    display: flex;
    gap: 8px;
  }

  .data-table {
    :deep(.ant-table) {
      .ant-table-thead > tr > th {
        background: #fafafa;
        font-weight: 600;
      }

      .ant-table-tbody > tr:hover > td {
        background: #f5f5f5;
      }
    }
  }
}
</style>
