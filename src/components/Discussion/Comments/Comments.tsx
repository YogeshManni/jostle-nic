import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, Divider, Input, List, Skeleton, Space } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Comments.css";
import { SendOutlined } from "@ant-design/icons";
import moment from "moment";
interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}
function Comments() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [comment, setComment] = useState("");

  const loadMoreData = () => {
    let fakeData = [
      {
        img: "/data/img1",
        username: "bob",
        comment: "What a wonderful story",
        date: "25/07/2023",
      },
    ];
    setData([...data, ...fakeData]);
    setLoading(false);
    /*   if (loading) {
        return;
      }
      setLoading(true);
      fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
        .then((res) => res.json())
        .then((body) => {
          setData([...data, ...body.results]);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        }); */
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const addComment = () => {
    const newComment = {
      img: "/data/img1",
      username: "bob",
      comment: comment,
      date: moment().format("LLL"),
    };
    setData([...data, newComment]);
    setComment("");
  };

  return (
    <>
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item: any) => (
              <List.Item key={item.img}>
                <List.Item.Meta
                  className="metaList"
                  avatar={<Avatar src={item.img} />}
                  title={<a href="https://ant.design">{item.username}</a>}
                  description={item.comment}
                />
                <div className="commentDateTime">{item.date}</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
      <Space.Compact style={{ width: "100%" }} className="commentBox">
        <Input
          onSubmit={addComment}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") addComment();
          }}
          placeholder="Write a comment"
        />
        <Button type="primary" onClick={addComment}>
          <SendOutlined />
        </Button>
      </Space.Compact>
    </>
  );
}

export default Comments;
