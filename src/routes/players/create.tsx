import React from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export const PlayerCreatePage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string>();

  const { formProps, saveButtonProps, onFinish } = useForm();

  const { selectProps: teamSelectProps } = useSelect({
    resource: "teams",
    optionLabel: "name",
    optionValue: "_id",
  });

  const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleSubmit = async (values: any) => {
    if (imageUrl) {
      values.picture = imageUrl;
    }
    await onFinish(values);
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Player Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Team"
          name="team"
          rules={[{ required: true }]}
        >
          <Select {...teamSelectProps} />
        </Form.Item>
        <Form.Item label="Goals" name="goals">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Yellow Cards" name="yellowCards">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Red Cards" name="redCards">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Matches Played" name="matchesPlayed">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Picture" name="picture">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            customRequest={({ onSuccess }) => {
              if (onSuccess) {
                onSuccess("ok");
              }
            }}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
      </Form>
    </Create>
  );
};
