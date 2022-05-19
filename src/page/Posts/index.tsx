import React from "react";
import { FC } from "react";
import { AddPostForm } from "./components/AddPostForm";
import PostsList from './components/PostsList'
import './style/index.css'

const PostsListPage: FC = () => {

  return (
    <>
      <AddPostForm />
      <PostsList />
    </>
  )
}

export default PostsListPage;
