import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const TeamEditPage: React.FC = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "teams",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Team Name"
          name="name"
          rules={[{ required: true, message: "Please enter the team name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Active League ID"
          name="activeLeagueId"
          rules={[{ required: true, message: "Please enter the active league ID" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
