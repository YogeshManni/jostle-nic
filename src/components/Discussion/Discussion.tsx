import React, { useEffect, useState } from "react";
import "./Discussion.css";
import {
  LikeOutlined,
  MessageOutlined,
  SendOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Avatar, Input, List, Space } from "antd";
import { Button, Modal } from "antd";
import Comments from "./Comments/Comments";
import moment from "moment";
import {
  getDiscussionsFromDb,
  addDiscussionsToDb,
  updateLikesInDb,
} from "../../services/api";
function Discussion() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDiscussion, setDiscussion]: any = useState([]);
  const [_newDiscussion, _setDiscussion]: any = useState([]);
  const [discussionId, setDiscussionId]: any = useState(0);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  function handleLikes(item: any) {
    item.likes += 1;
    updateLikesInDb({ id: item.id, likes: item.likes });
    setDiscussion([...newDiscussion]);
  }
  const addDiscussion = async () => {
    if (_newDiscussion.length <= 0) return;
    const data = {
      username: "joshWells",
      name: `Josh Wells`,
      avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${1}`,
      Date: moment().format("LLL"),
      content: _newDiscussion,
      likes: 5,
    };
    const res = await addDiscussionsToDb(data);
    setDiscussion([...newDiscussion, res]);
    _setDiscussion("");
  };

  useEffect(() => {
    async function _getDisccussions() {
      const data = await getDiscussionsFromDb();

      setDiscussion([...newDiscussion, ...data]);
    }
    _getDisccussions();
  }, []);
  return (
    <div className="discussionContainer">
      <div className="listDiv">
        <List
          itemLayout="vertical"
          size="large"
          dataSource={newDiscussion}
          renderItem={(item: any, idx: number) => (
            <List.Item
              key={`${item.name}${idx}`}
              actions={[
                <IconText
                  icon={StarOutlined}
                  text="156"
                  key="list-vertical-star-o"
                />,
                <Button onClick={() => handleLikes(item)}>
                  <IconText
                    icon={LikeOutlined}
                    text={String(item.likes)}
                    key="list-vertical-like-o"
                  />
                </Button>,
                <Button
                  onClick={() => {
                    showModal();
                    setDiscussionId(item.id);
                  }}
                >
                  <IconText
                    icon={MessageOutlined}
                    text=""
                    key="list-vertical-message"
                  />
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item.id}`}
                  />
                }
                title={item.name}
                description={item.date}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
      <Space.Compact style={{ width: "100%" }} className="commentBox">
        <Input
          onSubmit={addDiscussion}
          value={_newDiscussion}
          onChange={(e) => _setDiscussion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") addDiscussion();
          }}
          placeholder="Write a comment"
        />
        <Button type="primary" onClick={addDiscussion}>
          <SendOutlined />
        </Button>
      </Space.Compact>

      {isModalOpen ? (
        <Modal
          footer={null}
          title="Comments"
          open={isModalOpen}
          onCancel={handleCancel}
        >
          <Comments _discussionId={discussionId} type={"discussion"} />
        </Modal>
      ) : null}
    </div>
  );
}

export default Discussion;
