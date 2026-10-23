
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import { fetchContacts } from "./store/contactsSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 5% 0%, #e5e9ff 0, transparent 30%), #f5f7fc",
        py: { xs: 3, md: 6 },
      }}
    >
      <Container maxWidth="xl">
        <Stack alignItems="center" spacing={1} sx={{ mb: 5 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Avatar
              variant="rounded"
              sx={{
                width: 56,
                height: 56,
                borderRadius: 3,
                bgcolor: "#5965e8",
                boxShadow: "0 8px 20px #5965e833",
              }}
            >
              <PeopleAltRoundedIcon fontSize="large" />
            </Avatar>

            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                color: "#172747",
                letterSpacing: "-1.5px",
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Contact List
            </Typography>
          </Stack>

          <Typography
            color="text.secondary"
            textAlign="center"
          >
            Keep your contacts organized and always close.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              md: "minmax(0, 1fr) minmax(0, 1fr)",
            },
            gap: { xs: 3, md: 4 },
            alignItems: "stretch",
          }}
        >
          <ContactList />
          <ContactForm />
        </Box>
      </Container>
    </Box>
  );
}

