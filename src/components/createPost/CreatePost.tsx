import React, { useState, useEffect } from "react";

import {
  Avatar,
  Button,
  Col,
  List,
  message,
  Row,
  Steps,
  theme,
  Upload,
  UploadProps,
} from "antd";
import { CloudUploadOutlined, InboxOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const CreatePost = () => {
  const [u_img, setImage]: any = useState("");
  {
    /* First Step to select content to upload*/
  }

  const SelectContent = () => {
    const { Dragger } = Upload;

    function getImage(img: any, callback: any) {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    }

    const props: UploadProps = {
      name: "file",
      multiple: false,

      onChange(info: any) {
        console.log(info);
        /*  setImage(
          "https://helpdesk.courtenay.ca/custom/customimages/Custom_HeadLogo.gif?1702403617360"
        ); */
        getImage(info.file.originFileObj, (imageUrl: any) => {
          setImage(imageUrl);
          //   setLoading(false);
          // setProfilePicture(imageUrl);
        });
        /* const { status } = info.file;
        if (status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (status === "done") {
          console.log(info);
          message.success(
            `${info.file.name} file uploaded successfully, click Next to proceed`
          );
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        } */
      },
      onDrop(e: any) {
        console.log("Dropped files", e.dataTransfer.files);
      },
    };

    return (
      <>
        <Dragger {...props} className="flex flex-col h-[60vh] ">
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
    const [caption, setCaption] = useState("");

    useEffect(() => {
      console.log(u_img);
    }, []);

    const updateCaption = (e: any) => {
      setCaption(e.target.value);
    };
    return (
      <div className="detailsData">
        <Row className="">
          <Col span={12}>
            <img src={u_img} className="h-[50vh]"></img>
          </Col>
          <Col span={12} className="flex flex-col px-10">
            <div className="flex   space-x-5 mt-[20px]">
              <Avatar
                size="large"
                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=1`}
              />
              <b className="mt-2">
                <span>Yogesh Manni</span>
              </b>
            </div>
            <TextArea
              className="mt-5"
              showCount
              maxLength={500}
              onChange={updateCaption}
              placeholder="Write a caption for post"
              style={{ height: 320 }}
            />
          </Col>
        </Row>
      </div>
    );
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
  ];

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
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div className="flex  justify-center">
      <div className="w-[70vw]">
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
      </div>
    </div>
  );
};
export default CreatePost;
