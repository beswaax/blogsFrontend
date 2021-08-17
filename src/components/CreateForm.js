import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";

export default ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (await createBlog({ title, author, url })) {
      setTitle("");
      setAuthor("");
      setUrl("");
    }
  };

  return (
    <section>
      <Typography variant="h5">create new</Typography>
      <form onSubmit={submitHandler}>
        <Box>
          <TextField
            variant="outlined"
            name="blog-title"
            id="blog-title"
            type="text"
            label="Blog Title"
            onChange={({ target }) => setTitle(target.value)}
          >
            {title}
          </TextField>
        </Box>
        <Box my={1}>
          <TextField
            variant="outlined"
            name="blog-author"
            id="blog-author"
            type="text"
            label="Author"
            onChange={({ target }) => setAuthor(target.value)}
          >
            {title}
          </TextField>
        </Box>
        <Box mb={1}>
          <TextField
            variant="outlined"
            name="blog-url"
            id="blog-url"
            type="text"
            label="URL"
            onChange={({ target }) => setUrl(target.value)}
          >
            {title}
          </TextField>
        </Box>
        <Box my={1}>
          <Button color="primary" variant="contained" type="submit">
            create
          </Button>
        </Box>
      </form>
    </section>
  );
};
