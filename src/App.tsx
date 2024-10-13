import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { ErrorComponent, useNotificationProvider } from "@refinedev/antd";
import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";

import { App as AntdApp, ConfigProvider } from "antd";

import { resources, themeConfig } from "@/config";
import { authProvider, dataProvider } from "@/providers";

import { AlgoliaSearchWrapper, FullScreenLoading, Layout } from "./components";
import { useAutoLoginForDemo } from "./hooks";
import { DashboardPage } from "./routes/dashboard";
import { ForgotPasswordPage } from "./routes/forgot-password";
import { LoginPage } from "./routes/login";
import { LandingPage } from "./routes/landingpage";
import { RegisterPage } from "./routes/register";
import { UpdatePasswordPage } from "./routes/update-password";

import { DashboardOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";

import "./utilities/init-dayjs";
import "@refinedev/antd/dist/reset.css";
import "./styles/antd.css";
import "./styles/fc.css";
import "./styles/index.css";

import { TeamListPage, TeamCreatePage, TeamEditPage } from "./routes/teams";
import { PlayerListPage, PlayerCreatePage, PlayerEditPage, PlayerShowPage } from "./routes/players";

const App: React.FC = () => {
  const { loading } = useAutoLoginForDemo();

  if (loading) {
    return <FullScreenLoading />;
  }

  return (
    <AlgoliaSearchWrapper>
      <BrowserRouter>
        <ConfigProvider theme={themeConfig}>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                authProvider={authProvider}
                dataProvider={dataProvider}
                routerProvider={routerProvider}
                resources={[
                  {
                    name: "dashboard",
                    list: "/",
                    meta: {
                      label: "Dashboard",
                      icon: <DashboardOutlined />,
                    },
                  },
                  {
                    name: "teams",
                    list: "/teams",
                    create: "/teams/create",
                    edit: "/teams/edit/:id",
                    meta: {
                      label: "Teams",
                      icon: <TeamOutlined />,
                    },
                  },
                  {
                    name: "players",
                    list: "/players",
                    create: "/players/create",
                    edit: "/players/edit/:id",
                    show: "/players/show/:id",
                    meta: {
                      label: "Players",
                      icon: <UserOutlined />,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                }}
              >
                <Routes>
                  <Route path="/landing" element={<LandingPage />} />
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-layout"
                        fallback={<CatchAllNavigate to="/landing" />}
                      >
                        <Layout>
                          <Outlet />
                        </Layout>
                      </Authenticated>
                    }
                  >
                    <Route index element={<DashboardPage />} />
                    <Route path="/teams" element={<TeamListPage />} />
                    <Route path="/teams/create" element={<TeamCreatePage />} />
                    <Route path="/teams/edit/:id" element={<TeamEditPage />} />
                    <Route path="/players" element={<PlayerListPage />} />
                    <Route path="/players/create" element={<PlayerCreatePage />} />
                    <Route path="/players/edit/:id" element={<PlayerEditPage />} />
                    <Route path="/players/show/:id" element={<PlayerShowPage />} />
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-auth"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource resource="dashboard" />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/update-password" element={<UpdatePasswordPage />} />
                  </Route>
                </Routes>
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ConfigProvider>
      </BrowserRouter>
    </AlgoliaSearchWrapper>
  );
};

export default App;
