import React from "react";

import { useNavigation } from "@refinedev/core";
import { CalendarOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import dayjs from "dayjs";

import { Text } from "../../text";
import { CalendarUpcomingEvent } from "./event";
import styles from "./index.module.css";

type CalendarUpcomingEventsProps = {
  limit?: number;
  cardProps?: React.ComponentProps<typeof Card>;
  showGoToListButton?: boolean;
};

// Mocked data for upcoming events
const mockedEvents = [
  {
    id: "1",
    title: "Team A vs Team B",
    color: "#1890ff",
    startDate: dayjs().add(1, 'day').toISOString(),
    endDate: dayjs().add(1, 'day').add(2, 'hour').toISOString(),
  },
  {
    id: "2",
    title: "Player Transfer Window Opens",
    color: "#52c41a",
    startDate: dayjs().add(3, 'day').toISOString(),
    endDate: dayjs().add(3, 'day').add(1, 'hour').toISOString(),
  },
  {
    id: "3",
    title: "League Meeting",
    color: "#faad14",
    startDate: dayjs().add(5, 'day').toISOString(),
    endDate: dayjs().add(5, 'day').add(3, 'hour').toISOString(),
  },
  {
    id: "4",
    title: "Training Session",
    color: "#722ed1",
    startDate: dayjs().add(7, 'day').toISOString(),
    endDate: dayjs().add(7, 'day').add(2, 'hour').toISOString(),
  },
  {
    id: "5",
    title: "Charity Event",
    color: "#eb2f96",
    startDate: dayjs().add(10, 'day').toISOString(),
    endDate: dayjs().add(10, 'day').add(4, 'hour').toISOString(),
  },
];

const NoEvent: React.FC = () => (
  <span
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "220px",
    }}
  >
    No Upcoming Event
  </span>
);

export const CalendarUpcomingEvents: React.FC<CalendarUpcomingEventsProps> = ({
  limit = 5,
  cardProps,
  showGoToListButton,
}) => {
  const { list } = useNavigation();

  const events = mockedEvents.slice(0, limit);

  return (
    <Card
      headStyle={{ padding: "8px 16px" }}
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
          <CalendarOutlined />
          <Text size="sm" style={{ marginLeft: ".7rem" }}>
            Upcoming events
          </Text>
        </div>
      }
      extra={
        showGoToListButton && (
          <Button onClick={() => list("events")} icon={<RightCircleOutlined />}>
            See calendar
          </Button>
        )
      }
      {...cardProps}
    >
      {events.map((item) => (
        <CalendarUpcomingEvent key={item.id} item={item} />
      ))}
      {events.length === 0 && <NoEvent />}
    </Card>
  );
};
