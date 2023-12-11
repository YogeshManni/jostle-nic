import React, { useState } from "react";
import {
  AppstoreAddOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Events from "./components/Events/Events";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Discussion from "./components/Discussion/Discussion";
import Posts from "./components/posts/Posts";
import logo from "./assets/img/logo.png";
import People from "./components/People/People";
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  route?: any,
  children?: MenuItem[]
): MenuItem {
  return {
    label,
    key,
    icon,
    route,
    children,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Posts", "0", <PieChartOutlined />, "/"),
  getItem("Events", "1", <DesktopOutlined />, "/events"),
  getItem("Discussions", "2", <FileOutlined />, "/discussions"),
  getItem("Create", "3", <AppstoreAddOutlined />, "/create"),
   getItem("People", "4", <UserOutlined />, "/people")
];

const App: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuClick: MenuProps["onClick"] = (e: any) => {
    //
    let data: any = items[e.key];
    navigate(data.route);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        onBreakpoint={(broken) => {
          //console.log(broken);
        }}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="h-[20px] auto m-5 flex items-center justify-center">
          <img src={logo} className=" h-auto" alt="logo"></img>
        </div>
        <Menu
          onClick={menuClick}
          theme="dark"
          defaultSelectedKeys={["0"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}></Header>
        <Content style={{ margin: "0 16px" }}>
          <br />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/" element={<Posts></Posts>}></Route>
              <Route path="/events" element={<Events></Events>}></Route>
              <Route path="/discussions" element={<Discussion />}></Route>
              <Route path="/create" element={<CreatePost />}></Route>
	       <Route path="/people" element={<People />}></Route>
            </Routes>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Yogesh Manni ©2024
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
