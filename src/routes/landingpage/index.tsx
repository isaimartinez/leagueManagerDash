import React from "react";
import { Link } from "react-router-dom";
import { useCustom } from "@refinedev/core";
import { Table, Typography, Button, Row, Col, Card } from "antd";

const { Title, Text } = Typography;

export const LandingPage: React.FC = () => {
  console.log("LandingPage");
  const { data: leagueData, isLoading: isLeagueLoading } = useCustom({
    url: "/leagues/current/table",
    method: "get",
  });

  const { data: bestOfSeasonData, isLoading: isBestOfSeasonLoading } = useCustom({
    url: "/leagues/current/best-of-season",
    method: "get",
  });

  const columns = [
    { title: "Position", dataIndex: "position", key: "position" },
    { title: "Team", dataIndex: "team", key: "team" },
    { title: "Played", dataIndex: "played", key: "played" },
    { title: "Won", dataIndex: "won", key: "won" },
    { title: "Drawn", dataIndex: "drawn", key: "drawn" },
    { title: "Lost", dataIndex: "lost", key: "lost" },
    { title: "GF", dataIndex: "goalsFor", key: "goalsFor" },
    { title: "GA", dataIndex: "goalsAgainst", key: "goalsAgainst" },
    { title: "GD", dataIndex: "goalDifference", key: "goalDifference" },
    { title: "Points", dataIndex: "points", key: "points" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={2}>Soccer League Administrator</Title>
        </Col>
        <Col>
          <Link to="/login">
            <Button type="primary">Log In</Button>
          </Link>
        </Col>
      </Row>

      <Title level={3}>Current League Table</Title>
      <Table
        dataSource={leagueData?.data}
        columns={columns}
        loading={isLeagueLoading}
        rowKey="position"
      />

      <Title level={3} style={{ marginTop: "40px" }}>The Best of The Season</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card title="Top Scorer" loading={isBestOfSeasonLoading}>
            <Text>{bestOfSeasonData?.data.topScorer.name}</Text>
            <br />
            <Text strong>{bestOfSeasonData?.data.topScorer.goals} goals</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Team with Most Goals" loading={isBestOfSeasonLoading}>
            <Text>{bestOfSeasonData?.data.teamMostGoals.name}</Text>
            <br />
            <Text strong>{bestOfSeasonData?.data.teamMostGoals.goals} goals</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Best Defense" loading={isBestOfSeasonLoading}>
            <Text>{bestOfSeasonData?.data.bestDefense.name}</Text>
            <br />
            <Text strong>{bestOfSeasonData?.data.bestDefense.goalsAgainst} goals against</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Fair Play Award" loading={isBestOfSeasonLoading}>
            <Text>{bestOfSeasonData?.data.fairPlayAward.name}</Text>
            <br />
            <Text strong>{bestOfSeasonData?.data.fairPlayAward.cards} cards</Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};