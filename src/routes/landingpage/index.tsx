import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Typography, Button, Row, Col, Card, Spin } from "antd";
import { landingProvider } from "@/providers";

const { Title, Text } = Typography;

interface TeamStats {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

interface BestOfSeason {
  topScorer: { name: string; goals: number };
  teamMostGoals: { name: string; goals: number };
  bestDefense: { name: string; goalsAgainst: number };
  fairPlayAward: { name: string; cards: number };
}

export const LandingPage: React.FC = () => {
  const [leagueData, setLeagueData] = useState<TeamStats[]>([]);
  const [bestOfSeasonData, setBestOfSeasonData] = useState<BestOfSeason | null>(null);
  const [isLeagueLoading, setIsLeagueLoading] = useState(true);
  const [isBestOfSeasonLoading, setIsBestOfSeasonLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leagueTable = await landingProvider.custom({
          url: "/leagues/current/table",
          method: "get",
        });
        setLeagueData(leagueTable.data);
        setIsLeagueLoading(false);

        const bestOfSeason = await landingProvider.custom({
          url: "/leagues/current/best-of-season",
          method: "get",
        });
        setBestOfSeasonData(bestOfSeason.data);
        setIsBestOfSeasonLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLeagueLoading(false);
        setIsBestOfSeasonLoading(false);
      }
    };

    fetchData();
  }, []);

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
        dataSource={leagueData}
        columns={columns}
        loading={isLeagueLoading}
        rowKey="position"
      />

      <Title level={3} style={{ marginTop: "40px" }}>The Best of The Season</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card title="Top Scorer">
            {isBestOfSeasonLoading ? (
              <Spin />
            ) : (
              <>
                <Text>{bestOfSeasonData?.topScorer?.name}</Text>
                <br />
                <Text strong>{bestOfSeasonData?.topScorer?.goals} goals</Text>
              </>
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Team with Most Goals">
            {isBestOfSeasonLoading ? (
              <Spin />
            ) : (
              <>
                <Text>{bestOfSeasonData?.teamMostGoals?.name}</Text>
                <br />
                <Text strong>{bestOfSeasonData?.teamMostGoals?.goals} goals</Text>
              </>
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Best Defense">
            {isBestOfSeasonLoading ? (
              <Spin />
            ) : (
              <>
                <Text>{bestOfSeasonData?.bestDefense?.name}</Text>
                <br />
                <Text strong>{bestOfSeasonData?.bestDefense?.goalsAgainst} goals against</Text>
              </>
            )}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Fair Play Award">
            {isBestOfSeasonLoading ? (
              <Spin />
            ) : (
              <>
                <Text>{bestOfSeasonData?.fairPlayAward?.name}</Text>
                <br />
                <Text strong>{bestOfSeasonData?.fairPlayAward?.cards} cards</Text>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};