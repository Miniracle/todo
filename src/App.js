import React, { useEffect, useState } from "react";
import PostService from "./components/API/PostService";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import Loader from "./components/UI/Loader/Loader";
import MyModal from "./components/UI/MyModal/MyModal";
import { usePosts } from "./hooks/usePosts";
import "./styles/App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [isPostsLoading, setIsPostsLoading] = useState(false)

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = (newPost) => {
    setModal(false);
    setPosts([...posts, newPost]);
  };

  async function fetchPosts() {
    setIsPostsLoading(true)
    const posts = await PostService.getAll()
    setPosts(posts)
    // setTimeout(()=>{
    //   setIsPostsLoading(false)
    // }, 3000)
    
  }

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
        Create user
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <PostFilter filter={filter} setFilter={setFilter} />
      {isPostsLoading ? (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="Posts about Js"
        />
      )}
    </div>
  );
}

export default App;
