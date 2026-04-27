import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { useEffect, useState } from "react";
import { getContactList } from "../action/contact/action";
const ContactTable = ({ handleRowEdit, handleRowDelete, loading }) => {
  const [contacts, setContacts] = useState([]);
  const [dataFetching, setDataFetching] = useState(false);
  const sortBy = "id";
  const sortOrder = "asc";

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState([5, 10, 25]);

  useEffect(() => {
    const countRowsPerPage = () => {
      const options = [5, 10, 25];
      if (totalElements > 25) {
        options.push(totalElements);
      }
      setRowsPerPageOptions(options);
    }
    const fetchContacts = async () => {
      setDataFetching(true);
      // mock fetch delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const response = await getContactList(
          page,
          rowsPerPage,
          sortBy,
          sortOrder,
        );
        const { response: { payloadDto = [] } = {} } = response || {};
        const { response: { totalElements = 0 } = {} } = response || {};
        setTotalElements(totalElements || 0);
        setContacts(payloadDto || []);
        countRowsPerPage();
      } catch (error) {
        console.log(error);
      } finally {
        setDataFetching(false);
      }
    };
    fetchContacts();
  }, [loading, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer sx={{ maxWidth: 800 }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ width: "100%" }}>
            {dataFetching === false ? (
              contacts.length > 0 &&
              contacts.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    height: 10,
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.displayName}
                  </TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(e) => handleRowEdit(row)}
                      variant="outlined"
                      sx={{ mr: 1 }}
                    >
                      <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => handleRowDelete(row)}
                      variant="outlined"
                      color="error"
                    >
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                    <IconButton
                      variant="outlined"
                      color="primary"
                      sx={{ ml: 1 }}
                    >
                      <ChatOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalElements}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </TableContainer>
    </>
  );
};

ContactTable.propTypes = {
  handleRowEdit: PropTypes.func.isRequired,
  handleRowDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ContactTable;
