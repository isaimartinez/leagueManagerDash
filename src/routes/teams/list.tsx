import React from "react";
import {
  List,
  useTable,
  getDefaultSortOrder,
  DateField,
  EditButton,
  DeleteButton,
  CreateButton,
} from "@refinedev/antd";
import { useNavigation, useDelete } from "@refinedev/core";
import { TeamOutlined } from "@ant-design/icons";
import { Table, Space, message, Avatar } from "antd";

export const TeamListPage: React.FC = () => {
  const { edit } = useNavigation();
  const { mutate: mutateDelete } = useDelete();

  const { tableProps, sorter, tableQueryResult } = useTable({
    syncWithLocation: true,
  });

  const handleDelete = (id: string) => {
    mutateDelete(
      {
        resource: "teams",
        id,
      },
      {
        onSuccess: () => {
          message.success("Team deleted successfully");
          tableQueryResult.refetch();
        },
        onError: (error: any) => {
          message.error(error?.message || "An error occurred while deleting the team");
        },
      }
    );
  };

  return (
    <List
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          {/* <CreateButton /> */}
        </>
      )}
    >
      <Table {...tableProps} rowKey="_id">
        <Table.Column
          dataIndex="logo"
          title="Logo"
          render={(logo: string) => (
            <Avatar
              src={logo}
              shape="square"
              size={64}
              icon={<TeamOutlined onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} />}
            />
          )}
        />
        <Table.Column
          dataIndex="name"
          title="Team Name"
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorter)}
        />
        <Table.Column
          dataIndex={["activeLeagueId", "name"]}
          title="Active League"
        />
        <Table.Column dataIndex="location" title="Location" />
        <Table.Column
          dataIndex="createdAt"
          title="Created At"
          render={(value: string) => <DateField value={value} />}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_: any, record: any) => (
            <Space>
              <EditButton
                hideText
                size="small"
                recordItemId={record._id}
              />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record._id}
                onSuccess={() => handleDelete(record._id)}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
