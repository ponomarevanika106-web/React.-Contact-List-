
import { useDispatch } from "react-redux";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import {
  removeContact,
  setCurrentContact,
} from "../../store/contactsSlice";

const avatarColors = [
  "#5965e8",
  "#438de8",
  "#30a783",
  "#f2a52e",
  "#e95780",
];

export default function ContactItem({ contact }) {
  const dispatch = useDispatch();

  const initials = `${contact.firstName?.[0] || ""}${
    contact.lastName?.[0] || ""
  }`.toUpperCase();

  const colorIndex =
    [...String(contact.id)].reduce(
      (sum, char) => sum + char.charCodeAt(0),
      0
    ) % avatarColors.length;

  return (
    <Box
      onDoubleClick={() => dispatch(setCurrentContact(contact))}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 1.5,
        border: "1px solid #e8edf7",
        borderRadius: 3,
        bgcolor: "#fff",
        cursor: "pointer",
        transition: "all 0.2s ease",
        "&:hover": {
          borderColor: "#bfc8ff",
          bgcolor: "#f8f9ff",
          transform: "translateY(-1px)",
          boxShadow: "0 5px 16px rgba(50, 65, 120, 0.06)",
        },
      }}
    >
      <Avatar
        sx={{
          width: 52,
          height: 52,
          flexShrink: 0,
          bgcolor: avatarColors[colorIndex],
          fontWeight: 700,
        }}
      >
        {initials}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          fontWeight={700}
          color="#233252"
          noWrap
        >
          {contact.firstName} {contact.lastName}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          spacing={0.75}
          sx={{ mt: 0.75, minWidth: 0 }}
        >
          <EmailOutlinedIcon
            sx={{ fontSize: 16, color: "#8190b1", flexShrink: 0 }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
          >
            {contact.email}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          spacing={0.75}
          sx={{ mt: 0.5, minWidth: 0 }}
        >
          <PhoneOutlinedIcon
            sx={{ fontSize: 16, color: "#8190b1", flexShrink: 0 }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
          >
            {contact.phone}
          </Typography>
        </Stack>
      </Box>

      <Stack direction="row" spacing={0.25}>
        <Tooltip title="Edit contact">
          <IconButton
            aria-label="Edit contact"
            size="small"
            onClick={() => dispatch(setCurrentContact(contact))}
            sx={{
              color: "#64789e",
              bgcolor: "#f0f3fa",
              "&:hover": {
                bgcolor: "#e0e7ff",
                color: "#5965e8",
              },
            }}
          >
            <EditRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete contact">
          <IconButton
            aria-label="Delete contact"
            size="small"
            onClick={(event) => {
              event.stopPropagation();
              dispatch(removeContact(contact.id));
            }}
            sx={{
              color: "#e45d68",
              bgcolor: "#fff0f1",
              "&:hover": { bgcolor: "#ffe0e3" },
            }}
          >
            <DeleteOutlineRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}


