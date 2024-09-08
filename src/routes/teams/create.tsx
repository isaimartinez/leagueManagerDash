import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

export const TeamCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const { formProps, saveButtonProps } = useForm({
    resource: "teams",
    onMutationSuccess: (data) => {
      navigate(`/teams/edit/${data.data.id}`);
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
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
    </Create>
  );
};
