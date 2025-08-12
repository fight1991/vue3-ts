<template>
  <div class="dashboard-demo">
    <div class="content-grid">
      <!-- 统计卡片 -->
      <div class="stats-section">
        <h2>数据统计</h2>
        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <h3>{{ stats.users }}</h3>
              <p>总用户数</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div class="stat-info">
              <h3>{{ stats.orders }}</h3>
              <p>订单数量</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">💰</div>
            <div class="stat-info">
              <h3>¥{{ stats.revenue }}</h3>
              <p>总收入</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📈</div>
            <div class="stat-info">
              <h3>{{ stats.growth }}%</h3>
              <p>增长率</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 快速操作 -->
      <div class="actions-section">
        <h2>快速操作</h2>
        <div class="action-buttons">
          <a-button type="primary" @click="handleCreateUser">
            <template #icon><UserAddOutlined /></template>
            创建用户
          </a-button>
          <a-button @click="handleViewReports">
            <template #icon><BarChartOutlined /></template>
            查看报表
          </a-button>
          <a-button @click="handleSettings">
            <template #icon><SettingOutlined /></template>
            系统设置
          </a-button>
          <a-button @click="refreshStats" :loading="loading">
            <template #icon><ReloadOutlined /></template>
            刷新数据
          </a-button>
        </div>
      </div>

      <!-- 最近活动 -->
      <div class="activities-section">
        <h2>最近活动</h2>
        <div class="activity-list">
          <div v-for="activity in activities" :key="activity.id" class="activity-item">
            <div class="activity-avatar">
              <a-avatar>{{ activity.user.charAt(0) }}</a-avatar>
            </div>
            <div class="activity-content">
              <p>
                <strong>{{ activity.user }}</strong> {{ activity.action }}
              </p>
              <span class="activity-time">{{ formatTime(activity.time) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 待办事项 -->
      <div class="todos-section">
        <h2>待办事项</h2>
        <div class="todo-list">
          <div
            v-for="todo in todos"
            :key="todo.id"
            class="todo-item"
            :class="{ completed: todo.completed }"
          >
            <a-checkbox v-model:checked="todo.completed" @change="handleTodoChange(todo)">
              {{ todo.title }}
            </a-checkbox>
            <span class="todo-priority" :class="todo.priority">
              {{ getPriorityText(todo.priority) }}
            </span>
          </div>
        </div>
        <a-button @click="handleAddTodo" type="dashed" block>
          <template #icon><PlusOutlined /></template>
          添加待办事项
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { message } from 'ant-design-vue'
import {
  UserAddOutlined,
  BarChartOutlined,
  SettingOutlined,
  ReloadOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue'
import { useDashboard, type Todo } from './useDashboard'

// 使用组合式函数
const {
  loading,
  stats,
  activities,
  todos,
  refreshStats,
  addActivity,
  addTodo,
  toggleTodo,
  formatTime,
  getPriorityText,
} = useDashboard()

// 快速操作方法
const handleCreateUser = () => {
  message.success('跳转到用户创建页面')
  addActivity('当前用户', '访问了用户创建页面')
}

const handleViewReports = () => {
  message.info('跳转到报表页面')
  addActivity('当前用户', '查看了报表页面')
}

const handleSettings = () => {
  message.info('跳转到系统设置页面')
  addActivity('当前用户', '访问了系统设置页面')
}

const handleTodoChange = (todo: Todo) => {
  toggleTodo(todo)
}

const handleAddTodo = () => {
  addTodo('新的待办事项', 'medium')
}

// 生命周期
onMounted(() => {
  console.log('Dashboard Demo 页面已加载')
  addActivity('当前用户', '访问了Dashboard Demo页面')
})
</script>

<style scoped lang="scss">
.dashboard-demo {
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .stats-section,
  .actions-section,
  .activities-section,
  .todos-section {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    h2 {
      margin-bottom: 16px;
      color: #333;
      font-size: 18px;
    }
  }

  .stats-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    .stat-card {
      display: flex;
      align-items: center;
      padding: 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 8px;

      .stat-icon {
        font-size: 24px;
        margin-right: 12px;
      }

      .stat-info {
        h3 {
          margin: 0 0 4px 0;
          font-size: 20px;
          font-weight: bold;
        }

        p {
          margin: 0;
          font-size: 12px;
          opacity: 0.9;
        }
      }

      &:nth-child(2) {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      }

      &:nth-child(3) {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      }

      &:nth-child(4) {
        background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      }
    }
  }

  .action-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    .ant-btn {
      flex: 1;
      min-width: 120px;
    }
  }

  .activity-list {
    .activity-item {
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      .activity-avatar {
        margin-right: 12px;
      }

      .activity-content {
        flex: 1;

        p {
          margin: 0 0 4px 0;
          font-size: 14px;
        }

        .activity-time {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }

  .todo-list {
    margin-bottom: 16px;

    .todo-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      &.completed {
        opacity: 0.6;

        :deep(.ant-checkbox-wrapper) {
          text-decoration: line-through;
        }
      }

      .todo-priority {
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;

        &.high {
          background: #ff4d4f;
          color: white;
        }

        &.medium {
          background: #faad14;
          color: white;
        }

        &.low {
          background: #52c41a;
          color: white;
        }
      }
    }
  }
}
</style>
