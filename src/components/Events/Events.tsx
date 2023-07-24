import React from "react";
import "./Events.css";
import { CommentOutlined, EyeOutlined, HeartOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { Col, Row } from "antd";
const { Meta } = Card;

const events = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Events = () => {
  return (
    //<div className="cardsContainer">
    <Row gutter={[18, 18]}>
      {events.map((item) => (
        <Col>
          <Card
            key={item}
            className="cards"
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
          >
            <Meta
              avatar={
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
              }
              title="Josh wells"
              description="New Opening of branch !!"
            />
            <br />
            <hr />
            <div className="options">
              <span>
                <EyeOutlined /> <span>10 </span>
              </span>
              <span>
                <CommentOutlined />
                <span>20</span>
              </span>
              <span>
                <HeartOutlined /> <span>20</span>
              </span>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
    //   </div>
  );
};

export default Events;
