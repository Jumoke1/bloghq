import React, { useState } from 'react'
import Avatar from '../images/Avatar1.jpeg'
import Posts from '../components/Posts'
import { Link } from 'react-router-dom'

const authorsData = [
  { id: 1, avatar: Avatar, name: 'jums baby', posts: 3 },
  { id: 2, avatar: Avatar, name: 'another author', posts: 5 },
  { id: 3, avatar: Avatar, name: 'third author', posts: 2 },
  { id: 4, avatar: Avatar, name: 'fourth author', posts: 1 }
]

const Authors = () => {
  const [authors, setAuthors] = useState(authorsData)
  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container authors__container">
          {authors.map(({ id, avatar, name, posts }) => {
            return (
              <Link key={id} to={`/post/user/${id}`}>
                <div className="author__avatar">
                  <img src={avatar} alt={`image of ${name}`} />
                </div>
                <div className="author__info">
                  <h4>{name}</h4>
                  <p>{posts} posts</p>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <p>No authors found.</p>
      )}
    </section>
  )
}

export default Authors
