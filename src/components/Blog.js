import React, { useState } from "react";
import { makeStyles, Grid, Box, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  section: {},
}));

const Blog = ({ blog, updateBlog, removeBlog }) => {
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
              <Grid container spacing={1}>
                <Grid item>
                  <Button
                    disableRipple
                    variant="contained"
                    style={{ backgroundColor: "#3d3d3d", color: "white" }}
                    onClick={() => setShowDetails(!showDetails)}
                  >
                    {showDetails ? "hide" : "view"}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    disableRipple
                    variant="contained"
                    style={{ backgroundColor: "#3d3d3d", color: "white" }}
                    onClick={handleClickRemove}
                  >
                    remove
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item>
            {!showDetails ? null : (
              <div>
                <p>URL: {blog.url}</p>
                <p>Author: {blog.author} </p>
                <p>Blog created by: {blog.user.name}</p>
                {/* <p>Likes: {blog.likes}</p>
                <Button
                  disableRipple
                  variant="contained"
                  style={{ backgroundColor: "#3d3d3d", color: "white" }}
                  onClick={handleClickLike}
                >
                  Add a Like
                </Button> */}
              </div>
            )}
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};
export default Blog;
