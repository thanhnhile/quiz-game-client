import { Participant } from "@utils/interface";
import lottie from "lottie-web";
import * as podiumAnimationData from "@utils/lottie/podium.json";
import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box/Box";
import { Typography } from "@mui/material";
import { log } from "console";

const textCSSProps = {
  width: "76px",
  backgroundColor: "red",
  textAlign: "center",
  position: "absolute",
  fontSize: "2.5rem",
  fontWeight: "700",
  color: "#fff",
};

const Podium = ({ top3 }: { top3: Participant[] }) => {
  const [showName, setShowName] = useState(false);
  const lottieAnimation = useRef(null);

  //console.log(lottieAnimation.current.renderer.elements);

  const reloadAnimation = () => {
    lottieAnimation.current?.destroy();
    lottieAnimation.current = lottie.loadAnimation({
      container: document.getElementById("animation"),
      autoplay: true,
      loop: false,
      renderer: "svg",
      animationData: lottieAnimation.current.animationData,
    });
  };

  useEffect(() => {
    if (!lottieAnimation.current) {
      lottieAnimation.current = lottie.loadAnimation({
        container: document.getElementById("animation"),
        renderer: "svg",
        autoplay: true,
        loop: false,
        animationData: podiumAnimationData,
        rendererSettings: {
          progressiveLoad: true,
          preserveAspectRatio: "xMidYMid meet",
          imagePreserveAspectRatio: "xMidYMid meet",
        },
      });
      console.log(lottieAnimation.current.animationData);
      lottieAnimation.current.addEventListener("complete", () =>
        setShowName(true)
      );
    }
  }, []);

  const items = [
    {
      css: {
        top: "22%",
        left: "46%",
      },
      name: top3?.[0]?.name,
    },
    {
      css: {
        top: "59%",
        left: "30%",
      },
      name: top3?.[1]?.name,
    },
    {
      css: {
        top: "62%",
        right: "31%",
      },
      name: top3?.[2]?.name,
    },
  ];
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", position: "relative" }}
    >
      <Box sx={{ width: "50%" }} id='animation'></Box>
      {items.map((item) => (
        <Box
          sx={{
            ...textCSSProps,
            ...item.css,
            visibility: showName ? "visible" : "hidden",
          }}
        >
          {item.name}
        </Box>
      ))}
    </Box>
  );
};

export default Podium;
