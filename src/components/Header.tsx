import { AppBar, Box, Toolbar } from "@mui/material";
import Image from "next/image";
import * as React from "react";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar sx={{ color: "primary.main" }}>
          <Box sx={{ alignItems: "center", py: 1 }}>
            <Image
              src="/assets/images/mtm.png"
              alt="MTM"
              width={120}
              height={24}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
