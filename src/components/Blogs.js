import React from "react";
import Blog from "./Blog";
import { Container, Box, Typography } from "@material-ui/core";

export default ({ blogs, updateBlog, removeBlog, canRemove }) => (
  <section>
    <Container maxWidth="lg">
      <Typography variant="h4">Blogs</Typography>
      <Box py={5}>
        {blogs
          .sort((b0, b1) => b1.likes - b0.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
              canRemove={canRemove}
            />
          ))}
      </Box>
    </Container>
  </section>
);
