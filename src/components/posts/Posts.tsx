import React, { useEffect, useRef, useState } from "react";

import "./Posts.scss";
import {
  BookOutlined,
  HeartOutlined,
  MessageOutlined,
  ShareAltOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { getPostsFromDb } from "../../services/api";

const Posts = () => {
  const post = {
    username: "Maia Habegger",
    profile:
      "https://images.unsplash.com/profile-1517999129746-0a298c444bbd?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
    image:
      "https://images.unsplash.com/photo-1611526694451-21db42be4985?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non nulla convallis, consectetur",
    likes: "421",
    createdAt: "Dec 25, 2023",
  };
  useEffect(() => {
    const email = "jon@gmail.com";
    const getPosts = async () => {
      const posts = await getPostsFromDb(email);
      console.log(posts);
    };
  }, []);
  return (
    <section className="flex justify-center">
      <div className="relative card space-y-4 max-w-[430px] shadow-lg p-4 rounded-[20px]">
        {/* Heading */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center ">
            <div className="w-8 h-8 overflow-hidden rounded-full cursor-pointer">
              <img className="w-full" src={post.profile} alt={post.profile} />
            </div>
            <h2 className=" font-semibold">{post.username}</h2>
          </div>
          {/* <DotsHorizontalIcon className="w-5 h-5 cursor-pointer" /> */}
        </div>

        {/* Posted Image */}
        <div className="relative  aspect-square overflow-hidden">
          <img className="w-full" src={post.image} alt={post.username} />
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <div className="flex justify-between mb-2">
            <div className="inline-flex items-center gap-0">
              <Button className="border-none px-[0px]">
                <HeartOutlined className="text-[20px] text-red-500 !" />
              </Button>
              <Button className="border-none px-[20px]">
                <MessageOutlined className="text-[20px] text-red-500 !" />
              </Button>
              <Button className="border-none px-[0px]">
                <ShareAltOutlined className="text-[20px] text-red-500 !" />
              </Button>
            </div>
            <Button className="border-none">
              <BookOutlined className="text-[22px]" />
            </Button>
          </div>
          <span className=" font-semibold">{`${post.likes} likes`}</span>
          <p>
            <span className="font-semibold">{post.username} </span>
            {post.description}
          </p>
          <h3 className="text-xs text-gray-500">{post.createdAt}</h3>
        </div>

        <hr style={{ color: "lightgray" }} />

        <div className="flex gap-4" style={{ marginTop: "5px" }}>
          <Button className="border-none p-[0px] !">
            <SmileOutlined className="text-[18px]" />
          </Button>
          <input
            className="focus:outline-none w-full"
            type="text"
            placeholder="Add a comment"
          />
          <button className="text-blue-500">Post</button>
        </div>
      </div>
    </section>
  );
};

export default Posts;
