import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'

// 模拟API数据类型
export interface DashboardStats {
  users: number
  orders: number
  revenue: string
  growth: number
}

export interface Activity {
  id: number
  user: string
  action: string
  time: string
}

export interface Todo {
  id: number
  title: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
}

// Dashboard 数据管理
export function useDashboard() {
  const loading = ref(false)

  // 统计数据
  const stats = reactive<DashboardStats>({
    users: 1234,
    orders: 567,
    revenue: '89,012',
    growth: 12.5,
  })

  // 活动列表
  const activities = ref<Activity[]>([
    { id: 1, user: '张三', action: '创建了新订单', time: '2024-01-10 14:30' },
    { id: 2, user: '李四', action: '更新了用户信息', time: '2024-01-10 13:45' },
    { id: 3, user: '王五', action: '完成了系统备份', time: '2024-01-10 12:20' },
    { id: 4, user: '赵六', action: '发布了新公告', time: '2024-01-10 11:15' },
  ])

  // 待办事项
  const todos = ref<Todo[]>([
    { id: 1, title: '完成月度报表', completed: false, priority: 'high' },
    { id: 2, title: '更新用户手册', completed: true, priority: 'medium' },
    { id: 3, title: '优化系统性能', completed: false, priority: 'high' },
    { id: 4, title: '备份数据库', completed: false, priority: 'low' },
  ])

  // 刷新统计数据
  const refreshStats = async (): Promise<void> => {
    loading.value = true
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 更新数据
      stats.users += Math.floor(Math.random() * 10)
      stats.orders += Math.floor(Math.random() * 5)
      stats.growth = Number((Math.random() * 20).toFixed(1))

      message.success('数据刷新成功')
    } catch (error) {
      message.error('数据刷新失败')
      console.error('刷新数据失败:', error)
    } finally {
      loading.value = false
    }
  }

  // 添加活动
  const addActivity = (user: string, action: string): void => {
    const newActivity: Activity = {
      id: Date.now(),
      user,
      action,
      time: new Date().toLocaleString('zh-CN'),
    }
    activities.value.unshift(newActivity)

    // 保持最多10条记录
    if (activities.value.length > 10) {
      activities.value = activities.value.slice(0, 10)
    }
  }

  // 添加待办事项
  const addTodo = (title: string, priority: Todo['priority'] = 'medium'): void => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
      priority,
    }
    todos.value.unshift(newTodo)
    message.success('添加待办事项成功')
  }

  // 切换待办事项状态
  const toggleTodo = (todo: Todo): void => {
    todo.completed = !todo.completed
    if (todo.completed) {
      message.success(`完成任务: ${todo.title}`)
      addActivity('当前用户', `完成了任务: ${todo.title}`)
    }
  }

  // 删除待办事项
  const removeTodo = (id: number): void => {
    const index = todos.value.findIndex((todo) => todo.id === id)
    if (index > -1) {
      const todo = todos.value[index]
      todos.value.splice(index, 1)
      message.success(`删除任务: ${todo.title}`)
    }
  }

  // 格式化时间
  const formatTime = (time: string): string => {
    const now = new Date()
    const activityTime = new Date(time)
    const diffMs = now.getTime() - activityTime.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))

    if (diffMins < 1) {
      return '刚刚'
    } else if (diffMins < 60) {
      return `${diffMins}分钟前`
    } else if (diffMins < 1440) {
      return `${Math.floor(diffMins / 60)}小时前`
    } else {
      return time
    }
  }

  // 获取优先级文本
  const getPriorityText = (priority: Todo['priority']): string => {
    const map = {
      high: '高',
      medium: '中',
      low: '低',
    }
    return map[priority] || '中'
  }

  return {
    // 状态
    loading,
    stats,
    activities,
    todos,

    // 方法
    refreshStats,
    addActivity,
    addTodo,
    toggleTodo,
    removeTodo,
    formatTime,
    getPriorityText,
  }
}
