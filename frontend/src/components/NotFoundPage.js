import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Container } from "@mui/material";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          textAlign: "center",
          paddingTop: "6rem",
          paddingBottom: "6rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h1"
          color="error"
          sx={{ fontWeight: 700, marginBottom: "1rem" }}
        >
          404
        </Typography>

        <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
          Oops! The page you’re looking for doesn’t exist.
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: "2rem", color: "text.secondary" }}>
          It seems the page you are trying to access is not available or you’ve typed the wrong URL.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          sx={{
            paddingX: "2rem",
            paddingY: "0.75rem",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
