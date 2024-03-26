import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";

type SeverityType = "success" | "info" | "error" | "warning";

const colorsMap = {
  success: "green",
  info: "blue",
  error: "red",
  warning: "yellow",
};

const CustomProgress = styled("div")({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: "3px",
  height: "10px",
  backgroundColor: "currentColor",
});

const MotionDiv = motion(CustomProgress);

const Toast = (
  props: any & {
    message: string;
    duration: number;
    severity: SeverityType;
  }
) => {
  const { message, duration, severity } = props;
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={true}
      autoHideDuration={duration}
      disableWindowBlurListener={true}
      sx={{
        position: "absolute",
        color: colorsMap[severity as keyof typeof colorsMap],
      }}
    >
      <Alert
        severity={severity}
        variant="outlined"
        sx={{
          width: "100%",
          maxHeight: "10vh",
          minWidth: "300px",
          backgroundColor: "#333333",
          borderBottom: "10px solid transparent",
          color: "#fff",
          fontSize: "1.6rem",
        }}
      >
        {message}
        {/* <MotionDiv /> */}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
