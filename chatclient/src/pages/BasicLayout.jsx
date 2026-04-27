/* eslint-disable react/prop-types */
import { Box} from "@mui/material";
import Layout from "./Layout";
import icon from "../assets/Blaze icon large.png";
import maleFigure from "../assets/Male figure.png";
import femaleFigure from "../assets/Female figure.png";

const BasicLayout = ({children}) => {
  return (
    <Layout>
      <Box display={"flex"} height={"100vh"} flexDirection={"column"}>
        <Box
          component="img"
          src={icon}
          alt="Blaze Logo"
          // flexShrink={"0"}
          sx={{
            minWidth: "120px",
            maxWidth: "10%",
            height: "auto",
            display: "block",
            marginLeft: "1%",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            width: "100%",
            // marginTop: "2%",
            gap: 3,
            justifyContent: "center",
          }}
        >
          <Box
            position={"relative"}
            sx={{ flex: 1 }}
            display={{xs: "none", sm: "flex"}}
            justifyContent={"flex-end"}
            pr={2}
          >
            <Box
              position={"absolute"}
              bottom={"30%"}
              height={"auto"}
              width={"32%"}
              component={"img"}
              src={femaleFigure}
              alt="female figure"
            ></Box>
          </Box>
          <Box 
          // mt={{xs: 1, md:0}}
           sx={{ flex: {xs: 0.8, sm: 2, md: 1.7, lg: 1}, display: "flex", justifyContent: "center" }}>
            {children}
          </Box>
          <Box
            sx={{ flex: 1 }}
            position={"relative"}
            display={{xs: "none", sm: "flex"}}
            justifyContent={"flex-start"}
            pl={2}
          >
            <Box
              position={"absolute"}
              bottom={"30%"}
              height={"auto"}
              width={"70%"}
              component={"img"}
              src={maleFigure}
              alt="male figure"
            ></Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default BasicLayout;
