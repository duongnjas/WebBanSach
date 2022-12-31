import React from 'react'
import {
  Stack,
  Button,
  Typography
} from "@mui/material";

function EmptyNotify(props) { //icon empty
  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: "400px",
      }}
      justifyContent="center"
      alignItems="center"
      p="2rem"
    >
      <img
        width="200px" height="200px"
        alt=""
        src="https://cdn-icons-png.flaticon.com/512/782/782763.png"
      />
      <Typography variant="body1">{props.title}</Typography>

      <Button variant="contained" color="warning">
        Tiếp tục mua sắm
      </Button>
    </Stack>
  )
}

export default EmptyNotify;

