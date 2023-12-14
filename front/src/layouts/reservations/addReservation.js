import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDInput from "components/MDInput";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import * as Dialog from "@radix-ui/react-dialog";
import { element } from "prop-types";
import InputAdornment from "@mui/material/InputAdornment";
import InputFileUpload from "components/VisuallyHiddenInput/index";
import { useDispatch, useSelector } from "react-redux";
import { addCar, getAllCars } from "../../redux/actions/VoitureActions";
import { useNavigate } from "react-router-dom";
import { convertToBase64 } from "../../Helpers/utils";
import moment from "moment/moment";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getAllUsers } from "../../redux/actions/AuthActions";
import MDAvatar from "components/MDAvatar";
import { Box } from "@mui/material";
import { DateRange } from "react-date-range";
import Switch from "@mui/material/Switch";
import ModalNewUser from "components/modalNewUser";
const addReservation = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.VoitureReducer.isLoading);
  const [modeles, setModeles] = useState([]);
  const [prixVoiture, setPrixVoiture] = useState(0);
  const [typeIdentite, setTypeIdentite] = useState("");
  const [reservationDates, setReservationDates] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [reservation, setReservation] = useState({
    dateDebut: "",
    dateFin: "",
    owner: "",
    car: "",
    created_at: "",
    isCin: false,
    isPasseport: false,
  });
  const [listUsers, setListUsers] = useState([]);
  const [listCars, setListCars] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllCars());
  }, []);

  const users = useSelector((state) => state.AuthReducer.users);
  const cars = useSelector((state) => state.VoitureReducer.cars);

  useEffect(() => {
    const options = users.map((item, key) => {
      return { label: item.name, id: item._id };
    });

    setListUsers(options);
    setListCars(cars);
  }, [users, cars]);
  console.log(users);
  const handleChange = async (name, value) => {
    if (name === "dateReservation") {
      let dateDebut = moment(value.startDate).format("YYYY-MM-DD");
      let dateFin = moment(value.endDate).format("YYYY-MM-DD");
      console.log(dateDebut);
      console.log(dateFin);
      setReservation({ ...reservation, dateDebut: dateDebut, dateFin: dateFin });
    } else {
      setReservation({ ...reservation, [name]: value });
      console.log(
        Math.abs(
          moment
            .duration(
              moment(reservationDates[0].startDate).diff(moment(reservationDates[0].endDate))
            )
            .asDays()
        ) + 1
      );
    }
  };

  const handleChangeModal = () => {
    console.log(openModal);
    setOpenModal(!openModal);
  };

  const renderPrixTotal = () => {
    console.log(reservation.dateDebut);
    console.log(reservation.dateFin);

    let prix = 0;
    if (reservation.dateDebut.length > 1 && reservation.dateFin.length > 1) {
      let count =
        Math.abs(
          moment.duration(moment(reservation.dateDebut).diff(moment(reservation.dateFin))).asDays()
        ) + 1;

      prix = prixVoiture * count;

      console.log(prix.toString());

      return prix.toString();
    }

    return prix.toString();
  };

  const verifInput = () => {
    let result = false;
    let value = Object.values(voiture);
    if (value.some((element) => element.length == 0)) {
      result = true;
    }
    return result;
  };

  const ajouterVoiture = () => {
    let nVoiture = voiture;

    nVoiture.created_at = moment().format("YYYY-MM-DD").toString();

    dispatch(addCar(nVoiture, navigate));
  };

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
                  Ajouter une reservation
                </MDTypography>
              </MDBox>
              <MDBox m={4} px={7}>
                <Grid container spacing={5}>
                  <Grid item xs={6}>
                    <Autocomplete
                      onChange={(e, newValue) => {
                        handleChange("owner", newValue.id);
                      }}
                      disablePortal
                      id="combo-box-demo"
                      options={listUsers}
                      renderInput={(params, option) => <TextField {...params} label="Clients" />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      onChange={(e, newValue) => {
                        console.log(newValue);
                        handleChange("car", newValue._id);
                        setPrixVoiture(newValue.prix);
                      }}
                      groupBy={(option) => option.marque}
                      getOptionLabel={(option) => option.modele}
                      disablePortal
                      id="combo-box-demo"
                      options={listCars}
                      renderInput={(params) => <TextField {...params} label="les voitures" />}
                      renderOption={(props, option) => (
                        <Box component={"li"} {...props}>
                          <Grid container alignItems={"center"}>
                            <MDAvatar
                              item
                              src={option.images ? option.images[0] : null}
                              alt={option.modele}
                            />
                            <MDTypography item variant="h6">
                              {option.modele}
                            </MDTypography>
                          </Grid>
                        </Box>
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MDTypography variant="p" mb={1}>
                      Selectionnez votre date de debut et date de fin :
                    </MDTypography>
                    <DateRange
                      style={{ width: "100%" }}
                      className="calendarStyle"
                      editableDateInputs={true}
                      onChange={(item) => {
                        console.log(moment(item.selection.startDate).format("YYYY-MM-DD"));
                        handleChange("dateReservation", item.selection);

                        setReservationDates([item.selection]);
                      }}
                      moveRangeOnFirstSelection={false}
                      ranges={reservationDates}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MDTypography component="p">Ajouter votre carte d&apos;identité</MDTypography>
                    <FormControl fullWidth style={{ marginTop: 10 }}>
                      <InputLabel id="demo-simple-select-label">
                        Type de votre carte d&apos;identité
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Type de votre carte d'identité"
                        value={typeIdentite}
                        onChange={(e) => {
                          setTypeIdentite(e.target.value);
                        }}
                        style={{ minHeight: "3em" }}
                      >
                        <MenuItem value={"passport"}>Passeport</MenuItem>
                        <MenuItem value={"CIN"}>CIN</MenuItem>
                      </Select>
                    </FormControl>
                    {typeIdentite === "CIN" && (
                      <div style={{ marginTop: 10 }}>
                        <MDTypography variant={"subtitle2"}>
                          {"Carte d'identité (recto)"}
                        </MDTypography>
                        <InputFileUpload multiple handleChange={handleChange} />
                        <MDTypography variant={"subtitle2"}>
                          {"Carte d'identité (verso)"}
                        </MDTypography>
                        <InputFileUpload multiple handleChange={handleChange} />
                      </div>
                    )}
                    {typeIdentite === "passport" && (
                      <div style={{ marginTop: 10 }}>
                        <MDTypography variant={"subtitle2"}>{"Votre passport"}</MDTypography>
                        <InputFileUpload multiple handleChange={handleChange} />
                      </div>
                    )}
                    <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
                      <MDBox mt={0.5}>
                        <Switch onClick={() => handleChangeModal()} />
                      </MDBox>
                      <MDBox width="80%" ml={0.5}>
                        <MDTypography variant="button" fontWeight="regular" color="text">
                          Fraix d&apos;annulation
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox mx={2} mt={-3} py={3} px={2}>
                <MDBox display={"flex"} justifyContent={"end"}>
                  <MDTypography variant={"subtitle"}>
                    Prix Total: {renderPrixTotal() + " DT"}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <ModalNewUser
        open={openModal}
        handleChange={() => {
          setTimeout(() => {
            handleChangeModal(!openModal);
          }, 500);
        }}
      />
    </DashboardLayout>
  );
};

export default addReservation;
