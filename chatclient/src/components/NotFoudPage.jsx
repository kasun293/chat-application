import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function NotFoudPage() {
  return (
    <Box
        display={"grid"}
        alignContent={"center"}
        justifyItems={"center"}
        width={"100vw"}
        height={"100vh"}
      >
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h3" color={"black"} component="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" color={"black"}  gutterBottom>
        The page you are looking for does not exist.
      </Typography>
        <Link to="/">Home</Link>
    </Box>
    </Box>
  )
}

export default NotFoudPage