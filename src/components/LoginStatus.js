import React from "react";
import { Grid, Container, Typography, Box, Button } from "@material-ui/core";

export default ({ user: { name }, clickLogoutHandler }) => (
  <section>
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        spacing={2}
        alignItems="flex-start"
        justify="flex-start"
      >
        <Grid item>
          <Typography style={{ fontWeight: 20, fontSize: 25 }}>
            Logged in as <span className="user-name">{name}</span>
          </Typography>
        </Grid>
        <Grid item>
          <Button
            disableRipple
            variant="contained"
            style={{ backgroundColor: "#3d3d3d", color: "white" }}
            onClick={clickLogoutHandler}
          >
            logout
          </Button>
        </Grid>
      </Grid>
    </Container>
  </section>
);
