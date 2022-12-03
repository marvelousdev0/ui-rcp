import * as React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export type PageHeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export default function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" sx={{ boxShadow: "none" }}>
        <Toolbar sx={{ color: "primary.main" }}>
          <Box sx={{ height: 24, width: 24, mr: 2 }}>{children}</Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 700 }}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
