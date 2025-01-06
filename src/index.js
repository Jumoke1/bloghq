import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import Authors from './pages/Authors';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import DeletePost from './pages/DeletePost';
import CategoryPosts from './pages/CategoryPosts';
import AuthorsPost from './pages/AuthorsPost';
import Logout from './pages/Logout';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [posts, setPosts] = useState([]); // managing state

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "posts/:id", element: <PostDetails /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "profile/:id", element: <UserProfile /> },
        { path: "authors", element: <Authors /> },
        { path: "create", element: <CreatePost setPosts={setPosts} posts={posts} /> },
        { path: "posts/categories/:category", element: <CategoryPosts /> },
        { path: "posts/users/:id", element: <AuthorsPost /> },
        { path: "myposts/:id", element: <Dashboard /> },
        { path: "posts/:id/edit", element: <EditPost /> },
        { path: "posts/:id/delete", element: <DeletePost /> },
        { path: "logout", element: <Logout /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "categoryPosts", element: <CategoryPosts /> }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
