import React from 'react';
import { Link } from 'react-router-dom';
import images from '../images/fruits.jpg';
import PostAuthor from '../components/PostAuthor';

const PostDetails = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor />
          <div className="post-detail__buttons">
            <Link to={`/posts/werwer/edit`} className='btn sm primary'>Edit</Link>
            <Link to={`/posts/werwer/delete`} className='btn sm danger'>Delete</Link>
          </div>
        </div>
        <h1>This is the post title</h1>
        <div className="post-detail__image">
          <img src={images} alt="Fruits" />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur omnis accusantium dolores alias porro ullam veritatis repudiandae voluptates voluptatibus consequuntur non obcaecati, laborum est, sed atque. Cumque similique odio, quas excepturi alias rem nisi aperiam debitis quibusdam inventore corrupti expedita temporibus culpa velit id illum placeat distinctio doloremque enim voluptate!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic explicabo ipsam, error quibusdam sequi rem aut itaque est earum, placeat unde, iusto debitis reiciendis aperiam excepturi. Saepe inventore est amet maxime? Error enim sed quisquam dignissimos? Laborum explicabo reprehenderit distinctio porro. Aliquam in repudiandae fuga a tempore, numquam est molestias modi placeat omnis quae nulla nam. Et maiores sequi eos adipisci necessitatibus ex commodi excepturi harum, perspiciatis beatae ipsa dolor illo, accusantium maxime inventore itaque praesentium. Molestias officiis nisi culpa distinctio fuga numquam doloremque odit ab, rerum id. Architecto eos perspiciatis voluptas ut repudiandae inventore corrupti placeat dolores pariatur necessitatibus expedita quis repellendus obcaecati, odio tenetur aliquid perferendis optio suscipit! Totam molestiae 
          doloribus sed at. Omnis adipisci ullam quam ratione.
        </p>
      </div>
    </section>
  );
}

export default PostDetails;
