import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

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

  return (
    <>
      <div
        className="sign-up"
        style={{
          height: "50vh",
          width: "30vw",
          backgroundColor: "lightblue",
          paddingTop: "1px",
          borderRadius: "10px",
        }}
      >
        <h2>Log In</h2>
        <Grid lg={12} md={6} sm={4} sx={{ margin: "10px" }}>
          <TextField
            required
            id="outlined-required"
            label="User Name"
            size="small"
            onChange={(e) => handleChange(e?.target?.value || "", "username")}
          />
        </Grid>
        <Grid sx={{ margin: "10px" }}>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            size="small"
            onChange={(e) => handleChange(e?.target?.value || "", "password")}
          />
        </Grid>
        <Grid>
          <Button variant="contained">LogIn</Button>
        </Grid>
        <Grid>
          <h6>{"Don't have an account?"}</h6>
          <Link to="/signup">Sign Up</Link>
        </Grid>
      </div>
    </>
  );
};

export default Login;
