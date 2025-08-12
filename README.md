# seeker-web4

This template should help get you started developing with Vue 3 in Vite.

## 路由路径配置要求

> 1.  一级菜单：必须以模块命名，例如：登录页 /login
> 2.  二级菜单：必须以一级名称+二级名 后台管理页面首页 /main/index

## 页签跳转

> 1. tabs.open 打开新页签, 需要定义一个tabId
> 2. tabs.push 已有的页签中查找,有则激活(不刷新页面),无则新增
> 3. tabs.replace 替换已有页签,无则打开新页签(刷新页面)
> 4. tabs.redirectTo 关闭当前tab,打开指定tab(如果存在重新打开)

## 全局loading和后台管理页面每个页签下的loading

> 1. 非后台管理页面发送请求时默认开启全局loading
> 2. 进入后台管理页面默认开启局部loading
> 3. 若要在后台管理页面开启全局loading(使用dialog组件时会用到) 每个请求增加globalLoading: true
> 4. 局部loading在store/tabs中 tabList item.loadingNum 计数
> 5. 全局loading在 store/loading中 通过loadingNum 计数

## git commit 约定式提交

- build/chore: 用于构建系统（包括脚本、配置或工具）和依赖的变化。
- ci: 用于系统持续集成、持续部署相关的配置文件、脚本文件、配置或者工具。
- docs: 用于标识项目相关文档的更改。
- feat: 用于标识新功能。
- fix： 用于标识 bug 修复。
- perf: 用于标识性能提升。
- refactor: 用于标识代码重构，既不添加新功能也不修复错误–例如删除冗余代码、简化代码、重命名变量等。
- style: 用于标记代码格式化，代码风格调制，修复 checkstyle 等问题。
- tets: 用于标记测试相关的更改，修改现有测试或添加新的测试。
- revert: 用户分支回滚。
