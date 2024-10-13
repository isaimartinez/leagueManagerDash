import React from "react";
import { useShow, useOne } from "@refinedev/core";
import { Show } from "@refinedev/antd";
import { Typography, Tag, Space, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const PlayerShowPage: React.FC = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: teamData, isLoading: teamIsLoading } = useOne({
    resource: "teams",
    id: record?.team || "",
    queryOptions: {
      enabled: !!record?.team,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Picture</Title>
      <Avatar
        src={record?.picture}
        size={200}
        icon={<UserOutlined />}
      />

      <Title level={5}>Name</Title>
      <Text>{record?.name}</Text>

      <Title level={5}>Team</Title>
      {teamIsLoading ? (
        <>Loading...</>
      ) : (
        <Text>{teamData?.data?.name}</Text>
      )}

      <Title level={5}>Stats</Title>
      <Space>
        <Tag color="blue">Goals: {record?.goals}</Tag>
        <Tag color="yellow">Yellow Cards: {record?.yellowCards}</Tag>
        <Tag color="red">Red Cards: {record?.redCards}</Tag>
        <Tag color="green">Matches Played: {record?.matchesPlayed}</Tag>
      </Space>
    </Show>
  );
};
