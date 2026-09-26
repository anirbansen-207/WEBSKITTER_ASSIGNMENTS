import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const About = () => {
  const features = [
    {
      icon: <DirectionsBusIcon />,
      title: "Bus Management",
      description:
        "Manage buses, routes, drivers, trips and travel schedules through one centralized system.",
    },
    {
      icon: <EventSeatIcon />,
      title: "Easy Seat Booking",
      description:
        "Customers can view available seats, select their preferred seats and complete their booking.",
    },
    {
      icon: <ConfirmationNumberIcon />,
      title: "Digital Tickets",
      description:
        "Generate tickets after successful booking and download them as convenient PDF documents.",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#f8fafc",
        minHeight: "calc(100vh - 72px)",
        py: {
          xs: 5,
          md: 8,
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Heading */}
        <Box
          sx={{
            textAlign: "center",
            maxWidth: 750,
            mx: "auto",
            mb: 7,
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "#f59e0b",
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            ABOUT OUR PLATFORM
          </Typography>

          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              mt: 1,
              fontSize: {
                xs: "2.3rem",
                md: "3.4rem",
              },
              color: "#08152f",
            }}
          >
            Shamolly Bus Service
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 2,
              fontSize: "1.08rem",
              lineHeight: 1.8,
            }}
          >
            A bus booking management system designed
            to manage trips, seats, bookings, passengers,
            tickets and different user roles from one
            platform.
          </Typography>
        </Box>

        {/* Features */}
        <Grid
          container
          spacing={3}
        >
          {features.map((feature) => (
            <Grid
              item
              xs={12}
              md={4}
              key={feature.title}
            >
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border:
                    "1px solid #e2e8f0",
                  transition:
                    "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform:
                      "translateY(-5px)",
                    boxShadow:
                      "0 15px 35px rgba(15,23,42,0.10)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 4,
                  }}
                >
                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: 2,
                      backgroundColor:
                        "#08152f",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                    }}
                  >
                    {feature.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                    color="#08152f"
                    mb={1}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    lineHeight={1.7}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About;