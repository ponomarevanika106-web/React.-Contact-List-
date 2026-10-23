
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import {
  Alert,
  Avatar,
  Box,
  Button,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import {
  addContact,
  editContact,
  removeContact,
  newContact,
} from "../../store/contactsSlice";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .required("First name is required")
    .max(50, "Maximum 50 characters"),
  lastName: Yup.string()
    .trim()
    .required("Last name is required")
    .max(50, "Maximum 50 characters"),
  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .trim()
    .required("Phone is required")
    .matches(
      /^\+?[0-9\s()-]+$/,
      "Enter a valid phone number"
    )
    .test(
      "phone-length",
      "Phone must contain 7–15 digits",
      (value) => {
        const digits = (value || "").replace(/\D/g, "");
        return digits.length >= 7 && digits.length <= 15;
      }
    ),
});

const fields = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Enter first name",
    icon: <PersonOutlineRoundedIcon />,
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter last name",
    icon: <PersonOutlineRoundedIcon />,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "name@example.com",
    type: "email",
    icon: <EmailOutlinedIcon />,
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "+1 234 567 8901",
    type: "tel",
    icon: <PhoneIphoneRoundedIcon />,
  },
];

export default function ContactForm() {
  const dispatch = useDispatch();

  const contact = useSelector(
    (state) => state.contacts.currentContact
  );

  const [requestError, setRequestError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: contact.firstName ?? "",
      lastName: contact.lastName ?? "",
      email: contact.email ?? "",
      phone: contact.phone ?? "",
    },
    enableReinitialize: true,
    validationSchema,
    validateOnMount: true,
    onSubmit: async (values, { setSubmitting }) => {
      setRequestError("");
      setSuccessMessage("");

      const contactData = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
      };

      try {
        if (contact.id) {
          await dispatch(
            editContact({
              ...contactData,
              id: contact.id,
            })
          ).unwrap();

          setSuccessMessage("Contact updated successfully.");
        } else {
          await dispatch(
            addContact({
              ...contactData,
              id: uuidv4(),
            })
          ).unwrap();

          dispatch(newContact());
          setSuccessMessage("Contact added successfully.");
        }
      } catch (error) {
        setRequestError(
          typeof error === "string"
            ? error
            : error?.message || "Unable to save contact. Try again."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleNew = () => {
    setRequestError("");
    setSuccessMessage("");
    dispatch(newContact());
  };

  const handleDelete = async () => {
    if (!contact.id) return;

    setRequestError("");
    setSuccessMessage("");

    try {
      await dispatch(removeContact(contact.id)).unwrap();
      setSuccessMessage("Contact deleted successfully.");
    } catch (error) {
      setRequestError(
        typeof error === "string"
          ? error
          : error?.message || "Unable to delete contact. Try again."
      );
    }
  };

  const handleClear = (name) => {
    formik.setFieldValue(name, "");
    formik.setFieldTouched(name, true, false);
    setSuccessMessage("");
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        minWidth: 0,
        overflow: "hidden",
        borderRadius: 4,
        border: "1px solid #e8ebf5",
        boxShadow: "0 12px 35px rgba(35, 49, 90, 0.05)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: { xs: 2, md: 3 },
          borderBottom: "1px solid #edf0f7",
          background:
            "linear-gradient(135deg, #f2f3ff 0%, #fafbff 100%)",
        }}
      >
        <Avatar
          variant="rounded"
          sx={{
            width: 56,
            height: 56,
            borderRadius: 3,
            bgcolor: "#e4e7ff",
            color: "#5965e8",
          }}
        >
          <PersonAddAlt1RoundedIcon fontSize="large" />
        </Avatar>

        <Box>
          <Typography
            variant="h5"
            fontWeight={800}
            color="#172747"
          >
            {contact.id ? "Edit Contact" : "New Contact"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {contact.id
              ? "Update the contact details below"
              : "Fill in the details to add a new contact"}
          </Typography>
        </Box>
      </Box>

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ p: { xs: 2, md: 3 } }}
      >
        <Stack spacing={2.5}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 2,
            }}
          >
            {fields.slice(0, 2).map((field) => {
              const hasError =
                formik.touched[field.name] &&
                Boolean(formik.errors[field.name]);

              return (
                <TextField
                  key={field.name}
                  fullWidth
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(hasError)}
                  helperText={
                    hasError ? formik.errors[field.name] : " "
                  }
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          {field.icon}
                        </InputAdornment>
                      ),
                      endAdornment: formik.values[field.name] ? (
                        <InputAdornment position="end">
                          <Button
                            aria-label={`Clear ${field.label}`}
                            onClick={() => handleClear(field.name)}
                            size="small"
                            color="inherit"
                            sx={{ minWidth: 0, p: 0.5 }}
                          >
                            <ClearRoundedIcon fontSize="small" />
                          </Button>
                        </InputAdornment>
                      ) : null,
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2.5,
                      bgcolor: "#fff",
                    },
                  }}
                />
              );
            })}
          </Box>

          {fields.slice(2).map((field) => {
            const hasError =
              formik.touched[field.name] &&
              Boolean(formik.errors[field.name]);

            return (
              <TextField
                key={field.name}
                fullWidth
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                type={field.type}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(hasError)}
                helperText={
                  hasError ? formik.errors[field.name] : " "
                }
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        {field.icon}
                      </InputAdornment>
                    ),
                    endAdornment: formik.values[field.name] ? (
                      <InputAdornment position="end">
                        <Button
                          aria-label={`Clear ${field.label}`}
                          onClick={() => handleClear(field.name)}
                          size="small"
                          color="inherit"
                          sx={{ minWidth: 0, p: 0.5 }}
                        >
                          <ClearRoundedIcon fontSize="small" />
                        </Button>
                      </InputAdornment>
                    ) : null,
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                    bgcolor: "#fff",
                  },
                }}
              />
            );
          })}

          {requestError && (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              {requestError}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ borderRadius: 2 }}>
              {successMessage}
            </Alert>
          )}

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            alignItems="stretch"
            sx={{ pt: 1 }}
          >
            <Button
              type="button"
              variant="outlined"
              startIcon={<AddCircleOutlineRoundedIcon />}
              onClick={handleNew}
              sx={{
                borderRadius: 2.5,
                borderColor: "#cbd3e8",
                color: "#52658e",
              }}
            >
              New
            </Button>

            <Box sx={{ flex: 1 }} />

            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveRoundedIcon />}
              disabled={!formik.isValid || formik.isSubmitting}
              sx={{
                borderRadius: 2.5,
                background:
                  "linear-gradient(135deg, #5965e8 0%, #7459dc 100%)",
                boxShadow: "0 5px 14px rgba(89, 101, 232, 0.22)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #4854d4 0%, #6348ca 100%)",
                },
              }}
            >
              {formik.isSubmitting ? "Saving..." : "Save"}
            </Button>

            {contact.id && (
              <Button
                type="button"
                variant="outlined"
                color="error"
                startIcon={<DeleteOutlineRoundedIcon />}
                onClick={handleDelete}
                sx={{ borderRadius: 2.5 }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}

