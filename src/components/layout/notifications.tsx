import React, { useState, useMemo } from "react";

import { BellOutlined } from "@ant-design/icons";
import { Badge, Button, Divider, Popover, Space, Spin } from "antd";
import dayjs from "dayjs";

import { CustomAvatar } from "../custom-avatar";
import { Text } from "../text";
import { NotificationMessage } from "./notification-message";

// Mocked data
const mockedNotifications = [
  {
    id: 1,
    createdAt: "2023-04-15T10:30:00Z",
    action: "CREATE",
    targetId: 1,
    targetEntity: "Match",
    deal: {
      company: {
        name: "Team A vs Team B",
        avatarUrl: "https://example.com/teamA.png"
      }
    }
  },
  {
    id: 2,
    createdAt: "2023-04-14T15:45:00Z",
    action: "UPDATE",
    targetId: 2,
    targetEntity: "Player",
    deal: {
      company: {
        name: "Player Transfer",
        avatarUrl: "https://example.com/player.png"
      }
    }
  },
  {
    id: 3,
    createdAt: "2023-04-13T09:00:00Z",
    action: "CREATE",
    targetId: 3,
    targetEntity: "Tournament",
    deal: {
      company: {
        name: "Summer League",
        avatarUrl: "https://example.com/tournament.png"
      }
    }
  }
];

export const Notifications: React.FC = () => {
  const [open, setOpen] = useState(false);

  const notificationData = useMemo(() => {
    return mockedNotifications.sort((a, b) => 
      dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix()
    );
  }, []);

  const content = (
    <Space direction="vertical" split={<Divider style={{ margin: 0 }} />}>
      {notificationData.map((notification) => (
        <Space key={notification.id}>
          <CustomAvatar
            size={48}
            shape="square"
            src={notification.deal.company.avatarUrl}
            name={notification.deal.company.name}
          />
          <Space direction="vertical" size={0}>
            <NotificationMessage audit={notification} deal={notification.deal} />
            <Text size="xs" type="secondary">
              {dayjs(notification.createdAt).fromNow()}
            </Text>
          </Space>
        </Space>
      ))}
    </Space>
  );

  return (
    <Popover
      placement="bottomRight"
      content={content}
      trigger="click"
      onOpenChange={(newOpen) => setOpen(newOpen)}
      overlayStyle={{ width: 400 }}
    >
      <Badge dot>
        <Button shape="circle" icon={<BellOutlined />} style={{ border: 0 }} />
      </Badge>
    </Popover>
  );
};
