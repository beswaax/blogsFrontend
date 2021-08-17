import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import ErrorMessage from "./components/ErrorMessage";
import SuccessMessage from "./components/SuccessMessage";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";
import LoginStatus from "./components/LoginStatus";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import Container from "@material-ui/core/Container";

const LOGGED_BLOG_LIST_USER = "loggedBlogListUser";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const fetchBlogs = async () => setBlogs(await blogService.getAll());

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJson = localStorage.getItem(LOGGED_BLOG_LIST_USER);

    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const noteFormRef = useRef();

  const loginUser = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem(LOGGED_BLOG_LIST_USER, JSON.stringify(user));
      console.log(user);
      setUser(user);

      return true;
    } catch (exception) {
      console.error(exception);
      console.log(user);
      setErrorMessage("wrong credentials");
      setTimeout(() => setErrorMessage(null), 5000);

      return false;
    }
  };

  const createBlog = async ({ title, author, url }) => {
    try {
      await blogService.create(
        {
          title: title,
          author: author,
          url: url,
          likes: 0,
        },
        token
      );

      setSuccessMessage(`added new blog ${title} by ${author}`);
      setTimeout(() => setSuccessMessage(null), 5000);

      fetchBlogs();

      noteFormRef.current.toggleStatus();

      return true;
    } catch (exception) {
      setErrorMessage(exception.message);
      setTimeout(() => setErrorMessage(null), 5000);
      return false;
    }
  };

  const updateBlog = async (blog) => {
    try {
      const response = await blogService.update(blog, blog.id);
      console.log(response);

      setSuccessMessage(`updated blog ${blog.title} by ${blog.author}`);
      setTimeout(() => setSuccessMessage(null), 5000);

      setBlogs(blogs.map((bblog) => (bblog.id === blog.id ? blog : bblog)));

      return true;
    } catch (exception) {
      setErrorMessage("something went wrong");
      setTimeout(() => setErrorMessage(null), 5000);

      return false;
    }
  };

  const removeBlog = async (blog) => {
    try {
      if (!window.confirm(`remove blog ${blog.title} by ${blog.author}`))
        return false;

      await blogService.remove(blog.id, token);

      setSuccessMessage(`removed blog ${blog.title} by ${blog.author}`);
      setTimeout(() => setSuccessMessage(null), 5000);

      setBlogs(blogs.filter((bblog) => bblog.id !== blog.id));

      return true;
    } catch (exception) {
      setErrorMessage("something went wrong");
      setTimeout(() => setErrorMessage(null), 5000);

      return false;
    }
  };

  const canRemove = (blog) => {
    return blog.user.id === user.id;
  };

  const clickLogoutHandler = () => {
    setUser(null);
    window.localStorage.removeItem(LOGGED_BLOG_LIST_USER);
  };

  return (
    <div style={{ backgroundColor: "#FAFAFA" }}>
      {!errorMessage || <ErrorMessage message={errorMessage} />}
      {!successMessage || <SuccessMessage message={successMessage} />}
      {user === null || (
        <LoginStatus user={user} clickLogoutHandler={clickLogoutHandler} />
      )}
      {user !== null || <LoginForm loginUser={loginUser} />}
      {/* <Togglable buttonLabel="login">
        </Togglable> */}
      {user === null || (
        <Container maxWidth="lg" style={{ paddingBottom: "2rem" }}>
          <Togglable buttonLabel="new blog" ref={noteFormRef}>
            <CreateForm createBlog={createBlog} />
          </Togglable>
        </Container>
      )}
      {user === null || (
        <Blogs
          blogs={blogs}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
          canRemove={canRemove}
        />
      )}
    </div>
  );
};

export default App;
