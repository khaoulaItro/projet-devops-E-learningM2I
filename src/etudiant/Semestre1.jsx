import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar2";
import Topbar from "../etudiant/topBar";
import {
  Tabs,
  Tab,
  Button,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TablePagination,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import CustomDownloadIcon from "@mui/icons-material/GetApp";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ComputerIcon from "@mui/icons-material/Computer";
import "./Dashboard.css";

function Dashboard() {
  const [cours, setCours] = useState([]);
  const [td, setTd] = useState([]);
  const [tp, setTp] = useState([]);
  const [coursSearch, setCoursSearch] = useState("");
  const [coursPage, setCoursPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [activeTab, setActiveTab] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursResponse = await axios.get(
          "http://localhost:8082/api/supports/type/COUR/semester/S1"
        );
        const tdResponse = await axios.get(
          "http://localhost:8082/api/supports/type/TD/semester/S1"
        );
        const tpResponse = await axios.get(
          "http://localhost:8082/api/supports/type/TP/semester/S1"
        );

        if (coursResponse.data) setCours(coursResponse.data);
        if (tdResponse.data) setTd(tdResponse.data);
        if (tpResponse.data) setTp(tpResponse.data);
      } catch (err) {
        setSnackbarMessage("Erreur lors de la récupération des données");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };

    fetchData();
  }, []);

  const filteredData = {
    cours: cours.filter((item) =>
      item.nomModule.toLowerCase().includes(coursSearch.toLowerCase())
    ),
    td: td.filter((item) =>
      item.nomModule.toLowerCase().includes(coursSearch.toLowerCase())
    ),
    tp: tp.filter((item) =>
      item.nomModule.toLowerCase().includes(coursSearch.toLowerCase())
    ),
  };

  const paginatedData = filteredData[["cours", "td", "tp"][activeTab]].slice(
    coursPage * rowsPerPage,
    (coursPage + 1) * rowsPerPage
  );

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setCoursSearch("");
    setCoursPage(0);
  };

  const handleCoursPageChange = (event, newPage) => {
    setCoursPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCoursPage(0);
  };

  const handleDownloadClick = async (id, fileName) => {
    setSnackbarMessage("Téléchargement en cours...");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);

    try {
      const response = await axios.get(
        `http://localhost:8082/api/supports/download/${id}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName || "file.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSnackbarMessage("Téléchargement réussi !");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      setSnackbarMessage("Erreur lors du téléchargement. Veuillez réessayer.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleViewClick = (url) => {
    if (url) {
      // Ouvre le fichier PDF dans un nouvel onglet
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      setSnackbarMessage("URL non disponible pour ce fichier.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="container-fluid p-0">
      <Topbar />
      <div className="row no-gutters">
        <div
          className="col-md-2 col-12 position-fixed"
          style={{ height: "100vh", top: 0, left: 0, zIndex: 1000 }}
        >
          <Sidebar />
        </div>

        <div className="col-md-10 offset-md-2 col-12">
          <Box
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <Box
              className="table-card"
              sx={{
                width: "900px",
                maxHeight: "550px",
                borderRadius: "10px",
                padding: "30px",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.6)",
                backgroundColor: "#ffffff",
                border: "1px solid #ddd",
              }}
            >
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                sx={{
                  marginBottom: "20px",
                  "& .MuiTabs-flexContainer": { gap: "20px" },
                }}
              >
                <Tab
                  label="Cours"
                  icon={<SchoolIcon />}
                  iconPosition="start"
                  sx={{ minWidth: "120px" }}
                />
                <Tab
                  label="TD"
                  icon={<AssignmentIcon />}
                  iconPosition="start"
                  sx={{ minWidth: "120px" }}
                />
                <Tab
                  label="TP"
                  icon={<ComputerIcon />}
                  iconPosition="start"
                  sx={{ minWidth: "120px" }}
                />
              </Tabs>

              <TextField
                placeholder="Chercher..."
                variant="standard"
                value={coursSearch}
                onChange={(e) => setCoursSearch(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: "100%",
                  borderBottom: "2px solid gray",
                  "& input": { padding: "5px 10px" },
                  "&:hover": { borderBottom: "2px solid white" },
                }}
              />

              <List>
                {paginatedData.map((item, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="text"
                          startIcon={<CustomDownloadIcon />}
                          onClick={() =>
                            handleDownloadClick(item.id, item.nomModule)
                          }
                        >
                          Télécharger
                        </Button>
                        <Button
                          variant="text"
                          endIcon={<VisibilityIcon />}
                          onClick={() => handleViewClick(item.fichierUrl)}
                        >
                          Voir
                        </Button>
                      </Stack>
                    }
                  >
                    <ListItemText primary={item.nomModule} />
                  </ListItem>
                ))}
              </List>

              <TablePagination
                component="div"
                count={filteredData[["cours", "td", "tp"][activeTab]].length}
                page={coursPage}
                onPageChange={handleCoursPageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                labelRowsPerPage="Lignes par page"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} sur ${count}`
                }
              />
            </Box>
          </Box>
        </div>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Dashboard;
