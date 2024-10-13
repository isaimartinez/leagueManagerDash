import React from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const TeamEditPage: React.FC = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const { selectProps: leagueSelectProps } = useSelect({
    resource: "leagues",
    optionLabel: "name",
    optionValue: "_id",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Team Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Active League"
          name="activeLeagueId"
        >
          <Select 
            {...leagueSelectProps} 
            allowClear
          />
        </Form.Item>
        <Form.Item label="Logo URL" name="logo">
          <Input />
        </Form.Item>
        <Form.Item label="Location" name="location">
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
