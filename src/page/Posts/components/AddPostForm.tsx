// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import React, { useState } from 'react'
import { jsx, css } from "@emotion/react";
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

import { postAdded } from '../store/postSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const onTitleChanged = (e: { target: { value: React.SetStateAction<string> } }) => { setTitle(e.target.value) }
  const onContentChanged = (e: { target: { value: React.SetStateAction<string> } }) => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postAdded({
          id: nanoid(),
          title,
          content
        })
      )

      setTitle('')
      setContent('')
    }
  }

  return (
    <section css={css({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    })}>
      <h2>添加新帖子</h2>
      <form css={css({
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        margin: '0 auto',
        border: '1px solid pink',
        borderRadius: '5px',
      })}>
        <label htmlFor="postTitle">帖子标题:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">内容：</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked}>保存帖子</button>
      </form>
    </section>
  )
}