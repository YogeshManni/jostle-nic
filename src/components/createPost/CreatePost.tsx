import React, { useState, useEffect, useRef } from "react";

import {
  Avatar,
  Button,
  Col,
  message,
  Row,
  Spin,
  Steps,
  theme,
  Upload,
  UploadProps,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { addPost } from "../../services/api";
import moment from "moment";
import { getUser } from "../../helpers/helper";

const CreatePost = () => {
  const [u_img, setImage]: any = useState("");
  const [dateTime, setDateTime]: any = useState("");
  const [imgName, setImgName] = useState("");
  const caption = useRef("");
  const [user, setUser]: any = useState({});
  const [current, setCurrent] = useState(0);
  const [postType, setPostType] = useState("image");
  const [isuploading, setUploading] = useState(false);

  {
    /* First Step to select content to upload*/
  }
  useEffect(() => {
    //initlaizing datetime for new post name
    if (!dateTime) setDateTime(String(moment().format()));
    setUser(getUser());
  }, []);

  const SelectContent = () => {
    const { Dragger } = Upload;

    function getImage(img: any, callback: any) {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    }

    function uploadImage(info: any) {
      console.log(info.file);
      setUploading(false);
      if (info.file.status === "done") {
        setUploading(true);
        console.log(dateTime);
        getImage(info.file.originFileObj, (imageUrl: any) => {
          if (info.file.type.includes("video")) {
            setPostType("video");
          }
          setImgName(info.file.name);
          setImage(imageUrl);
          setCurrent(current + 1);
        });
      } else if (info.file.status === "error") {
        setUploading(false);
      }
    }
    const props: UploadProps = {
      name: "image-file",
      multiple: false,
      listType: "picture",

      action: `${process.env.REACT_APP_BASEURL}/posts/uploadImage`,

      data: { name: `${user.username}${dateTime}` },

      onChange(info: any) {
        console.log(info);
        uploadImage(info);
      },
      beforeUpload(file) {
        if (!file.type.includes("image") && !file.type.includes("video")) {
          message.error("Please upload an image or video only");
          return false;
        }
        return true;
      },
    };

    return (
      <>
        <Spin
          tip="Uploading....."
          spinning={isuploading}
          size="large"
          className="text-[100px] !"
          delay={500}
        >
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
        </Spin>
      </>
    );
  };

  {
    /* Second step to Enter details about post */
  }

  const PostDetails = () => {
    const updateCaption = (e: any) => {
      caption.current = e.target.value;
    };
    return (
      <div className="detailsData">
        <Row className="">
          <Col md={24} lg={12}>
            {postType === "image" ? (
              <img src={u_img} className="h-[50vh]"></img>
            ) : (
              <video className="h-[50vh]" controls>
                <source src={u_img} type="video/mp4" />
              </video>
            )}
          </Col>
          <Col md={24} lg={12} className="flex flex-col px-10 w-full">
            <div className="flex  w-full space-x-5 mt-[20px]">
              <Avatar
                size="large"
                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=1`}
              />
              <b className="mt-2">
                <span>{user.username}</span>
              </b>
            </div>
            <TextArea
              className="mt-5 mb-5 w-full"
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

  const next = () => {
    if (imgName === "") {
      message.open({
        type: "error",
        content: "Please upload an image or video to proceed further !!",
        duration: 7,
      });
      return;
    }
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const uploadPost = async () => {
    const data = {
      username: user.username,
      email: user.email,
      likes: 0,
      img: `${user.username}${dateTime}${imgName}`,
      caption: caption.current,
      date: moment().format("MMM Do yyyy, h:mm:ss a"),
      type: postType,
    };
    setDateTime(null);
    console.log(data);
    const res = await addPost(data);
    if (res.status === "success") {
      message.success(`Post uploaded successfully !!`);
    } else {
      message.error("Some error occured, please try again !!");
    }
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
            <Button onClick={uploadPost}>Done</Button>
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
