import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PostItem from './PostItem'

export default function PostList({ posts, title, remove }) {
  if (!posts.length)
    return (
      <h1 style={{ textAlign: "center", color: "teal" }}>
        Posts are not found ^_^
      </h1>
    );
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) => (
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <PostItem remove={remove} number={index + 1} post={post} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
