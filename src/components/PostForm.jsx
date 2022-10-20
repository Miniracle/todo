import React, { useState } from 'react'
import MyButton from './UI/button/MyButton'
import MyInput from './UI/input/MyInput'

export default function PostForm({ create }) {
  const [post, setPost] = useState({ title: '', body: '' })

  const addNewPost = (e) => {
    e.preventDefault()

    const newPost = {
      ...post,
      id: Date.now(),
    }
    if (newPost.title === '' || newPost.body === '') {
      return
    } else create(newPost)
    setPost({ title: '', body: '' })
  }
  return (
    <form>
      <MyInput
        value={post.title}
        onChange={(e) => {
          setPost({ ...post, title: e.target.value })
        }}
        type='text'
        placeholder='Name of post'
      />
      <MyInput
        value={post.body}
        onChange={(e) => {
          setPost({ ...post, body: e.target.value })
        }}
        type='text'
        placeholder='Description of post'
      />
      <MyButton onClick={addNewPost}>Add Post</MyButton>
    </form>
  )
}
