import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";

// Data
import reservationTableData from "./data/reservationsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import { useNavigate } from "react-router-dom";

function Reservations() {
  const { columns, rows } = reservationTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <MDTypography variant="h6" color="white">
                  Les reservations
                </MDTypography>

                <MDButton
                  onClick={() => {
                    navigate("ajouter-reservation");
                  }}
                  variant="gradient"
                  color="secondary"
                >
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;Ajouter une nouvelle reservation
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          {/*<Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>*/}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Reservations;
