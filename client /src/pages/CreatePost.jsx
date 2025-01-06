// CreatePost.jsx
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import Notify from '../notify';
import 'toastr/build/toastr.min.css';

const CreatePost = ({ setPosts, posts }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [images, setImage] = useState('');

  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const addNewPost = (newPost) => {
    if (!Array.isArray(posts)) {
      console.error('Posts is not an array:', posts);
      return;
    }
    setPosts([...posts, newPost]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formatedDescription = description.split('<p>').join('').split('</p>').join('');

    const displayError = (error) => {
      setError(true);
      setErrorMessage(error);
    };

    try {
      // Retrieve the token
      const token = localStorage.getItem('ACCESS_TOKEN');
      console.log('Token:', token);
      api
        .post(
          '/createpost',
          {
            title: title,
            category: category,
            content: formatedDescription
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            Notify('Post created successfully!', 'success', 'post');
            addNewPost(response.data);
            setTimeout(() => {
              navigate('/');
            }, 500);
          } else {
            displayError('Failed to create the post. Please try again.');
          }
        })
        .catch((error) => {
          console.error('Error creating post:', error);
          displayError('An error occurred. Please check your connection or try again later.');
        });
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Something went wrong. Please refresh and try again.');
    }
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const POST_CATEGORIES = ['Agriculture', 'Business', 'Education', 'Entertainment', 'Uncategorized', 'Weather'];

  return (
    <section className="create-post">
      <link href="toastr.css" rel="stylesheet" />
      <div className="container">
        <h2>Create Post</h2>
        <p className={`form_error-message ${error ? 'visible' : ''}`}>{errorMessage}</p>
        <form onSubmit={handleSubmit} className="form create-post__form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {POST_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="png, jpeg, jpg" />
          <button type="submit" className="btn primary">
            Create
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
