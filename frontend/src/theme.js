import React, { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import {amber, blue, blueGrey, deepOrange, green, lightGreen, orange} from "@material-ui/core/colors";

const defaultTheme = {
  palette: {
    primary: orange,
    secondary: amber, //ss,
    //type: "dark",
  },
  typography: {
    fontFamily: "'Oxanium', cursive;",
  },
  status: {
    danger: "red",
  },
};

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState({
    palette: {
      primary: orange,
      secondary: amber,
    },
  });
  const muiTheme = createMuiTheme({
    ...defaultTheme,
    ...currentTheme,
  });
  return [muiTheme, setCurrentTheme];
}
