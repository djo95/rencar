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
import cars from "./data/car-list.json";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { element } from "prop-types";
import InputAdornment from "@mui/material/InputAdornment";
import InputFileUpload from "components/VisuallyHiddenInput/index";
import { useDispatch, useSelector } from "react-redux";
import { addCar, getOneCar, updateCar } from "../../redux/actions/VoitureActions";
import { useNavigate, useParams } from "react-router-dom";
import { convertToBase64 } from "../../Helpers/utils";
import moment from "moment";
const EditVoiture = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isLoading = useSelector((state) => state.VoitureReducer.isLoading);
  const [serie, setSerie] = useState(0);
  const [orderV, setOrderV] = useState(0);

  const [voiture, setVoiture] = useState({});

  useEffect(() => {
    dispatch(getOneCar(id));
  }, []);

  const oldVoiture = useSelector((state) => state.VoitureReducer.oneCar);
  console.log(oldVoiture);
  useEffect(() => {
    setVoiture(oldVoiture);
  }, [oldVoiture]);

  const RenderModeles = (brand) => {
    let modeles = cars.find((element) => element.brand === brand).models;
    return (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Marque</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={voiture.modele}
          label="Modele"
          onChange={(e) => handleChange("modele", e.target.value)}
          style={{ minHeight: "3em" }}
        >
          {modeles.map((item, key) => (
            <MenuItem value={item} key={key}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const handleChange = async (name, value) => {
    if (name === "images") {
      let arr = voiture.images;
      let newImages = await Promise.all(
        Object.values(value).map(async (item, key) => {
          const img = await convertToBase64(item);
          return img;
        })
      );
      console.log(newImages);
      arr = [...arr, ...newImages];
      setVoiture({ ...voiture, images: arr });
    } else {
      setVoiture({ ...voiture, [name]: value });
    }

    setTimeout(() => {
      console.log(voiture);
    }, 5000);
  };

  const verifInput = () => {
    let result = true;
    let value = Array.isArray(Object.values(voiture)) || [];
    if (!(Array.isArray(value) && value.some((element) => element.length == 0))) {
      result = false;
    }
    return result;
  };

  const EditVoiture = () => {
    let nVoiture = voiture;

    nVoiture.created_at = moment().format("YYYY-MM-DD").toString();

    dispatch(updateCar(nVoiture, nVoiture._id, navigate));
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        {voiture.marque && (
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
                    Modifier une voiture
                  </MDTypography>
                </MDBox>
                <MDBox m={6} px={7}>
                  <Grid container spacing={5}>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Marque</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={voiture.marque ? voiture.marque : null}
                          label="Marque"
                          onChange={(e) => handleChange("marque", e.target.value)}
                          style={{ minHeight: "3em" }}
                        >
                          {cars.map((item, key) => (
                            <MenuItem value={item.brand} key={key}>
                              {item.brand}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      {voiture.marque && RenderModeles(voiture.marque)}
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type de boite</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={voiture.typeBoite}
                          label="Type de boite"
                          onChange={(e) => handleChange("typeBoite", e.target.value)}
                          style={{ minHeight: "3em" }}
                        >
                          <MenuItem value={"Manuelle"}>Manuelle</MenuItem>
                          <MenuItem value={"Automatique"}>Automatique</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Carburant</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={voiture.carburant}
                          label="Carburant"
                          onChange={(e) => handleChange("carburant", e.target.value)}
                          style={{ minHeight: "3em" }}
                        >
                          <MenuItem value={"Essence"}>Essence</MenuItem>
                          <MenuItem value={"Gazoil"}>Gazoil</MenuItem>
                          <MenuItem value={"Electrique"}>Electrique</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                      <MDInput
                        label="Puissance fiscal"
                        type="number"
                        fullWidth
                        value={voiture.puissanceF}
                        onChange={(e) =>
                          handleChange("puissanceF", e.target.value > 0 ? e.target.value : 0)
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <MDTypography variant="h6" color="black">
                                CH
                              </MDTypography>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Grid alignItems={"center"} container spacing={1}>
                        <Grid item md={4} xs={4}>
                          <MDInput
                            label="serie"
                            type="number"
                            value={voiture.serie}
                            onChange={(e) =>
                              handleChange("serie", e.target.value > 0 ? e.target.value : 0)
                            }
                          />
                        </Grid>
                        <Grid textAlign="center" item md={2} xs={2}>
                          <MDTypography variant="h6" color="black">
                            TN
                          </MDTypography>
                        </Grid>
                        <Grid item md={4} xs={4}>
                          <MDInput
                            label="ordre voiture"
                            type="number"
                            fullWidth
                            value={voiture.orderV}
                            onChange={(e) =>
                              handleChange(
                                "orderV",
                                e.target.value > 0 && e.target.value < 10000
                                  ? e.target.value
                                  : e.target.value > 10000
                                  ? 10000
                                  : 0
                              )
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <MDInput
                        label="Annee"
                        type="number"
                        fullWidth
                        value={voiture.annee}
                        onChange={(e) =>
                          handleChange("annee", e.target.value > 2010 ? e.target.value : 2010)
                        }
                        InputProps={{ defaultValue: 2010 }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputFileUpload multiple handleChange={handleChange} />

                      <Grid container spacing={1} mt={1}>
                        {voiture.images &&
                          voiture.images.map((item, key) => (
                            <Grid item xs={12} md={6} key={key}>
                              <img
                                style={{ aspectRatio: "auto", width: "100%" }}
                                src={item}
                                key={key}
                              />
                            </Grid>
                          ))}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    alignItems={"center"}
                    justifyContent={"end"}
                    mt={5}
                    columnSpacing={2}
                  >
                    <Grid item>
                      <MDButton variant="gradient" color="dark">
                        Annuler
                      </MDButton>
                    </Grid>
                    <Grid item>
                      <MDButton
                        onClick={EditVoiture}
                        variant="gradient"
                        color="info"
                        disabled={verifInput()}
                      >
                        Modifier
                      </MDButton>
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        )}
      </MDBox>
    </DashboardLayout>
  );
};

export default EditVoiture;
