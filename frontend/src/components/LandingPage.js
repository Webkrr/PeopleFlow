import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const animationStyle = {
    animation: "dropDown 0.8s ease forwards",
    opacity: 0,
    "@keyframes dropDown": {
      "0%": { transform: "translateY(-20px)", opacity: 0 },
      "100%": { transform: "translateY(0)", opacity: 1 },
    },
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#111111", padding: "2rem 0" }}>
      <Container maxWidth="lg">
        {/* Welcome Header */}
        <Box
          sx={{
            ...animationStyle,
            textAlign: "center",
            marginBottom: "3rem",
            padding: "2rem",
            backgroundColor: "#3f51b5", /* Dark blue background */
            color: "#FFD700", /* Golden text */
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              marginBottom: "1rem",
              fontSize: isSmallScreen ? "2rem" : "clamp(2rem, 5vw, 3rem)",
            }}
          >
            Welcome to Employee Management System
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginBottom: "2rem",
              fontSize: isSmallScreen ? "1rem" : "clamp(1rem, 3vw, 1.5rem)",
            }}
          >
            A centralized solution for managing all your employee data efficiently and effectively.
          </Typography>
          <Button
            component={Link}
            to="/dashboard"
            variant="contained"
            sx={{
              backgroundColor: "#FFD700",  /* Gold button */
              color: "white",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#e0c400",  /* Darker gold on hover */
              },
            }}
          >
            Go to Dashboard
          </Button>
        </Box>

        {/* Features Section */}
        <Grid container spacing={4}>
          {[ 
            {
              title: "Manage Employees",
              desc: "Easily manage your employee records, track details, and maintain an up-to-date roster.",
              to: "/employees",
              button: "View Employees",
            },
            {
              title: "Track Departments",
              desc: "Organize your company’s structure with detailed information on each department.",
              to: "/departments",
              button: "View Departments",
            },
            {
              title: "Analyze Growth",
              desc: "Use our comprehensive dashboard to analyze employee growth and organizational structure.",
              to: "/dashboard",
              button: "Go to Dashboard",
            },
          ].map((feature) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <Card
                sx={{
                  ...animationStyle,
                  boxShadow: 3,
                  borderRadius: 2,
                  height: "100%",
                  backgroundColor: "#222222",  /* Dark background */
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, marginBottom: "1rem", color: "#FFD700" }} /* Golden text */
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
                    {feature.desc}
                  </Typography>
                  <Button
                    component={Link}
                    to={feature.to}
                    variant="contained"
                    sx={{
                      backgroundColor: "#3f51b5",
                      color: "white",
                      "&:hover": { backgroundColor: "#333f91" },
                    }}
                  >
                    {feature.button}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Info Section */}
        {[ 
          {
            title: "Why Choose Our System?",
            desc: "Our Employee Management System is designed to simplify HR processes, streamline department management, and provide valuable insights into your workforce. Start using it today and experience the difference!",
          },
          {
            title: "Learn More",
            desc: "Visit our documentation to learn more about the features, functionalities, and how to get started with our Employee Management System.",
            button: {
              label: "Documentation",
              href: "https://github.com/hoangsonww/Employee-Management-Fullstack-App",
            },
          },
        ].map((section) => (
          <Box
            key={section.title}
            sx={{
              ...animationStyle,
              marginTop: "4rem",
              padding: "2rem",
              textAlign: "center",
              backgroundColor: "#222222", /* Dark background */
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                marginBottom: "1rem",
                fontWeight: 600,
                color: "#FFD700", /* Golden text */
              }}
            >
              {section.title}
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: "800px", margin: "0 auto" }}>
              {section.desc}
            </Typography>
            {section.button && (
              <Button
                href={section.button.href}
                target="_blank"
                variant="contained"
                sx={{
                  backgroundColor: "#3f51b5",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  fontSize: "1rem",
                  fontWeight: 600,
                  marginTop: "1rem",
                  "&:hover": { backgroundColor: "#333f91" },
                }}
              >
                {section.button.label}
              </Button>
            )}
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default LandingPage;
