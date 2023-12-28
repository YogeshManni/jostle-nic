import { Avatar, Button, Card, Upload, UploadProps, message } from "antd";
import React, { useEffect, useState } from "react";
import "./Profile.css";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { getUser } from "../../helpers/helper";
import { updateDpinDb } from "../../services/api";
function Profile(props: any) {
  const [dateTime, setDateTime]: any = useState("");
  const [userdata, setUserData]: any = useState(null);
  useEffect(() => {
    //initlaizing datetime for new profle pic
    if (!dateTime) setDateTime(String(moment().format()));

    setUserData(props.user);
  }, []);

  function getImage(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function uploadImage(info: any) {
    if (info.file.status == "done") {
      getImage(info.file.originFileObj, (imageUrl: any) => {
        const updateDp = async () => {
          const res = await updateDpinDb({
            filename: `${getUser().username}${dateTime}${info.file.name}`,
            data: props,
          });
          if (res.status == "success") {
            message.success("Profile pic changed successfully !");
          } else {
            message.error(
              "Error ocurred while uploading pic, please try again !"
            );
          }

          setUserData(res.data);
        };
        updateDp();
      });
    }
  }

  const uploadprops: UploadProps = {
    name: "image-file",
    multiple: false,

    action: `${process.env.REACT_APP_BASEURL}/users/uploadImage`,

    data: { name: `${getUser().username}${dateTime}` },

    onChange(info: any) {
      uploadImage(info);
    },
    beforeUpload(file) {
      if (!file.type.includes("image")) {
        message.error("Please upload an image only");
        return false;
      }
      return true;
    },
  };

  return (
    <>
      {userdata && (
        <div className="profileContainer">
          <Card
            hoverable
            className="flex justify-center shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] p-5"
          >
            <Avatar
              size={200}
              src={`${process.env.REACT_APP_BASEURL}/profiles/${userdata.img}`}
            />

            <div className="m-3 flex items-center flex-col">
              <b>
                <p>{userdata.fullname.toUpperCase()}</p>
              </b>

              <p className="text-[13px]">{userdata.phoneno}</p>
              <Upload {...uploadprops} className="mt-2 = !">
                <Button
                  className=" bg-sbutton border-sbutton round-[20px] !"
                  icon={<UploadOutlined />}
                >
                  Upload Profile pic
                </Button>
              </Upload>
            </div>
          </Card>
          <Card
            hoverable
            className="usersinfo w-full shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] md:p-2 2xl:ml-3 mt-3 2xl:mt-0"
          >
            <div className="bioDiv">
              <b>User Name</b>
              <span>{userdata.username}</span>
            </div>
            <hr />
            <div className="bioDiv">
              <b>Full Name</b>
              <span>{userdata.fullname}</span>
            </div>
            <hr />
            <div className="bioDiv">
              <b>Email</b>
              <span>{userdata.email}</span>
            </div>
            <hr />
            <div className="bioDiv">
              <b>Role</b>
              <span>{userdata.role}</span>
            </div>
            <hr />
            <div className="bioDiv">
              <b>Phone number</b>
              <span>{userdata.phoneno}</span>
            </div>
            <hr />
            <div className="bioDiv">
              <b>Date Joined</b>
              <span>{moment(userdata.datejoined).format("LLL")}</span>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

export default Profile;
