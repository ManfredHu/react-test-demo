
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import type { PostsState } from "../store/postSlice";
import { postUpdated } from '../store/postSlice'
import { Form, Input, Button } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;
export const EditPostForm = (routeProps: RouteComponentProps<{postId: string}>) => {
  const { match } = routeProps
  const { postId } = match.params
  const post = useSelector((state: { posts: PostsState }) =>
    state.posts.find(post => post.id === postId)
  )

  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.content)

  const dispatch = useDispatch()
  const history = useHistory()

  // 不同的方式获取input change event
  // https://stackoverflow.com/questions/40676343/typescript-input-onchange-event-target-value
  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const onContentChanged = (e: React.FormEvent<HTMLInputElement>) => setContent(e.currentTarget.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }))
      history.push(`/posts/${postId}`)
    }
  }

  const onFinishFailed = () => {}

  return (
    <section>
      <Title level={2}>编辑帖子</Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onSavePostClicked}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="帖子标题"
          name="postTitle"
          rules={[{ message: 'Please input 帖子标题!' }]}
        >
          <Input value={title} onChange={onTitleChanged} />
        </Form.Item>

        <Form.Item
          label="内容"
          name="postContent"
          rules={[{ message: 'Please input 内容!' }]}
        >
          <Input value={content} onChange={onContentChanged} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            保存帖子
          </Button>
        </Form.Item>
      </Form>
    </section>
  )
}