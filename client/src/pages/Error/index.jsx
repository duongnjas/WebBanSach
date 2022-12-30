import React from 'react'
import { Box, Button, Container, Typography, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Error() {
    return (
        <>
        <Box
          component="main"
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
            minHeight: '100%', 
            marginTop:"3rem"
          }}
        >
          <Container maxWidth="md">
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography
                align="center"
                color="textPrimary"
                variant="h2"
              >
                404: The page you are looking for isn’t here
              </Typography>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  alt="Under development"
                  src="https://material-kit-react.devias.io/static/images/undraw_page_not_found_su7k.svg"
                  style={{
                    marginTop: 50,
                    display: 'inline-block',
                    maxWidth: '100%',
                    width: 560
                  }}
                />
              </Box>
              <Link
                href="/"
                passHref
              >
                <Button
                  component="a"
                  startIcon={(<ArrowBackIcon fontSize="small" />)}
                  sx={{ mt: 3 }}
                  variant="contained"
                >
                  Go back to Dashboard
                </Button>
              </Link>
            </Box>
          </Container>
        </Box>
        </>
    )
}
export default Error;