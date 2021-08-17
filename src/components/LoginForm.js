import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function Form({ loginUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const content = {
    header: "Sign In",
    "01_primary-action": "Sign In",
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (await loginUser({ username, password })) {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <section>
      <Container maxWidth="xs">
        <Box pt={8} pb={10}>
          <Box mb={3} textAlign="center">
            <Typography variant="body1" align="left">
              username: baseAdmin
            </Typography>
            <Typography variant="body1" align="left">
              password: password
            </Typography>
            <Typography variant="h5" align="left" component="h2">
              {content["header"]}
            </Typography>
          </Box>
          <Box>
            <form onSubmit={submitHandler}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="username"
                    id="username"
                    type="text"
                    label="Username"
                    autoComplete="username"
                    onChange={({ target }) => setUsername(target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </Grid>
              </Grid>
              <Box my={2}>
                <Button
                  disableRipple
                  disableTouchRipple
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  {content["01_primary-action"]}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </section>
  );
}
