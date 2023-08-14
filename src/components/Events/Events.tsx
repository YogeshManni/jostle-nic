import React, { useEffect, useRef, useState } from "react";
import "./Events.css";
import {
  CommentOutlined,
  EyeOutlined,
  HeartOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Modal } from "antd";
import { Col, Row } from "antd";
import AddEvent from "../AddEvent/AddEvent";
import { addEventToDb, getEventFromDb } from "../../services/api";
const { Meta } = Card;

const Events = () => {
  const [modelState, setModalState] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [newPost, setNewPost] = useState(false);
  const [postData, setPostData] = useState(null);
  const addEventRef = useRef<any>();
  const addEvent = async (eventData: string) => {
    console.log(eventData);
    const res = await addEventToDb(eventData);
    console.log(res);
    setEvents([...events, eventData]);
    setModalState(false);
  };

  useEffect(() => {
    const _getEvents = async () => {
      const eves = await getEventFromDb();
      console.log(eves);
      setEvents(eves);
    };

    _getEvents();
  }, []);
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setPostData(null);
          setNewPost(true);
          setModalState(true);
        }}
        size={"large"}
        style={{ float: "right" }}
      >
        <PlusOutlined />
        Add Event
      </Button>

      <Row style={{ marginTop: "50px" }} gutter={[18, 18]}>
        {events.map((item: any, idx: any) => (
          <Col>
            <Card
              key={idx}
              className="cards"
              onClick={() => {
                setPostData(item.content);
                setNewPost(false);
                setModalState(true);
              }}
              cover={<img height="200px" alt="example" src={item.img} />}
            >
              <Meta
                avatar={<Avatar src={`${item.avtsrc}&key=${idx}`} />}
                title={item.username}
                description={item.fronttext || `Content ahead`}
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
      <div>
        <Modal
          title="Add Event"
          open={modelState}
          onOk={() => addEventRef.current.addEvent()}
          onCancel={() => setModalState(false)}
          width={window.innerWidth}
          bodyStyle={{ height: window.innerHeight - 200 }}
          style={{ top: 20 }}
        >
          <AddEvent
            ref={addEventRef}
            newPost={newPost}
            getAddEvent={addEvent}
            postData={postData}
          ></AddEvent>
        </Modal>
      </div>
    </>
  );
};

export default Events;
