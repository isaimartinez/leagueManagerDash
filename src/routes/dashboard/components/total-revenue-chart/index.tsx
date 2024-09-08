import React, { Suspense, useMemo } from "react";
import { DollarOutlined } from "@ant-design/icons";
import type { GaugeConfig } from "@ant-design/plots";
import { Card, Space } from "antd";
import { Text } from "@/components";
import { currencyNumber } from "@/utilities";

const Gauge = React.lazy(() => import("@ant-design/plots/es/components/gauge"));

// Mocked data for deal stages
const mockedDealStages = [
  { title: "Qualification", sum: { value: 50000 } },
  { title: "Proposal", sum: { value: 75000 } },
  { title: "Negotiation", sum: { value: 100000 } },
  { title: "WON", sum: { value: 200000 } },
  { title: "LOST", sum: { value: 25000 } },
];

export const DashboardTotalRevenueChart: React.FC = () => {
  const { totalExpectedRevenue, totalRealizationRevenue, realizationPercentageOfExpected } = useMemo(() => {
    const expectedRevenue = mockedDealStages
      .filter(stage => !["WON", "LOST"].includes(stage.title))
      .reduce((sum, stage) => sum + stage.sum.value, 0);

    const realizedRevenue = mockedDealStages
      .find(stage => stage.title === "WON")?.sum.value || 0;

    const percentage = (realizedRevenue / expectedRevenue) * 100;

    return {
      totalExpectedRevenue: expectedRevenue,
      totalRealizationRevenue: realizedRevenue,
      realizationPercentageOfExpected: percentage,
    };
  }, []);

  const config: GaugeConfig = {
    percent: realizationPercentageOfExpected / 100,
    range: {
      color: "l(0) 0:#D9F7BE 1:#52C41A",
    },
    axis: {
      tickLine: {
        style: {
          stroke: "#BFBFBF",
        },
      },
      label: {
        formatter(v) {
          return Number(v) * 100;
        },
      },
      subTickLine: {
        count: 3,
      },
    },
    indicator: {
      pointer: {
        style: {
          fontSize: 4,
          stroke: "#BFBFBF",
          lineWidth: 2,
        },
      },
      pin: {
        style: {
          r: 8,
          lineWidth: 2,
          stroke: "#BFBFBF",
        },
      },
    },
    statistic: {
      content: {
        formatter: (datum) => {
          return `${(datum?.percent * 100).toFixed(2)}%`;
        },
        style: {
          color: "rgba(0,0,0,0.85)",
          fontWeight: 500,
          fontSize: "24px",
        },
      },
    },
  };

  return (
    <Card
      style={{ height: "100%" }}
      bodyStyle={{
        padding: "0 32px 32px 32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      headStyle={{ padding: "16px" }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <DollarOutlined />
          <Text size="sm">Total revenue (yearly)</Text>
        </div>
      }
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Gauge {...config} padding={0} width={280} height={280} />
      </Suspense>

      <div
        style={{
          display: "flex",
          gap: "32px",
        }}
      >
        <Space direction="vertical" size={0}>
          <Text size="xs" className="secondary">
            Expected
          </Text>
          <Text
            size="md"
            className="primary"
            style={{
              minWidth: "100px",
            }}
          >
            {currencyNumber(totalExpectedRevenue)}
          </Text>
        </Space>
        <Space direction="vertical" size={0}>
          <Text size="xs" className="secondary">
            Realized
          </Text>
          <Text
            size="md"
            className="primary"
            style={{
              minWidth: "100px",
            }}
          >
            {currencyNumber(totalRealizationRevenue)}
          </Text>
        </Space>
      </div>
    </Card>
  );
};
