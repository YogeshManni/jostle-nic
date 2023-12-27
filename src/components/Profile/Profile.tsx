import { Avatar, Button, Card, Upload, UploadProps, message } from "antd";
import React from "react";
import "./Profile.css";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { getUser } from "../../helpers/helper";
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
          className="flex justify-center shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] p-5"
          /*  cover={
            <img
              className="h-[500px] w-[700px]"
              alt="example"
              src={`${process.env.REACT_APP_BASEURL}/profiles/${props.user.img}`}
            />
          } */
        >
          <Avatar
            size={200}
            src={`${process.env.REACT_APP_BASEURL}/profiles/${props.user.img}`}
          />

          <div className="m-3 flex items-center flex-col">
            <b>
              <p>{props.user.fullname.toUpperCase()}</p>
            </b>

            <p className="text-[13px]">{props.user.phoneno}</p>
            <Upload {...upProps} className="mt-2 bg-sbutton  border-sbutton !">
              <Button
                className="border-sbutton round-[20px] !"
                icon={<UploadOutlined />}
              >
                Click to Upload
              </Button>
            </Upload>
          </div>
        </Card>

        <Card
          hoverable
          className="flex justify-center shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] p-5 lg:ml-3 mt-3 lg:mt-0"
        >
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
            <span>{moment(props.user.datejoined).format("LLL")}</span>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Profile;
