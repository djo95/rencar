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
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";

function ModalNewUser(props) {
  const inputRef = React.useRef(null);

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

  const { ref } = usePlacesWidget({
    apiKey: "AIzaSyCOoTCwp47sfDdAgh131ccBiv85YiWFfx0",
    onPlaceSelected: (place) => console.log(place),
    options: {
      fields: ["ALL"],
    },
  });
  return (
    <React.Fragment>
      <Dialog fullWidth maxWidth={"lg"} open={open} onClose={handleChange}>
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
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <MDInput
                error={error.name}
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
              <TextField fullWidth color="secondary" variant="outlined" inputRef={ref} />
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
          <Button autoFocus>Save changes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
ModalNewUser.propTypes = {
  handleChange: PropTypes.func,
  open: PropTypes.bool,
};

export default ModalNewUser;
