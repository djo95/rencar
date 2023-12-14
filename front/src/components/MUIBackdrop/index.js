import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";

export default function MUIBackdrop({ isLoading }) {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

MUIBackdrop.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
