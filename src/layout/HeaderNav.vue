<template>
  <a-layout-header class="header-nav">
    <!-- 左侧折叠按钮 -->
    <div class="header-left">
      <div class="trigger" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </div>
    </div>

    <!-- 右侧用户信息 -->
    <div class="header-right">
      <!-- 用户信息下拉菜单 -->
      <a-dropdown placement="bottomRight" :trigger="['click']">
        <div class="user-info">
          <a-avatar :src="userInfo.avatar" :style="{ backgroundColor: '#87d068' }">
            {{ userInfo.name?.charAt(0) || 'U' }}
          </a-avatar>
          <div class="user-details">
            <span class="user-name">{{ userInfo.name || '用户' }}</span>
            <small class="user-role">{{ userInfo.role || '管理员' }}</small>
          </div>
          <DownOutlined class="dropdown-icon" />
        </div>
        <template #overlay>
          <a-menu @click="handleUserMenuClick">
            <a-menu-item key="profile">
              <UserOutlined />
              个人中心
            </a-menu-item>
            <a-menu-item key="settings">
              <SettingOutlined />
              账户设置
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="logout" style="color: #ff4d4f">
              <LogoutOutlined />
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  UserOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons-vue'

interface UserInfo {
  name: string
  avatar?: string
  email?: string
  role?: string
}

const router = useRouter()
const collapsed = ref<boolean>(false)

// 用户信息
const userInfo = ref<UserInfo>({
  name: '管理员',
  avatar: '',
  email: 'admin@example.com',
  role: '系统管理员',
})

const emit = defineEmits<{
  (e: 'update:collapsedStatus', value: boolean): void
}>()

// 切换侧边栏折叠状态
const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
  emit('update:collapsedStatus', collapsed.value)
}

// 用户菜单点击处理
const handleUserMenuClick = (info: MenuInfo) => {
  const key = String(info.key)
  switch (key) {
    case 'profile':
      router.push('/profile')
      message.info('跳转到个人中心')
      break
    case 'settings':
      router.push('/settings')
      message.info('跳转到账户设置')
      break
    case 'help':
      window.open('/help', '_blank')
      message.info('打开帮助中心')
      break
    case 'logout':
      handleLogout()
      break
    default:
      break
  }
}

// 退出登录
const handleLogout = () => {
  // 清除用户信息、token等
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')

  // 跳转到登录页
  router.push('/login')
  message.success('已退出登录')
}
</script>
<style scoped lang="scss">
.header-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: 64px;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
}

.trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 4px;

  &:hover {
    color: #1890ff;
    background-color: rgba(24, 144, 255, 0.1);
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  .user-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1.2;

    .user-name {
      font-size: 14px;
      color: #333;
      font-weight: 500;
    }

    .user-role {
      font-size: 12px;
      color: #999;
      margin-top: 2px;
    }
  }

  .dropdown-icon {
    font-size: 12px;
    color: #999;
    transition: transform 0.3s;
    margin-left: 4px;
  }

  &:hover .dropdown-icon {
    transform: translateY(1px);
  }
}

// 用户下拉菜单样式
:global(.ant-dropdown-menu) {
  min-width: 120px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  .ant-dropdown-menu-item {
    padding: 8px 16px;
    transition: all 0.3s;

    &:hover {
      background-color: #f5f5f5;
    }

    .anticon {
      font-size: 14px;
      color: #666;
      margin-right: 8px;
    }
  }

  .ant-dropdown-menu-item-divider {
    margin: 4px 0;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .header-nav {
    padding: 0 8px;
  }

  .user-info .user-details {
    display: none;
  }
}
</style>
