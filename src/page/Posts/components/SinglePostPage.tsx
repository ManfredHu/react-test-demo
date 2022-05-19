/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { useSelector } from 'react-redux'
import { Link, RouteComponentProps, useHistory } from 'react-router-dom'
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
      <article className="post" css={css({
        display: 'flex',
        flexDirection: 'column'
      })}>
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>

        <button onClick={history.goBack}>return back</button>
      </article>
    </section>
  )
}