import { useAppSelector } from '@/hooks/hooks'
import React from 'react'
import { useSelector } from 'react-redux'

export const PostAuthor = ({ userId }: { userId: string}) => {
  const author = useAppSelector(state =>
    state.users.find(user => user.id === userId)
  )

  return <span>by {author ? author.name : 'Unknown author'}</span>
}