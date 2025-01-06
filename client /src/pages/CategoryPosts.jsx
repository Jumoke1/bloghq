import React from 'react'
import Posts from '../components/Posts';
import PostItem from '../components/PostItem';
const CategoryPosts = () => {

return (
  <section className="">
    {Posts.length > 0 ? (
      <div className='container posts__container'>
        {Posts.map(({ id, image, category, title, description, authorID }) => (
          <PostItem key={id} postID={id} image={image} category={category} title={title} description={description} authorID={authorID} />
        ))}
      </div>
    ) : (
      <h2 className='center'>No post found</h2>
    )}
  </section>
);
}

export default CategoryPosts