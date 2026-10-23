
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ContactItem from "../ContactItem/ContactItem";

export default function ContactList() {
  const contacts = useSelector(
    (state) => state.contacts.contacts
  );

  const [search, setSearch] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    [
      contact.firstName,
      contact.lastName,
      contact.email,
      contact.phone,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        border: "1px solid #e8ebf5",
        borderRadius: 4,
        boxShadow: "0 12px 35px rgba(35, 49, 90, 0.05)",
        minWidth: 0,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={800}
            color="#172747"
          >
            Contacts
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Total contacts: {contacts.length}
          </Typography>
        </Box>

        <TextField
          size="small"
          placeholder="Search contacts..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          sx={{
            width: { xs: "100%", sm: 230 },
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              bgcolor: "#fafbff",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon color="action" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      <Stack spacing={1.5}>
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
            />
          ))
        ) : (
          <Box
            sx={{
              py: 6,
              px: 2,
              textAlign: "center",
              border: "1px dashed #d8deef",
              borderRadius: 3,
              bgcolor: "#fafbff",
            }}
          >
            <SearchRoundedIcon
              sx={{ fontSize: 38, color: "#a5aec5", mb: 1 }}
            />
            <Typography fontWeight={600}>
              {contacts.length === 0
                ? "No contacts yet"
                : "No contacts found"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {contacts.length === 0
                ? "Add your first contact using the form."
                : "Try another name, email or phone number."}
            </Typography>
          </Box>
        )}
      </Stack>
    </Paper>
  );
}

