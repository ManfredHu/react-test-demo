import React from "react";
import { useSelector } from "react-redux";
import type { PostsState } from "../store/postSlice";
import { FC } from "react";
import { Link, useHistory } from "react-router-dom";

const PostsList: FC = () => {
  const history = useHistory();
  const posts = useSelector((state: { posts: PostsState }) => state.posts);

  const renderedPosts = posts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ));

  const jumpToFirst = () => {
    history.push('/posts/1');
  }

  const jumpToFirstRedirect = () => {
    history.replace('/posts/2');
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <div onClick={jumpToFirst}>点击跳转</div>
      <div onClick={jumpToFirstRedirect}>点击redireact跳转</div>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
