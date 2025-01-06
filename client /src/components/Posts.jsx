import React, { useState, useEffect } from 'react';
import PostItem from './PostItem'; // Ensure PostItem is imported
import DUMMY_POSTS from '../data'
import api from '../api';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts')
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
       setPosts(response.data)
        //displayError("Failed to create the post. Please try again.");
      }
    })
    .catch((error) =>{
      console.error("Error fetching posts:", error);
    });
  }, []);

  return (
    <section className="posts">
      { posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(post => (
            <PostItem
              key={post.id}
              PostID={post.id}
              image={post.image}
              category={post.category}
              title={post.title}
              description={post.description}
              authorID={post.authorID}
            />
          ))}
        </div>
      ) : (
        <h2 className='center'>No post found</h2>
      )}
    </section>
  );
}

export default Posts;