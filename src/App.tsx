import React from 'react';
import { Layout, Menu, ConfigProvider, theme } from 'antd';
import { FileSearchOutlined, SettingOutlined, HomeOutlined, BarChartOutlined, QuestionCircleOutlined, InfoCircleOutlined, HistoryOutlined, UserOutlined, ToolOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // 路由核心
import Viewer from './pages/Viewer';
import Setting from './pages/Setting';
import PatientList from './components/PatientList';
import Analytics from './pages/Analytics';
import History from './pages/History';
import Tools from './pages/Tools';
import Help from './pages/Help';
import About from './pages/About';

const { Header, Content, Sider } = Layout;

// 侧边栏菜单（面试考点：路由与菜单联动）
const MenuSide: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      items={[
        { key: '1', icon: <HomeOutlined />, label: '患者列表', onClick: () => navigate('/') },
        { key: '2', icon: <FileSearchOutlined />, label: '影像查看', onClick: () => navigate('/viewer') },
        { key: '3', icon: <BarChartOutlined />, label: '统计分析', onClick: () => navigate('/analytics') },
        { key: '4', icon: <HistoryOutlined />, label: '历史记录', onClick: () => navigate('/history') },
        { key: '5', icon: <ToolOutlined />, label: '工具集', onClick: () => navigate('/tools') },
        { key: '6', icon: <SettingOutlined />, label: '系统设置', onClick: () => navigate('/setting') },
        { key: '7', icon: <QuestionCircleOutlined />, label: '帮助中心', onClick: () => navigate('/help') },
        { key: '8', icon: <InfoCircleOutlined />, label: '关于我们', onClick: () => navigate('/about') },
      ]}
    />
  );
};

// 全局布局（面试重点：AntD暗色主题+布局嵌套）
const MainLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 20px', display: 'flex', alignItems: 'center' }}>
        <div style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
          智能医学工程 - 数字化阅片台
        </div>
      </Header>
      <Layout>
        <Sider width={250} style={{ background: '#0f172a' }}>
          <MenuSide />
        </Sider>
        <Content style={{ background: '#1e293b', color: '#fff' }}>
          <Routes>
            <Route path="/" element={<PatientList />} /> {/* 首页：患者列表 */}
            <Route path="/viewer" element={<Viewer />} /> {/* 影像查看（默认） */}
            <Route path="/viewer/:id" element={<Viewer />} /> {/* 影像查看（带患者ID） */}
            <Route path="/analytics" element={<Analytics />} /> {/* 统计分析 */}
            <Route path="/history" element={<History />} /> {/* 历史记录 */}
            <Route path="/tools" element={<Tools />} /> {/* 工具集 */}
            <Route path="/setting" element={<Setting />} /> {/* 系统设置 */}
            <Route path="/help" element={<Help />} /> {/* 帮助中心 */}
            <Route path="/about" element={<About />} /> {/* 关于我们 */}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

// 根组件（面试考点：ConfigProvider全局配置）
const App: React.FC = () => {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}> {/* 医疗暗色主题 */}
      <Router> {/* 路由包裹整个应用 */}
        <MainLayout />
      </Router>
    </ConfigProvider>
  );
};

export default App;