import React, { useState } from 'react';
import DUMMY_POSTS from '../data.js'
import PostItem from '../components/PostItem';

const AuthorsPost = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS);

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className='container posts__container'>
          {posts.map(({ id, image, category, title, description, authorID }) => (
            <PostItem key={id} postID={id} image={image} category={category} title={title} description={description} authorID={authorID} />
          ))}
        </div>
      ) : (
        <h2 className='center'>No post found</h2>
      )}
    </section>
  );
}

export default AuthorsPost;
