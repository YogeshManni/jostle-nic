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
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
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
import CreatePost from "./components/createPost/CreatePost";
import "./App.css";
import Login from "./components/Login/Login";
import { getUserName } from "./helpers/helper";
import Register from "./components/Register/Register";
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
  getItem("People", "4", <UserOutlined />, "/people"),
];

export const LogoComponent = () => {
  return (
    <div className="h-[20px] auto m-5 flex items-center justify-center">
      <img src={logo} className="h-10" alt="logo"></img>
    </div>
  );
};

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

  const [type, setType] = useState("signIn");
  const handleOnClick = (text: any) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const containerClass =
    "appContainer " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <>
      {!getUserName() ? (
        <div className="h-[100vh]">
          <div className={containerClass} id="container">
            <Routes>
              {/*  {type == "signIn" ? ( */}
              <Route
                path="/"
                element={<Login changeType={handleOnClick}></Login>}
              ></Route>
              {/*      ) : ( */}
              <Route
                path="/register"
                element={<Register changeType={handleOnClick}></Register>}
              ></Route>
              {/*  )} */}
            </Routes>
            <div className="overlay-container hidden lg:block">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1 className="text-[50px]">Welcome Back!</h1>
                  <p className="text-[20px] mt-2">
                    To keep connected with us please login with your personal
                    info :)
                  </p>
                  <Link to="/">
                    <Button
                      className="bg-sbutton w-[100px] border-dullwhite mt-5"
                      type="primary"
                      size="large"
                      id="signIn"
                      onClick={() => handleOnClick("signIn")}
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1 className="text-[50px]">Hello, Friend!</h1>
                  <p className="text-[20px] mt-2">
                    Don't have an account? Click on Sign Up below and get one :)
                  </p>
                  <Link to="/register">
                    <Button
                      className="bg-sbutton w-[100px] border-dullwhite mt-5"
                      type="primary"
                      size="large"
                      id="signUp"
                      onClick={() => handleOnClick("signUp")}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            collapsible
            /*   style={{ position: "fixed" }} */
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
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <LogoComponent />
            </Header>
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
                  <Route path="/posts" element={<Posts></Posts>}></Route>
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
      )}
    </>
  );
};

export default App;
