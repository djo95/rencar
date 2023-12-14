import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PropTypes from "prop-types";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function InputFileUpload(props) {
  const { handleChange, multiple } = props;
  return (
    <Button
      component="label"
      variant="contained"
      style={{ color: "white" }}
      fullWidth
      startIcon={<CloudUploadIcon />}
    >
      Upload images
      <VisuallyHiddenInput
        multiple={multiple}
        onChange={(e) => handleChange("images", e.target.files)}
        type="file"
      />
    </Button>
  );
}

InputFileUpload.propTypes = {
  handleChange: PropTypes.func,
  multiple: PropTypes.bool,
};
export default InputFileUpload;
