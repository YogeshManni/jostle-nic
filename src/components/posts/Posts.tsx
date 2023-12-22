import React, { useEffect, useRef, useState } from "react";

import "./Posts.scss";
import {
  BookOutlined,
  HeartOutlined,
  MessageOutlined,
  ShareAltOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Badge, Button, Modal } from "antd";
import {
  addCommentTodb,
  getPostsFromDb,
  updatePostLikesInDb,
} from "../../services/api";
import Comments from "../Discussion/Comments/Comments";
import moment from "moment";
import { Image } from "antd";

const Posts = () => {
  const [posts, setPosts]: any = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postId, setPostId] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const email = "jon@gmail.com";
    const getPosts = async () => {
      const posts = await getPostsFromDb({ email: email });
      posts.posts.forEach((item: any, ind: number) => {
        item.input = "";
      });

      setPosts(posts.posts);
    };
    getPosts();
  }, []);

  const handleComment = (e: any, post: any) => {
    post.input = e.target.value;
    setComment(e.target.value);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function handleLikes(post: any) {
    post.likes += 1;

    setPosts([...posts]);
    updatePostLikesInDb({ id: post.id });
  }

  async function addComment(postId: any, post: any) {
    if (comment.trim() === "") {
      alert("Please type a comment to post, Empty comment won't be posted !!");
      return;
    }
    const newComment = {
      discussionid: postId,
      username: "jon",
      comment: comment,
      date: moment().format("LLL"),
      type: "posts",
    };

    const res = await addCommentTodb(newComment);
    setPostId(postId);
    post.input = "";
    setIsModalOpen(true);
  }
  return (
    <section className="flex flex-col  items-center">
      {posts.map((post: any, ind: number) => (
        <div key={ind}>
          <div
            key={ind}
            className="relative card space-y-4 max-w-[430px] shadow-lg p-4 rounded-[20px]"
          >
            {/* Heading */}
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center ">
                <div className="w-8 h-6 overflow-hidden rounded-full cursor-pointer">
                  <img
                    className="w-full"
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${ind}`}
                    alt="profiles"
                  />
                </div>
                <h2 className="font-semibold">{post.username}</h2>
              </div>
              {/* <DotsHorizontalIcon className="w-5 h-5 cursor-pointer" /> */}
            </div>

            {/* Posted Image */}
            <div className="relative  aspect-square overflow-hidden">
              <Image
                src={`${process.env.REACT_APP_BASEURL}/posts/${post.img}`}
                alt={post.username}
              />
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <div className="flex justify-between mb-2">
                <div className="inline-flex items-center gap-0">
                  <Button
                    className="border-none px-[0px]"
                    onClick={(e) => handleLikes(post)}
                  >
                    <HeartOutlined className="text-[20px] text-red-500 !" />
                  </Button>
                  <Button
                    className="border-none px-[20px]"
                    onClick={() => {
                      setPostId(post.id);
                      showModal();
                    }}
                  >
                    <Badge count={post.totalcomments} showZero>
                      <MessageOutlined className="text-[20px] text-red-500 !" />
                    </Badge>
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
                {post.caption}
              </p>
              <h3 className="text-xs text-gray-500">
                {moment(post.date).format("LLL")}
              </h3>
            </div>
            <hr className="text-[#d1d5db]" />
            <div className="flex gap-4" style={{ marginTop: "5px" }}>
              <Button className="border-none p-[0px] !">
                <SmileOutlined className="text-[18px]" />
              </Button>
              <input
                className="focus:outline-none w-full"
                key={ind}
                value={post.input}
                type="text"
                placeholder="Add a comment"
                onChange={(event) => {
                  handleComment(event, post);
                }}
              />
              <button
                onClick={() => addComment(post.id, post)}
                className="text-blue-500"
              >
                Post
              </button>
            </div>
          </div>

          <hr className="my-[20px] text-[#d1d5db]" />
        </div>
      ))}
      {isModalOpen ? (
        <Modal
          footer={null}
          title="Comments"
          open={isModalOpen}
          onCancel={handleCancel}
        >
          <Comments _discussionId={postId} type={"posts"} />
        </Modal>
      ) : null}
    </section>
  );
};

export default Posts;
