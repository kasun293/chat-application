// import { Box } from '@mui/material'
import { Box, Button, TextField, Typography } from "@mui/material";
import Layout from "../Layout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BasicLayout from "../BasicLayout";
import { login } from "../../action/login/action";
import { SnackBarTypes } from "../../components/SnackBar/SnackBarTypes";
import { useSnackBars } from "../../context/snackbars/useSnackBarHook";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../context/auth/useAuthHook";

const Login2 = () => {
  const USER_NAME = "username";
  const PASSWORD = "password";
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const { addSnackBar } = useSnackBars();
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { getUser, removeUser } = useUser();

  function validateMobileNumber(number) {
    const mobileNumberPattern = /^[0-9]{10}$/; // Example pattern for a 10-digit number
    return mobileNumberPattern.test(number);
  }

  function checkPassword(value) {
    if (value.length < 4) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [PASSWORD]: "Password must be at least 4 characters long.",
      }));
      return;
    } else {
      setErrors((currentErrors) => {
        const newErrors = { ...currentErrors };
        delete newErrors[PASSWORD];
        return newErrors;
      });
    }
  }

  function checkUsername(value) {
    if (!validateMobileNumber(value)) {
      // You can also set an error state here to display a message to the user
      setErrors((currentErrors) => ({
        ...currentErrors,
        [USER_NAME]: "Invalid mobile number. Please enter a 10-digit number.",
      }));
      return;
    } else {
      // Clear the error if the input is valid
      setErrors((currentErrors) => {
        const newErrors = { ...currentErrors };
        delete newErrors[USER_NAME];
        return newErrors;
      });
    }
  }

  const handleChange = (value, target) => {
    setFormData((currentData = {}) => {
      let newData = { ...currentData };
      newData[target] = value;
      if (target === USER_NAME) {
        checkUsername(newData[USER_NAME] || "");
      }
      if (target === PASSWORD) {
        checkPassword(newData[PASSWORD] || "");
      }
      return newData;
    });
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Login successful!",
    });
  };

  const onError = (message) => {
    removeUser();
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || "Login failed!",
    });
  };

  const handleLogin = async () => {
    try {
      const response = await login(formData, onSuccess, onError);
      if (response?.payload?.accessToken) {
        setToken(response.payload.accessToken);
        getUser();
        navigate("/chats");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <BasicLayout>
        <Box
          display={"flex"}
          flexDirection={"row"}
          width={"100%"}
          alignSelf={"center"}
        >
          <Box
            display="flex"
            flexDirection="column"
            backgroundColor="white"
            borderRadius={"1.5em"}
            width={"100%"}
            // height="50%"
            alignItems="center"
            padding={"15% 10% 15% 10%"}
          >
            <Typography
              // variant="h4"
              sx={{
                fontFamily: "Roboto",
                fontWeight: "700",
                textAlign: "center",
                color: "#1E1E1E",
                marginBottom: "15%",
                fontSize: "clamp(2em, 2vw, 3rem)",
              }}
            >
              Log In
            </Typography>
            <Box
              display={"flex"}
              flexDirection={"column"}
              marginBottom={3}
              width={"100%"}
            >
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontWeight: 400,
                  fontStyle: "Regular",
                  fontSize: "clamp(0.8em, 0.8vw, 2rem)",
                  color: "#1E1E1E",
                }}
              >
                Mobile number
              </Typography>
              <TextField
                sx={{ width: "100%" }}
                required
                id="outlined-required"
                // label="User Name"
                size="small"
                error={!!errors[USER_NAME]}
                helperText={errors[USER_NAME] || ""}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", USER_NAME)
                }
              />
            </Box>

            <Box display={"flex"} flexDirection={"column"} width={"100%"}>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontWeight: 400,
                  fontStyle: "Regular",
                  fontSize: "clamp(0.8em, 0.8vw, 2rem)",
                  color: "#1E1E1E",
                }}
              >
                Password
              </Typography>
              <TextField
                sx={{ width: "100%" }}
                required
                id="outlined-required"
                // label="Password"
                error={!!errors[PASSWORD]}
                helperText={errors[PASSWORD] || ""}
                type="password"
                size="small"
                onChange={(e) => handleChange(e?.target?.value || "", PASSWORD)}
              />
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              width={"100%"}
              marginTop={2}
              alignItems="flex-end"
            >
              <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                <Typography
                  onClick={() => {
                    console.log("button clicked");
                  }}
                  variant="body2"
                  color={"#5763FF"}
                >
                  Forgot password?
                </Typography>
              </Link>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              width={"100%"}
              marginTop={5}
              alignItems="flex-end"
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#5763FF",
                  width: "100%",
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  fontSize: "clamp(0.8em, 0.8vw, 2rem)",
                  textTransform: "capitalize",
                }}
                disabled={
                  Object.keys(errors).length > 0 ||
                  !formData[USER_NAME] ||
                  !formData[PASSWORD]
                }
                onClick={handleLogin}
              >
                Log In
              </Button>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              width={"100%"}
              marginTop={4}
              justifyContent={"center"}
            >
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontWeight: 400,
                  fontStyle: "Regular",
                  fontSize: "clamp(0.8em, 0.8vw, 2rem)",
                  color: "#1E1E1E",
                }}
              >
                Don&apos;t have an account?
              </Typography>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontWeight: 400,
                    fontStyle: "Regular",
                    fontSize: "clamp(0.8em, 0.8vw, 2rem)",
                    color: "#5763FF",
                  }}
                >
                  &nbsp;Sign Up
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </BasicLayout>
    </Layout>
  );
};

export default Login2;
