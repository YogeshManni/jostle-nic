import React, { FC } from 'react';
import './Events.css'
import { CommentOutlined, EyeOutlined, HeartOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

let events = [1,2,3,4,5,6,7,8,9]

const Events:any = () => (
  
events.map((item:any) =>
{

return(
  <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    
  >
    <Meta
      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
      title="Yogesh Manni"
      description="New Opening of branch !!"
    />
    <br/>
    <hr/>
    <div className='options'>
      <span><EyeOutlined /> <span>10 </span></span>
      <span><CommentOutlined /><span>20</span></span>
      <span><HeartOutlined /> <span>20</span></span>
    </div>
  </Card>
)
})

);
export default Events;
