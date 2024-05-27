import React from "react";
import { CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface BasicWidget1x1Props {
  title: string;
  color?: string;
  symbol: string;
  value: number;
}

const BasicWidget1x1: React.FC<BasicWidget1x1Props> = ({ title, color, symbol, value }) => {
  return (
    <CardContent
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        position: "relative",
      }}
    >
      <Box position="absolute" top={10} left={10}></Box>

      <Typography variant="h4" style={{ color: color ? color : "" }}>
        {symbol === "%" ? value + symbol : symbol + value}
      </Typography>
      <Typography variant="h5" style={{ textAlign: "center" }}>
        {title}
      </Typography>
    </CardContent>
  );
};

export default BasicWidget1x1;
