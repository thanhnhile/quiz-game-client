import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const CustomParticipant = styled(Paper)(({ theme }) => ({
  minWidth: "120px",
  height: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 2,
  color: "#fff",
  backgroundColor: "#940B92",
  fontSize: "1.6rem",
  fontWeight: "700",
}));

const Participant = forwardRef((props: any, ref) => {
  const { name, ...otherProps } = props;
  return (
    <CustomParticipant {...otherProps} ref={ref}>
      <Typography variant="h4">{name}</Typography>
    </CustomParticipant>
  );
});

export default motion(Participant);
