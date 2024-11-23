// import React from 'react'

import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { signUp } from "../action/action";

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
    <div
      className="log-in"
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "lightblue",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        sx={{
          width: "80%",
          height: "80%",
          display: "flex",
          backgroundColor: "white",
          borderRadius: "25px",
        }}
      >
        <Grid
          sx={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            display: "inline-flex",
            position: "relative",
          }}
        >
          <IconButton
            onClick={goBack}
            style={{
              left: "5px",
              position: "absolute",
              top: "5px",
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <h2>SignUp</h2>
        </Grid>
        <Grid
          sx={{
            display: "inline-flex",
            flexFlow: "column",
          }}
        >
          <Grid
            sx={{
              display: "flex",
            }}
          >
            <Grid lg={12} md={6} sm={4} sx={{ margin: "10px" }}>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "20px",
                    backgroundColor: "white",
                    width: "80%",
                  },
                }}
                required
                id="outlined-required"
                label="First Name"
                size="small"
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "firstName")
                }
              />
            </Grid>
            <Grid lg={12} md={6} sm={4} sx={{ margin: "10px" }}>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "20px",
                    backgroundColor: "white",
                    width: "80%",
                  },
                }}
                required
                id="outlined-required"
                label="Last Name"
                size="small"
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "lastName")
                }
              />
            </Grid>
          </Grid>
          <Grid lg={12} md={6} sm={4} sx={{ margin: "10px" }}>
            <TextField
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "20px",
                  backgroundColor: "white",
                  width: "80%",
                },
              }}
              required
              id="outlined-required"
              label="User Name"
              size="small"
              onChange={(e) => handleChange(e?.target?.value || "", "userName")}
            />
          </Grid>
          <Grid lg={12} md={6} sm={4} sx={{ margin: "10px" }}>
            <TextField
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "20px",
                  backgroundColor: "white",
                  width: "80%",
                },
              }}
              required
              id="outlined-required"
              label="Display Name"
              size="small"
              onChange={(e) =>
                handleChange(e?.target?.value || "", "displayName")
              }
            />
          </Grid>
          <Grid lg={12} md={6} sm={4} sx={{ margin: "10px" }}>
            <TextField
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "20px",
                  backgroundColor: "white",
                  width: "80%",
                },
              }}
              required
              id="outlined-required"
              label="Mobile Nuumber"
              size="small"
              onChange={(e) =>
                handleChange(e?.target?.value || "", "mobileNumber")
              }
            />
          </Grid>
          <Grid width={"200px"} lg={12} md={6} sm={4} sx={{ margin: "10px" }}>
            <InputLabel id="select-gender">Gender</InputLabel>
            <Select
              sx={{
                ".MuiSelect-root": {
                  borderRadius: "20px",
                  backgroundColor: "white",
                  width: "80%",
                },
              }}
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
          </Grid>
          <Grid sx={{ margin: "10px" }}>
            <TextField
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "20px",
                  backgroundColor: "white",
                  width: "80%",
                },
              }}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              size="small"
              onChange={(e) => handleChange(e?.target?.value || "", "password")}
            />
          </Grid>
          <Grid sx={{ margin: "10px" }}>
            <TextField
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "20px",
                  backgroundColor: "white",
                  width: "80%",
                },
              }}
              id="outlined-password-input"
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              size="small"
              onChange={(e) =>
                handleChange(e?.target?.value || "", "confirmPassword")
              }
            />
          </Grid>
          <Grid>
            <Button
              onClick={(e) => handdleSubmit(formData)}
              style={{
                margin: "10px",
              }}
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
