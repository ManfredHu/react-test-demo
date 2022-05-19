import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
]

export type PostsState = typeof initialState

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<typeof initialState[number]>) {
        state.push(action.payload)
      },
      // 又是潜规则 http://cn.redux.js.org/tutorials/essentials/part-4-using-data#%E5%87%86%E5%A4%87-action-payloads
      // 接收两个参数，返回一个对象
      prepare(title, content, userId) { 
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId
          }
        }
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  }
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer