# Smart-Med 智能医疗项目仓库

> 杭州医学院智能医学工程专业 | 医疗健康IT方向学习与项目仓库

## 项目结构
- `med-dashboard/`：医疗数据仪表盘（核心实战项目）

## med-dashboard 医疗数据仪表盘
### 项目背景
本项目是面向医疗机构的轻量级医疗数据仪表盘，用于展示患者就诊数据、科室运营数据、医疗资源占用情况等，帮助医护/管理岗快速掌握核心医疗数据。

### 核心功能
- 📊 患者就诊量趋势可视化（日/周/月）
- 🏥 科室床位占用率实时监控
- 📈 医疗耗材使用统计与预警
- 📋 基础数据筛选/导出功能

### 技术栈
- 前端：HTML/CSS/JavaScript / React（根据实际技术栈修改）
- 数据可视化：ECharts / Chart.js（医疗数据可视化常用库）
- 后端（可选）：Node.js + MySQL（医疗数据存储）

### 运行方式
```bash
# 克隆仓库
git clone https://github.com/Bay-Color/smart-med.git
cd smart-med/med-dashboard

# 安装依赖（如有）
npm install

# 启动项目
npm run dev
