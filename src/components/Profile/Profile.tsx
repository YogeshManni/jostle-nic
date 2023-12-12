import { Button, Card, Upload, UploadProps, message } from "antd";
import React from "react";
import "./Profile.css";
import { UploadOutlined } from "@ant-design/icons";
function Profile(props: any) {
  const upProps: UploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <div className="profileContainer">
        <Card
          hoverable
          className="profileCard1"
          cover={
            <img
              alt="example"
              src={"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}
            />
          }
        >
          <div className="uploadBtn">
            <Upload {...upProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
          <b>
            <p>{props.user.fullname}</p>
          </b>
          <hr />
          <div className="cardData">
            <p>{props.user.role}</p>

            <p>{props.user.phoneno}</p>
          </div>
        </Card>

        <Card hoverable className="profileCard2">
          <div className="bioDiv">
            <b>User Name</b>
            <span>{props.user.username}</span>
          </div>
          <hr />
          <div className="bioDiv">
            <b>Full Name</b>
            <span>{props.user.fullname}</span>
          </div>
          <hr />
          <div className="bioDiv">
            <b>Email</b>
            <span>{props.user.email}</span>
          </div>
          <hr />
          <div className="bioDiv">
            <b>Role</b>
            <span>{props.user.role}</span>
          </div>
          <hr />
          <div className="bioDiv">
            <b>Phone number</b>
            <span>{props.user.phoneno}</span>
          </div>
          <hr />
          <div className="bioDiv">
            <b>Date Joined</b>
            <span>{props.user.datejoined}</span>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Profile;
