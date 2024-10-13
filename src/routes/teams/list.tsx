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
import { useNavigation } from "@refinedev/core";
import { TeamOutlined } from "@ant-design/icons";
import { Table, Space } from "antd";

export const TeamListPage: React.FC = () => {
  const { edit } = useNavigation();

  const { tableProps, sorter } = useTable({
    syncWithLocation: true,
  });

  return (
    <List
      headerButtons={({ defaultButtons }) => (
        <>
          {/* {defaultButtons} */}
          <CreateButton />
        </>
      )}
    >
      <Table {...tableProps} rowKey="id">
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
        <Table.Column
          dataIndex="foundationYear"
          title="Foundation Year"
          sorter
        />
        <Table.Column dataIndex="stadium" title="Stadium" />
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
                recordItemId={record.id}
                icon={<TeamOutlined />}
              />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
