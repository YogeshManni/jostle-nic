import React, { useEffect, useState } from "react";
import "./Discussion.css";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import { Button, Modal } from "antd";
import Comments from "./Comments/Comments";

function Discussion() {
  const data = Array.from({ length: 23 }).map((_, i) => ({
    href: "https://ant.design",
    title: `Josh Wells ${i}`,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
    likes: 5,
    comment: [],
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [newData, setData] = useState(data);
  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  function handleLikes(item: any) {
    item.likes += 1;
    setData([...newData]);
  }

  return (
    <div className="discussionConatiner">
      <List
        itemLayout="vertical"
        size="large"
        dataSource={newData}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <button onClick={() => handleLikes(item)}>
                <IconText
                  icon={LikeOutlined}
                  text={String(item.likes)}
                  key="list-vertical-like-o"
                />
              </button>,
              <button onClick={showModal}>
                <IconText
                  icon={MessageOutlined}
                  text="2"
                  key="list-vertical-message"
                />
              </button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
      <Modal
        footer={null}
        title="Comments"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Comments />
      </Modal>
    </div>
  );
}

export default Discussion;
