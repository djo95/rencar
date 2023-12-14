/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import react from "react";
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../../../redux/actions/VoitureActions";
import { useEffect } from "react";
export default function data() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("work");
    dispatch(getAllCars());
  }, []);
  const rows = useSelector((state) => state.VoitureReducer.cars);
  console.log(rows);

  const Author = ({ image, marque, modele }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={marque} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {marque}
        </MDTypography>
        <MDTypography variant="caption">{modele}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "voiture", accessor: "voiture", width: "45%", align: "left" },
      { Header: "serie", accessor: "serie", align: "left" },
      { Header: "disponibilité", accessor: "disponibilite", align: "center" },
      { Header: "date", accessor: "date", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: rows.map((item, key) => ({
      voiture: (
        <Author
          image={item.images ? item.images[0] : null}
          marque={item.marque}
          modele={item.modele}
        />
      ),
      serie: <Job title={item.serie + " TN " + item.orderV} />,
      disponibilite: (
        <MDBox ml={-1}>
          <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
        </MDBox>
      ),
      date: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          23/04/18
        </MDTypography>
      ),
      action: (
        <MDTypography
          component="a"
          href={"/voitures/edit/" + item._id}
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          Edit
        </MDTypography>
      ),
    })),
  };
}
