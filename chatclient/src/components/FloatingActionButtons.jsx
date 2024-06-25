import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

// eslint-disable-next-line react/prop-types
export default function FloatingActionButtons({ title, onClick }) {
  return (
    <Box onClick={onClick} sx={{ "& > :not(style)": { m: 1 }, position: "absolute", right: "10px", bottom: "10px" }}>
      <Fab variant="extended">
        <AddIcon sx={{ mr: 1 }} />
        {title}
      </Fab>
    </Box>
  );
}
