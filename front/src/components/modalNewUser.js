import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import MDInput from "./MDInput";
import { PhoneInput } from "react-international-phone";
import { Input, TextField } from "@mui/material";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import MDButton from "./MDButton";
import { useDispatch } from "react-redux";
import { addNewUser } from "../redux/actions/AuthActions";

function ModalNewUser(props) {
  const inputRef = React.useRef(null);
  const dispatch = useDispatch();

  const { handleChange, open } = props;
  const [newUser, setNewUser] = React.useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    photo: "",
    adresse: "",
    role: "",
  });
  const [country, setCountry] = React.useState("us");

  const [error, setError] = React.useState({
    name: false,
    email: false,
    adresse: false,
  });
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  function isValidName(name) {
    // Expression régulière pour vérifier si le nom commence par une majuscule suivie de minuscules
    const nameRegex = /^[A-Za-z]+$/;

    // Vérifie si le nom correspond à la regex

    return nameRegex.test(name.trim().replace(/\s+/g, ""));
  }
  React.useEffect(() => {
    console.log(open);
  }, [open]);

  const handleChangeUser = (name, value) => {
    console.log(value);
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddress = ({ description }) => {
    console.log(description);
    geocodeByAddress(description)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => console.log("Successfully got latitude and longitude", { lat, lng }))
      .catch((error) => console.error(error));
  };

  const handleSubmit = () => {
    let adresse = newUser.adresse.label;
    let nvUser = newUser;
    nvUser.adresse = adresse;
    dispatch(addNewUser(nvUser, handleChange));
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"lg"}
      open={open}
      onClose={handleChange}
      PaperProps={{
        sx: {
          minHeight: "60vh",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Ajouter un nouveau client
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handleChange()}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Grid container spacing={3} alignItems={"center"}>
          <Grid item xs={6}>
            <MDInput
              error={error.name}
              success={isValidName(newUser.name.trim())}
              label={"Nom et prenom"}
              fullWidth
              value={newUser.name}
              onChange={(e) => {
                handleChangeUser("name", e.target.value);
              }}
              inputProps={{
                onBlur: () => {
                  if (isValidName(newUser.name.trim())) {
                    setError({ ...error, name: false });
                  } else {
                    setError({ ...error, name: true });
                  }
                },
              }}
              type={"text"}
            ></MDInput>
          </Grid>
          <Grid item xs={6}>
            <MDInput
              error={error.email}
              success={isValidEmail(newUser.email)}
              value={newUser.email}
              onChange={(e) => {
                handleChangeUser("email", e.target.value);
              }}
              label={"Email"}
              fullWidth
              type={"email"}
              inputProps={{
                onBlur: () => {
                  if (!isValidEmail(newUser.email)) {
                    setError({ ...error, email: true });
                  }
                },
              }}
            ></MDInput>
          </Grid>
          <Grid item xs={6}>
            <GooglePlacesAutocomplete
              debounce={800}
              apiKey="AIzaSyCOoTCwp47sfDdAgh131ccBiv85YiWFfx0"
              onSelect={handleAddress}
              selectProps={{
                value: newUser.adresse,
                onChange: (e) => handleChangeUser("adresse", e),
              }}
              renderSuggestions={(active, suggestions, onSelectSuggestion) => (
                <div className="suggestions-container">
                  {suggestions.map((suggestion, key) => (
                    <div
                      key={key}
                      className="suggestion"
                      onClick={(event) => {
                        onSelectSuggestion(suggestion, event);
                      }}
                    >
                      {suggestion.description}
                    </div>
                  ))}
                </div>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <PhoneInput
              value={newUser.phone}
              defaultCountry="ua"
              onChange={(phone) => {
                handleChangeUser("phone", phone.toString());
              }}
              inputStyle={{ width: "100%" }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <MDButton
          onClick={() => {
            handleSubmit();
          }}
          color="secondary"
        >
          Ajouter
        </MDButton>
      </DialogActions>
    </Dialog>
  );
}
ModalNewUser.propTypes = {
  handleChange: PropTypes.func,
  open: PropTypes.bool,
};

export default ModalNewUser;
