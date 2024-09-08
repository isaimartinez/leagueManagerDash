import React from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Card } from "antd";
import dayjs from "dayjs";

import { CustomAvatar, Text } from "@/components";

import styles from "./index.module.css";

// Mocked data
const mockedActivities = [
  {
    id: 1,
    user: { name: "John Doe" },
    createdAt: "2023-04-15T10:30:00Z",
    action: "CREATE",
    targetId: 1,
    deal: {
      title: "New Match",
      company: { name: "Team A vs Team B", avatarUrl: "https://example.com/teamA.png" },
      stage: { title: "Scheduled" }
    }
  },
  {
    id: 2,
    user: { name: "Jane Smith" },
    createdAt: "2023-04-14T15:45:00Z",
    action: "UPDATE",
    targetId: 2,
    deal: {
      title: "Player Transfer",
      company: { name: "Transfer Market", avatarUrl: "https://example.com/transfer.png" },
      stage: { title: "Negotiation" }
    }
  },
  {
    id: 3,
    user: { name: "Mike Johnson" },
    createdAt: "2023-04-13T09:00:00Z",
    action: "CREATE",
    targetId: 3,
    deal: {
      title: "Summer League",
      company: { name: "League Organization", avatarUrl: "https://example.com/league.png" },
      stage: { title: "Planning" }
    }
  }
];

export const DashboardLatestActivities: React.FC<{ limit?: number }> = ({
  limit = 5,
}) => {
  const activities = mockedActivities.slice(0, limit);

  return (
    <Card
      headStyle={{ padding: "16px" }}
      bodyStyle={{
        padding: "0 1rem",
      }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <UnorderedListOutlined />
          <Text size="sm" style={{ marginLeft: ".5rem" }}>
            Latest activities
          </Text>
        </div>
      }
    >
      {activities.map((activity) => (
        <div key={activity.id} className={styles.item}>
          <div className={styles.avatar}>
            <CustomAvatar
              shape="square"
              size={48}
              src={activity.deal.company.avatarUrl}
              name={activity.deal.company.name}
            />
          </div>
          <div className={styles.action}>
            <Text type="secondary" size="xs">
              {dayjs(activity.createdAt).fromNow()}
            </Text>

            <Text className={styles.detail}>
              <Text className={styles.name} strong>
                {activity.user.name}
              </Text>
              <Text>{activity.action === "CREATE" ? "created" : "moved"}</Text>
              <Text strong>{activity.deal.title}</Text>
              <Text>deal</Text>
              <Text>{activity.action === "CREATE" ? "in" : "to"}</Text>
              <Text strong>{activity.deal.stage.title || "Unassigned"}.</Text>
            </Text>
          </div>
        </div>
      ))}
    </Card>
  );
};
