/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from "react";
import { jsx, css } from "@emotion/react";
import { useDispatch } from "react-redux";
// import { nanoid } from "@reduxjs/toolkit";
import { postAdded } from "../store/postSlice";
// import type {
//   UsersState
// } from '../../Users/store'
import { useAppSelector } from "@/hooks/hooks";
export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState('')

  const dispatch = useDispatch();
  const users = useAppSelector(state => state.users)
  
  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));

      setTitle("");
      setContent("");
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))


  return (
    <section
      css={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      })}
    >
      <h2>添加新帖子</h2>
      <form
        css={css({
          display: "flex",
          flexDirection: "column",
          width: "50%",
          margin: "0 auto",
          border: "1px solid pink",
          borderRadius: "5px",
        })}
      >
        <label htmlFor="postTitle">帖子标题:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">内容：</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />

        <button className="button" type="button" onClick={onSavePostClicked} disabled={!canSave}>
          保存帖子
        </button>
      </form>
    </section>
  );
};
