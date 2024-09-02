import { FilterDropdown } from "@refinedev/antd";
import { useState } from "react";

import {
  EnvironmentOutlined,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
  SearchOutlined,
  ShopOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Card, Col, Input, Row, Select, Space, Table } from "antd";
import cn from "classnames";

import { CustomAvatar, Logo, Text } from "@/components";

import { RoleTag } from "./components";
import styles from "./settings.module.css";

// Mock data for users
const mockUsers = [
  { id: 1, name: "John Doe", avatarUrl: "https://example.com/avatar1.jpg", jobTitle: "Sales Manager", role: "SALES_MANAGER" },
  { id: 2, name: "Jane Smith", avatarUrl: "https://example.com/avatar2.jpg", jobTitle: "Sales Person", role: "SALES_PERSON" },
  { id: 3, name: "Bob Johnson", avatarUrl: "https://example.com/avatar3.jpg", jobTitle: "Sales Intern", role: "SALES_INTERN" },
  { id: 4, name: "Alice Brown", avatarUrl: "https://example.com/avatar4.jpg", jobTitle: "Admin", role: "ADMIN" },
];

export const SettingsPage = () => {
  return (
    <div className="page-container">
      <Space
        size={16}
        style={{
          width: "100%",
          paddingBottom: "24px",
          borderBottom: "1px solid #D9D9D9",
        }}
      >
        <Logo width={96} height={96} />
        <Text style={{ fontSize: "32px", fontWeight: 700 }}>
          Globex Corporation
        </Text>
      </Space>
      <Row
        gutter={[32, 32]}
        style={{
          marginTop: 32,
        }}
      >
        <Col
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 16 }}
        >
          <UsersTable />
        </Col>
        <Col
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 8 }}
        >
          <CompanyInfo />
        </Col>
      </Row>
    </div>
  );
};

const roleOptions = [
  { label: "Admin", value: "ADMIN" },
  { label: "Sales Intern", value: "SALES_INTERN" },
  { label: "Sales Person", value: "SALES_PERSON" },
  { label: "Sales Manager", value: "SALES_MANAGER" },
];

const UsersTable = () => {
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);

  const handleSearch = (value: string, dataIndex: string) => {
    const filtered = mockUsers.filter(user =>
      user[dataIndex].toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <Card
      bodyStyle={{ padding: 0 }}
      headStyle={{
        borderBottom: "1px solid #D9D9D9",
        marginBottom: "1px",
      }}
      title={
        <Space size="middle">
          <TeamOutlined />
          <Text>Contacts</Text>
        </Space>
      }
      extra={
        <>
          <Text className="tertiary">Total users: </Text>
          <Text strong>{filteredUsers.length}</Text>
        </>
      }
    >
      <Table dataSource={filteredUsers} rowKey="id">
        <Table.Column
          dataIndex="name"
          title="Name"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input
                placeholder="Search Name"
                onChange={(e) => handleSearch(e.target.value, "name")}
              />
            </FilterDropdown>
          )}
          filterIcon={<SearchOutlined />}
          render={(_, record) => (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CustomAvatar src={record.avatarUrl} name={record.name} />
              <Text>{record.name}</Text>
            </div>
          )}
        />
        <Table.Column
          dataIndex="jobTitle"
          title="Title"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input
                placeholder="Search title"
                onChange={(e) => handleSearch(e.target.value, "jobTitle")}
              />
            </FilterDropdown>
          )}
          filterIcon={<SearchOutlined />}
        />
        <Table.Column
          dataIndex="role"
          title="Role"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ width: "200px" }}
                mode="multiple"
                placeholder="Select Role"
                options={roleOptions}
                onChange={(values) => {
                  const filtered = mockUsers.filter(user => values.includes(user.role));
                  setFilteredUsers(filtered.length > 0 ? filtered : mockUsers);
                }}
              />
            </FilterDropdown>
          )}
          render={(_, record) => <RoleTag role={record.role} />}
        />
      </Table>
    </Card>
  );
};

const companyInfo = [
  {
    label: "Address",
    value: "2158 Mount Tabor, Westbury, New York, USA 11590",
    icon: <EnvironmentOutlined className="tertiary" />,
  },
  {
    label: "Phone",
    value: "+123 456 789 01 23",
    icon: <PhoneOutlined className="tertiary" />,
  },
  {
    label: "Email",
    value: "info@globexcorp.com",
    icon: <MailOutlined className="tertiary" />,
  },
  {
    label: "Website",
    value: "https://globexcorp.com",
    icon: <GlobalOutlined className="tertiary" />,
  },
];

export const CompanyInfo = () => {
  return (
    <Card
      title={
        <Space>
          <ShopOutlined />
          <Text>Company info</Text>
        </Space>
      }
      headStyle={{
        padding: "1rem",
      }}
      bodyStyle={{
        padding: "0",
      }}
    >
      <div className={styles.list}>
        {companyInfo.map((item) => (
          <div key={item.label} className={styles.listItem}>
            <div>{item.icon}</div>
            <div className={styles.listItemContent}>
              <Text size="xs" className="tertiary">
                {item.label}
              </Text>
              <Text className={cn(styles.listItemContent, "primary")}>
                {item.value}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
