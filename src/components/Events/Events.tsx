import React, {  useEffect, useRef, useState } from "react";
import "./Events.css";
import { CommentOutlined, EyeOutlined, HeartOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Modal } from "antd";
import { Col, Row } from "antd";
import AddEvent from "../AddEvent/AddEvent";
const { Meta } = Card;


const Events = () => {

  
  const [modelState,setModalState] = useState(false);
  const [events,setEvents] = useState<any[]>([]);
  const [newPost,setNewPost] = useState(false)
  const addEventRef = useRef<any>();
   const addEvent  = (eventData:string) =>
   {
    console.log(eventData)
      setEvents([...events,eventData])
      setModalState(false)
   } 

   useEffect(() =>
   {
    setEvents([{
      frontText:"New Opening of branch!!",
      img:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      avtSrc:"https://xsgames.co/randomusers/avatar.php?g=pixel",
      userName : "Josh wells",
      content:"New Opening of branch!!"
    },{
      frontText:"New Opening of branch!!",
      img:"data:image/jpeg;base64,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",
      avtSrc:"https://xsgames.co/randomusers/avatar.php?g=pixel",
      userName : "Josh wells",
      content:"New Opening of branch!!"
    }]);
    
   },[])
  return (
 
    <>
    <Button type="primary" onClick={() => {setNewPost(true);setModalState(true)}} size={'large'} style={{float:'right'}}>
      <PlusOutlined />Add Event
    </Button>
    
    <Row style={{marginTop:'50px'}} gutter={[18, 18]}>
      {events.map((item:any,idx:any) => (
        
        <Col>
         
          <Card
            key={idx}
            className="cards"
           onClick={() => {setNewPost(false);setModalState(true)}}
            cover={
              <img
                  height="200px"
                alt="example"
                src={item.img}
              />
            }
          >
            <Meta
              avatar={
                <Avatar src={`${item.avtSrc}&key=${idx}`} />
              }
              title={item.userName}
              description={item.frontText || `Content ahead`}
            />
            <br />
            <hr />
            <div className="options">
              <span>
                <EyeOutlined /> <span>10 </span>
              </span>
              <span>
                <CommentOutlined />
                <span >20</span>
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
        width={window.innerWidth }
        bodyStyle={{height: window.innerHeight - 200}}
        style = {{top:20}}
      >
        <AddEvent  ref={addEventRef} newPost = {newPost} getAddEvent={addEvent}></AddEvent>
      </Modal>
      </div>
    </>
  );
};

export default Events;
