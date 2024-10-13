import React, { useState } from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { useCreate } from "@refinedev/core";
import { Form, Input, DatePicker, Select, Button, Table, message } from "antd";
import moment from 'moment';
import { generateMatches, suggestMatchDates, calculateEndDate } from "../../utils/matchGenerator";

export const LeaguesCreatePage: React.FC = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<moment.Moment | null>(null);
  const [endDate, setEndDate] = useState<moment.Moment | null>(null);
  const { formProps, saveButtonProps } = useForm();
  const { mutate: createLeague } = useCreate();

  const { selectProps: teamSelectProps } = useSelect({
    resource: "teams",
    optionLabel: "name",
    optionValue: "_id",
  });

  const handleGenerateMatches = () => {
    if (!startDate) {
      message.error("Please select a start date");
      return;
    }

    const values = formProps.form?.getFieldsValue();
    const teams = values.teamIds?.map((id: string) => teamSelectProps.options?.find(team => team.value === id));
    
    if (!teams || teams.length < 2) {
      message.error("Please select at least two teams");
      return;
    }

    const generatedMatches = generateMatches(teams);
    const matchesWithDates = suggestMatchDates(startDate.toDate(), generatedMatches);
    setMatches(matchesWithDates);

    const calculatedEndDate = calculateEndDate(matchesWithDates);
    setEndDate(moment(calculatedEndDate));
  };

  const handleSubmit = async (values: any) => {
    try {
      const response = await createLeague({
        resource: "leagues",
        values: {
          ...values,
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
          matches: matches.map(match => ({
            ...match,
            home: match.home ? { value: match.home.value } : undefined,
            away: match.away ? { value: match.away.value } : undefined,
          })),
        },
      });
      
      if (response && response.data) {
        message.success("League and matches created successfully");
      }
    } catch (error) {
      console.error("Error creating league:", error);
      message.error("Failed to create league and matches");
    }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="League Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[{ required: true }]}
        >
          <DatePicker 
            onChange={(date) => setStartDate(date ? moment(date) : null)}
          />
        </Form.Item>
        <Form.Item
          label="End Date"
          name="endDate"
        >
          <DatePicker 
            value={endDate}
            disabled
          />
        </Form.Item>
        <Form.Item
          label="Teams"
          name="teamIds"
          rules={[{ required: true, message: "Please select at least two teams" }]}
        >
          <Select
            mode="multiple"
            {...teamSelectProps}
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={handleGenerateMatches} type="primary">
            Generate Matches
          </Button>
        </Form.Item>
        <Table
          dataSource={matches}
          columns={[
            { 
              title: 'Home Team', 
              dataIndex: 'home', 
              key: 'home',
              render: (team) => team ? team.label : 'TBD'
            },
            { 
              title: 'Away Team', 
              dataIndex: 'away', 
              key: 'away',
              render: (team) => team ? team.label : 'TBD'
            },
            { 
              title: 'Date', 
              dataIndex: 'date', 
              key: 'date',
              render: (date) => moment(date).format('YYYY-MM-DD (dddd)')
            },
            { 
              title: 'Type', 
              dataIndex: 'type', 
              key: 'type',
              render: (type) => type.startsWith('draft_') ? `Draft ${type.split('_')[1]}` : type
            },
          ]}
        />
      </Form>
    </Create>
  );
};
