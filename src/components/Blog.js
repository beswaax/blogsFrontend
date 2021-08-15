import React, { useState } from "react";
import { makeStyles, Grid, Box, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  section: {},
}));

const Blog = ({ blog, updateBlog, removeBlog, canRemove }) => {
  const classes = useStyles();
  const [showDetails, setShowDetails] = useState(false);

  const handleClickLike = (e) => updateBlog({ ...blog, likes: blog.likes + 1 });

  const handleClickRemove = (e) => removeBlog(blog);

  return (
    <section className={classes.section}>
      <Box pb={3}>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justify="flex-start"
          spacing={0}
        >
          <Grid item>
            <div>
              <Typography>{blog.title}</Typography>
              <Button
                disableRipple
                variant="contained"
                style={{ backgroundColor: "#3d3d3d", color: "white" }}
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? "hide" : "view"}
              </Button>
            </div>
          </Grid>
          <Grid item>
            {!showDetails ? null : (
              <div>
                <p>URL: {blog.url}</p>
                <p>Author: {blog.author} </p>
                <p>Blog created by: {blog.user.name}</p>
                {!canRemove(blog) ? null : (
                  <p>
                    <Button
                      disableRipple
                      variant="contained"
                      style={{ backgroundColor: "#3d3d3d", color: "white" }}
                      onClick={handleClickRemove}
                    >
                      remove
                    </Button>
                  </p>
                )}
              </div>
            )}
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};
export default Blog;
