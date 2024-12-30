// import React from 'react'

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../action/login/action";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (value, target) => {
    setFormData((currentData = {}) => {
      let newData = { ...currentData };
      newData[target] = value;
      return newData;
    });
    console.log({ formData });
  };

  const goBack = () => {
    navigate("/");
  };

  const handdleSubmit = () => {
    console.log({ formData });
    try {
      signUp(formData).then((response) => {
        console.log(response);
        if (response) {
          navigate("/");
        }
      });
    } catch (error) {
      console.log(error);
    }
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
        <Card sx={{ width: "90%" }}>
          <Grid spacing={1} p={2} container>
            {/* <Grid xs={12}>
          <IconButton
            onClick={goBack}
            // style={{
            //   left: "5px",
            //   position: "absolute",
            //   top: "5px",
            // }}
          >
            <ArrowBackIosIcon />
          </IconButton>
        </Grid> */}
            <Grid
              item
              container
              lg={6}
              md={6}
              sm={6}
              xs={12}
              borderRadius={"4px"}
              // backgroundColor={"#ACE1AF"}
              // background={"linear-gradient(to right, #ff7e5f, #feb47b)"}
              sx={{
                background:
                  "linear-gradient(to right,rgb(100, 95, 255),rgb(123, 184, 254))",
              }}
              // justifyContent={"center"}
              // alignContent={"center"}
            >
              <Box height={"fit-content"}>
                <IconButton size="small" onClick={goBack}>
                  <ArrowBackIosIcon />
                </IconButton>
              </Box>
              <Box justifyItems={"center"} width={"100%"} p={2}>
                <Typography
                  color={"white"}
                  fontFamily={"monospace"}
                  variant="h4"
                >
                  Sign Up
                </Typography>
              </Box>
            </Grid>
            <Grid
              display={"flex"}
              // justifyContent={"center"}
              // ml={{ xs: 1 }}
              spacing={2}
              item
              container
              lg={6}
              md={6}
              sm={6}
              xs={12}
            >
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  // sx={{
                  //   "& .MuiInputBase-root": {
                  //     borderRadius: "20px",
                  //     backgroundColor: "white",
                  //     width: "80%",
                  //   },
                  // }}
                  fullWidth
                  required
                  id="outlined-required"
                  label="First Name"
                  size="small"
                  value={formData?.firstName || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "firstName")
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label="Last Name"
                  size="small"
                  value={formData?.lastName || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "lastName")
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label="User Name"
                  size="small"
                  value={formData?.userName || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "userName")
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label="Display Name"
                  size="small"
                  value={formData?.displayName || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "displayName")
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label="Mobile Number"
                  size="small"
                  value={formData?.mobileNumber || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "mobileNumber")
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  select
                  fullWidth
                  required
                  id="outlined-required"
                  label="Gender"
                  size="small"
                  value={formData?.gender || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "gender")
                  }
                >
                  <MenuItem value={"MALE"}>Male</MenuItem>
                  <MenuItem value={"FEMALE"}>Female</MenuItem>
                </TextField>
              </Grid>
              {/* <Grid item lg={6} md={6} sm={12}>
            <InputLabel id="select-gender">Gender</InputLabel>
            <Select
              labelId="select-gender"
              id="gender-simple-select"
              value={formData?.gender || ""}
              label="Gender"
              onChange={(e) => handleChange(e?.target?.value || "", "gender")}
              fullWidth
              size="small"
            >
              <MenuItem value={"MALE"}>Male</MenuItem>
              <MenuItem value={"FEMALE"}>Female</MenuItem>
            </Select>
          </Grid> */}
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  size="small"
                  value={formData?.password || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "password")
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Confirm Password"
                  type="password"
                  autoComplete="current-password"
                  size="small"
                  value={formData?.confirmPassword || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "confirmPassword")
                  }
                />
              </Grid>
              <Grid
                item
                // lg={6}
                // md={6}
                // sm={12}
                xs={12}
                display={{ xs: "flex" }}
                justifyContent={"flex-end"}
              >
                <Button
                  onClick={(e) => handdleSubmit(formData)}
                  variant="contained"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};

export default SignUp;
