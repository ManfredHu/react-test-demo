import React from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import type {
  PostsState
} from '../store/postSlice'

export const SinglePostPage = (routeProps: RouteComponentProps<{postId: string}>) => {
  const history = useHistory(); // 返回上一页
  const { match } = routeProps
  const { postId } = match.params

  const post = useSelector((state: {posts: PostsState}) =>
    state.posts.find(post => post.id === postId)
  )

  if (!post) {
    return (
      <section>
        <h2>页面未找到！</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <button onClick={history.goBack}>return back</button>
      </article>
    </section>
  )
}