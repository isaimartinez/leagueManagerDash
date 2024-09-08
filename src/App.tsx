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
import { AuditLogPage, SettingsPage } from "./routes/administration";
import {
  CalendarCreatePage,
  CalendarEditPage,
  CalendarPageWrapper,
  CalendarShowPage,
} from "./routes/calendar";

import {
  ContactCreatePage,
  ContactShowPage,
  ContactsListPage,
} from "./routes/contacts";
import { DashboardPage } from "./routes/dashboard";
import { ForgotPasswordPage } from "./routes/forgot-password";
import { LoginPage } from "./routes/login";
import { LandingPage } from "./routes/landingpage"; // Import the LandingPage component
import {
  QuotesCreatePage,
  QuotesEditPage,
  QuotesListPage,
  QuotesShowPage,
} from "./routes/quotes";
import { RegisterPage } from "./routes/register";
import {
  KanbanCreatePage,
  KanbanCreateStage,
  KanbanEditPage,
  KanbanEditStage,
  KanbanPage,
} from "./routes/scrumboard/kanban";
import {
  SalesCreatePage,
  SalesCreateStage,
  SalesEditPage,
  SalesEditStage,
  SalesFinalizeDeal,
  SalesPage,
} from "./routes/scrumboard/sales";
import { UpdatePasswordPage } from "./routes/update-password";

import { DashboardOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";

import "./utilities/init-dayjs";
import "@refinedev/antd/dist/reset.css";
import "./styles/antd.css";
import "./styles/fc.css";
import "./styles/index.css";

import { TeamListPage, TeamCreatePage, TeamEditPage } from "./routes/teams";

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
                    
                    {/* Teams routes (previously Companies) */}
                    <Route path="/teams" element={<TeamListPage />} />
                    <Route path="/teams/create" element={<TeamCreatePage />} />
                    <Route path="/teams/edit/:id" element={<TeamEditPage />} />

                    {/* Players routes (previously Contacts) */}
                    <Route
                      path="/players"
                      element={
                        <ContactsListPage>
                          <Outlet />
                        </ContactsListPage>
                      }
                    >
                      <Route index element={null} />
                      <Route path="show/:id" element={<ContactShowPage />} />
                      <Route
                        path="create"
                        element={
                          <ContactCreatePage>
                            <Outlet />
                          </ContactCreatePage>
                        }
                      >
                        <Route
                          path="team-create"
                          element={<TeamCreatePage isOverModal />}
                        />
                      </Route>
                    </Route>

                    {/* Remove other routes that are not needed */}
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>

                  {/* Authentication routes */}
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
                    <Route
                      path="/forgot-password"
                      element={<ForgotPasswordPage />}
                    />
                    <Route
                      path="/update-password"
                      element={<UpdatePasswordPage />}
                    />
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
