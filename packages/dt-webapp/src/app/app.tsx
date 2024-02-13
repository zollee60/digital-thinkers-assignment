import { Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu, Flex, Typography, theme } from 'antd';
import { DriverProvider } from '../components/DriverProvider';
import { DriverSet } from '../components/DriverSet';

const { Header, Content, Footer } = Layout;

export function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { Title } = Typography;

  return (
    <DriverProvider>
      <div>
        <Layout>
          <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ flex: 1, minWidth: 0 }}
            >
              <Menu.Item key="1">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/drivers">Drivers</Link>
              </Menu.Item>
            </Menu>
          </Header>

          <Content style={{ padding: '0 48px', marginTop: '2rem' }}>
            <div
              style={{
                background: colorBgContainer,
                minHeight: '80vh',
                padding: 24,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <Flex justify="center" style={{ textAlign: 'center' }}>
                      <Flex vertical>
                        <Title> Digital Thinkers Home Assignment</Title>
                        <Title level={2}>Created by Toth Mark Zoltan</Title>
                      </Flex>
                    </Flex>
                  }
                />
                <Route
                  path="/drivers"
                  element={
                    <div>
                      <DriverSet></DriverSet>
                    </div>
                  }
                />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Toth Mark Zoltan ©{new Date().getFullYear()} Created by TMZ Corp
          </Footer>
        </Layout>
        {/* END: routes */}
      </div>
    </DriverProvider>
  );
}

export default App;
