import React from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";

export const LeaguesEditPage: React.FC = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const { selectProps: teamSelectProps } = useSelect({
    resource: "teams",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="League Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Team"
          name="teamId"
          rules={[{ required: true }]}
        >
          <Select {...teamSelectProps} />
        </Form.Item>
        <Form.Item label="Photo" name="photo">
          <Input />
        </Form.Item>
        <Form.Item label="Stadium" name="stadium">
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
