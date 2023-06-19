import { useState, useEffect } from "react";
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const Wrapper = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter()

  const items= [
    {
      label: 'личный кабинет',
      key: "/login",
      icon: <UserOutlined />,
    }
  ]

  const handleClickMenu = ({ item, key }) => {
    router.push(key)
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <Menu theme="dark" mode="horizontal" {...{ items }} onClick={handleClickMenu} />
      </Header>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};


export default Wrapper;