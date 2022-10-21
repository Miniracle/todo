import React, { useEffect, useState } from "react";
import PostService from "./components/API/PostService";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import Loader from "./components/UI/Loader/Loader";
import MyModal from "./components/UI/MyModal/MyModal";
import { useFetching } from "./hooks/useFetching";
import { usePosts } from "./hooks/usePosts";
import {getPageCount} from './components/utils/pages'
import "./styles/App.css";
import Pagination from "./components/UI/pagination/Pagination";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  
  const [fetchPosts, isPostsLoading , postError] = useFetching(async(limit, page) =>{
    const responce = await PostService.getAll(limit, page)
    setPosts(responce.data)
    const totalCount = responce.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
    
  })

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page);
  }
  
  useEffect(() => {
    fetchPosts(limit, page);
  }, []);

  const createPost = (newPost) => {
    setModal(false);
    setPosts([...posts, newPost]);
  };

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
      {postError && <h1>Error</h1>}
      {isPostsLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="Posts about Js"
        />
      )}
      <Pagination changePage={changePage} totalPages={totalPages} page={page} />
    </div>
  );
}

export default App;
