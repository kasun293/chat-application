import { Box, Button, TextField, Typography } from "@mui/material";
import BasicLayout from "../BasicLayout";
import Layout from "../Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../action/login/action";
import { SnackBarTypes } from "../../components/SnackBar/SnackBarTypes";
import { useSnackBars } from "../../context/snackbars/useSnackBarHook";

const SignUp2 = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { addSnackBar } = useSnackBars();

  const handleChange = (value, target) => {
    setFormData((currentData = {}) => {
      let newData = { ...currentData };
      newData[target] = value;
      return newData;
    });
  };
  console.log(formData);

    const onSuccess = () => {
      navigate("/");
      addSnackBar({
        type: SnackBarTypes.success,
        message: "Sign up successful!",
      });
    };
  
    const onError = (message) => {
      addSnackBar({
        type: SnackBarTypes.error,
        message: message || "Sign up failed!",
      });
    };

  const handleSignUp = async () => {
    console.log("sign up clicked");
    try {
      await signUp(formData, onSuccess, onError);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout>
      <BasicLayout>
        <Box display={"flex"} flexDirection={"row"} width={"100%"} mb={"auto"}>
          <Box
            display="flex"
            flexDirection="column"
            backgroundColor="white"
            borderRadius={"20px"}
            width={"100%"}
            // height="100%"
            alignItems="center"
            padding={"15% 10% 15% 10%"}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Roboto",
                fontWeight: "700",
                textAlign: "center",
                color: "#1E1E1E",
                marginBottom: "15%",
                fontSize: "clamp(2em, 2vw, 3rem)",
              }}
            >
              Sign Up
            </Typography>
            <Box
              display={"flex"}
              flexDirection={"column"}
              marginBottom={{ xs: 1, md: 3 }}
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
                Display Name
              </Typography>
              <TextField
                sx={{ width: "100%" }}
                required
                id="outlined-required"
                // label="User Name"
                size="small"
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "displayName")
                }
              />
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              marginBottom={{ xs: 1, md: 3 }}
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
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "userName")
                }
              />
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              marginBottom={{ xs: 1, md: 3 }}
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
                Passward
              </Typography>
              <TextField
                sx={{ width: "100%" }}
                required
                id="outlined-required"
                // label="User Name"
                size="small"
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "password")
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
                Confirm Passward
              </Typography>
              <TextField
                sx={{ width: "100%" }}
                required
                id="outlined-required"
                // label="Password"
                size="small"
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "confirmPassword")
                }
              />
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              width={"100%"}
              marginTop={{ xs: 3, sm: 3, md: 5 }}
              alignItems="flex-end"
            >
              <Button
                variant="contained"
                onClick={handleSignUp}
                sx={{
                  backgroundColor: "#5763FF",
                  width: "100%",
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  fontSize: "clamp(0.8em, 0.8vw, 2rem)",
                  textTransform: "capitalize",
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Box>
      </BasicLayout>
    </Layout>
  );
};

export default SignUp2;
