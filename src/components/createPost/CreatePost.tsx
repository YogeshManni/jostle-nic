import React, { useState } from "react";

import { Button, message, Steps, theme, Upload, UploadProps } from "antd";
import { CloudUploadOutlined, InboxOutlined } from "@ant-design/icons";

{
  /* First Step to select content to upload*/
}

const SelectContent = () => {
  const { Dragger } = Upload;

  const props: UploadProps = {
    name: "file",
    multiple: false,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      <Dragger {...props} className="flex flex-col h-[60vh]">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
    </>
  );
};

{
  /* Second step to Enter details about post */
}

const PostDetails = () => {
  return <></>;
};

const steps = [
  {
    title: "First",
    content: <SelectContent />,
  },
  {
    title: "Second",
    content: <PostDetails />,
  },
  {
    title: "Last",
    content: "Last-content",
  },
];

const CreatePost = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }} className="h-[40vh]">
        {current < steps.length - 1 && (
          <Button className="bg-blue-500 !" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button onClick={() => message.success("Processing complete!")}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
export default CreatePost;
