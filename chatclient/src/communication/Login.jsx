import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../action/action";

const Login = () => {
  const [formData, setFormData] = useState({});
  console.log({ formData });

  const handleChange = (value, target) => {
    setFormData((currentData = {}) => {
      let newData = { ...currentData };
      newData[target] = value;
      return newData;
    });
  };

  const handleLogin = () => {
    console.log({ formData });
    login(formData).then((response) => {
      // localStorage.setItem("accessToken", response.accessToken)
      console.log({ response });
    });
  };

  return (
    <>
      <Grid
        className="sign-up"
        style={{
          height: "100vh",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          sx={{
            width: "70%",
            height: "50%",
            background: "white",
            // justifyContent: "center",
            display: "flex",
            borderRadius: "30px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <Grid
            sx={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <h2>Log In</h2>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Grid
              lg={12}
              md={6}
              sm={4}
              sx={{ margin: "10px", justifyContent: "center" }}
            >
              <TextField
                required
                id="outlined-required"
                label="User Name"
                size="small"
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "username")
                }
              />
            </Grid>
            <Grid sx={{ margin: "10px" }}>
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                size="small"
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "password")
                }
              />
            </Grid>
            <Grid sx={{ margin: "10px" }}>
              <Button
                sx={{
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  color: "black",
                  // textDecorationColor: "red",
                }}
                onClick={handleLogin}
                variant="text"
              >
                LogIn
              </Button>
            </Grid>
            <Grid
              sx={{
                margin: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid>
                <h6>{"Don't have an account?"}</h6>
              </Grid>
              <Grid
                sx={{
                  ml: "10px",
                }}
              >
                <Link to="/signup">Sign Up</Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
