import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

const SignUp = () => {

    const [formData, setFormData] = useState({})
    console.log({formData})

const handleChange = (value, target) => {
    setFormData((currentData = {}) => {
        let newData = {...currentData}
        newData[target] = value
        return newData
    })
}

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
        <h2>Sign Up</h2>
        <Grid lg={12} md={6} sm={4} sx={{ margin: "10px" }}>
          <TextField required id="outlined-required" label="User Name" size="small"
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
        <Grid sx={{ margin: "10px" }}>
          <TextField
            id="outlined-password-input2"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            size="small"
            onChange={((e) => handleChange(e?.target?.value || "", "confirmPassword"))}
          />
        </Grid>
        <Grid>
          <h6>
            By signing up you agree to our Terms of Service and Privacy Policy
          </h6>
          <Button variant="contained">Sign Up</Button>
        </Grid>
        <Grid>
          <h6>
            Already have an account? <a href="/login">Login</a>
          </h6>
        </Grid>
      </div>
    </>
  );
};

export default SignUp;
