import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../action/login/action";
import logo from "../../assets/BLAZE-logo.png";

const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (value, target) => {
    setFormData((currentData = {}) => {
      let newData = { ...currentData };
      newData[target] = value;
      return newData;
    });
  };

  const handleLogin = async () => {
    login(formData).then((response) => {
      if (response?.status === 200) {
        navigate("/chat");
      }
    });
  };

  return (
    <>
      <Box
        margin={"auto"}
        width={"100%"}
        justifyItems={"center"}
        position={"absolute"}
        top={"50%"}
        sx={{ transform: "translateY(-50%)" }}
      >
        <Card
          sx={{
            width: "60%",
            height: "80%",
            p: 2,
          }}
        >
          <Grid container spacing={1}>
            <Grid
              container
              item
              lg={6}
              md={6}
              sm={6}
              xs={12}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"4px"}
              sx={{
                background:
                  "linear-gradient(to right,rgb(100, 95, 255),rgb(123, 184, 254))",
              }}
            >
              <Box
                sx={{
                  backgroundImage: "url(" + logo + ")",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  width: "100px",
                  height: "100px",
                }}
                mb={{ md: 1, sm: 1, xs: 2 }}
              ></Box>
              {/* <Typography color={"white"} fontFamily={"monospace"} variant="h4">
                Chatty
              </Typography> */}
              <Divider
                variant="middle"
                sx={{ width: "80%", borderColor: "black", borderWidth: 2 }}
              />
              <Typography color={"white"} fontFamily={"monospace"} variant="h4">
                Log In
              </Typography>
            </Grid>
            <Grid
              // pl={1}
              spacing={2}
              container
              item
              lg={6}
              md={6}
              sm={6}
              xs={12}
            >
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  sx={{ width: "60%" }}
                  required
                  id="outlined-required"
                  label="User Name"
                  size="small"
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "username")
                  }
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  sx={{ width: "60%" }}
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
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  // variant="text"
                >
                  LogIn
                </Button>
              </Grid>
              <Grid item container lg={12} md={12} sm={12} xs={12}>
                <Grid xs={12} sm={12} md={6} lg={5}>
                  <Typography>Don&apos;t have an account?</Typography>
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={6}>
                  <Link to="/signup">Sign Up</Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};

export default Login;
