import React from "react";
import {
  List,
  useTable,
  getDefaultSortOrder,
  DateField,
  EditButton,
  DeleteButton,
  ShowButton,
} from "@refinedev/antd";
import { useNavigation, useDelete } from "@refinedev/core";
import { Table, Space, message, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const PlayerListPage: React.FC = () => {
  const { show, edit } = useNavigation();
  const { mutate: mutateDelete } = useDelete();

  const { tableProps, sorter, tableQueryResult } = useTable({
    syncWithLocation: true,
  });

  const handleDelete = (id: string) => {
    mutateDelete(
      {
        resource: "players",
        id,
      },
      {
        onSuccess: () => {
          message.success("Player deleted successfully");
          tableQueryResult.refetch();
        },
        onError: (error: any) => {
          message.error(error?.message || "An error occurred while deleting the player");
        },
      }
    );
  };

  return (
    <List>
      <Table {...tableProps} rowKey="_id">
        <Table.Column
          dataIndex="picture"
          title="Picture"
          render={(picture: string) => (
            <Avatar
              src={picture}
              size={64}
              icon={<UserOutlined />}
            />
          )}
        />
        <Table.Column
          dataIndex="name"
          title="Player Name"
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorter)}
        />
        <Table.Column
          dataIndex={["team", "name"]}
          title="Team"
        />
        <Table.Column dataIndex="goals" title="Goals" sorter />
        <Table.Column dataIndex="yellowCards" title="Yellow Cards" />
        <Table.Column dataIndex="redCards" title="Red Cards" />
        <Table.Column dataIndex="matchesPlayed" title="Matches Played" sorter />
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
              <ShowButton
                hideText
                size="small"
                recordItemId={record._id}
              />
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
