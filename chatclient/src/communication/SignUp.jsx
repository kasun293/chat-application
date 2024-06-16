// import React from 'react'

import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";

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
    navigate("/")
  }

  return (
    <div
      className="log-in"
      style={{
        position: "relative",
        height: "50vh",
        width: "30vw",
        backgroundColor: "lightblue",
        paddingTop: "1px",
        borderRadius: "10px",
      }}
    >
      <IconButton 
      onClick={goBack}
      style={{
        position: "absolute",
        left: "0px"
      }}>
        <ArrowBackIosIcon />
      </IconButton>
      SignUp
      <Grid lg={12} md={6} sm={4} sx={{ margin: "10px" }}>
        <TextField
          required
          id="outlined-required"
          label="First Name"
          size="small"
          onChange={(e) => handleChange(e?.target?.value || "", "firstName")}
        />
      </Grid>
      <Grid lg={12} md={6} sm={4} sx={{ margin: "10px" }}>
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          size="small"
          onChange={(e) => handleChange(e?.target?.value || "", "lastName")}
        />
      </Grid>
      <Grid lg={12} md={6} sm={4} sx={{ margin: "10px" }}>
        <TextField
          required
          id="outlined-required"
          label="User Name"
          size="small"
          onChange={(e) => handleChange(e?.target?.value || "", "username")}
        />
      </Grid>
      <Grid lg={12} md={6} sm={4} sx={{ margin: "10px" }}>
        <TextField
          required
          id="outlined-required"
          label="Display Name"
          size="small"
          onChange={(e) => handleChange(e?.target?.value || "", "displayName")}
        />
      </Grid>
      <Grid lg={12} md={6} sm={4} sx={{ margin: "10px" }}>
        <TextField
          required
          id="outlined-required"
          label="Mobile Nuumber"
          size="small"
          onChange={(e) => handleChange(e?.target?.value || "", "mobileNumber")}
        />
      </Grid>
    </div>
  );
};

export default SignUp;
