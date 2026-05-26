import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../services/api";

interface PersonalDetail {
  id?: number;
  name: string;
  daughter_of: string;
  mother_name: string;
  date_of_birth: string;
  gender: string;
  marital_status: string;
  spouse_name: string;
  nationality: string;
  languages_known: string;
  hobbies: string;
  address: string;
}

const PersonalDetails = () => {
  const [form, setForm] = useState<PersonalDetail>({
    name: "",
    daughter_of: "",
    date_of_birth: "",
    mother_name: "",
    gender: "",
    marital_status: "",
    spouse_name: "",
    nationality: "",
    languages_known: "",
    hobbies: "",
    address: "",
  });

  const [id, setId] = useState<number | null>(null);

  // GET single record
  const fetchData = async () => {
    try {
      const res = await api.get("/personal-details");

      if (res.data) {
        setForm(res.data);
        setId(res.data.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // SAVE (create or update)
  const handleSave = async () => {
    try {
      if (id) {
        await api.put(`/personal-details/${id}`, form);
        alert("Updated Successfully");
      } else {
        const res = await api.post("/personal-details", form);
        setId(res.data.id);
        alert("Created Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      {/* HEADER */}
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Personal Details
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Manage your CV personal information
      </Typography>

      {/* TABLE VIEW */}
      <Card sx={{ mt: 4, borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Personal Details Preview
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#0f172a" }}>
                  <TableCell sx={{ color: "#fff" }}>Field</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Value</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{form.name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Father's Name</TableCell>
                  <TableCell>{form.daughter_of}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Mother's Name</TableCell>
                  <TableCell>{form.mother_name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>{form.date_of_birth}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Gender</TableCell>
                  <TableCell>{form.gender}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Marital Status</TableCell>
                  <TableCell>{form.marital_status}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Spouse Name</TableCell>
                  <TableCell>{form.spouse_name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Nationality</TableCell>
                  <TableCell>{form.nationality}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Languages Known</TableCell>
                  <TableCell>{form.languages_known}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Hobbies</TableCell>
                  <TableCell>{form.hobbies}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell>{form.address}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* FORM */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Add Details
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Full Name"
                fullWidth
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Father's Name"
                fullWidth
                value={form.daughter_of}
                onChange={(e) =>
                  setForm({ ...form, daughter_of: e.target.value })
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Mother's Name"
                fullWidth
                value={form.mother_name}
                onChange={(e) =>
                  setForm({ ...form, mother_name: e.target.value })
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="D.O.B"
                type="date"
                fullWidth
                value={form.date_of_birth}
                onChange={(e) =>
                  setForm({ ...form, date_of_birth: e.target.value })
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Gender"
                fullWidth
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Marital Status"
                fullWidth
                value={form.marital_status}
                onChange={(e) =>
                  setForm({ ...form, marital_status: e.target.value })
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Spouse Name"
                fullWidth
                value={form.spouse_name}
                onChange={(e) =>
                  setForm({ ...form, spouse_name: e.target.value })
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Nationality"
                fullWidth
                value={form.nationality}
                onChange={(e) =>
                  setForm({ ...form, nationality: e.target.value })
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label="Languages Known"
                fullWidth
                value={form.languages_known}
                onChange={(e) =>
                  setForm({ ...form, languages_known: e.target.value })
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label="Hobbies"
                fullWidth
                value={form.hobbies}
                onChange={(e) => setForm({ ...form, hobbies: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label="Address"
                fullWidth
                multiline
                rows={3}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSave}
                sx={{
                  height: "100%",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 2,
                  color: "#fff",
                  background: "linear-gradient(135deg, #0f172a, #334155)",
                  boxShadow: "0 6px 15px rgba(15, 23, 42, 0.25)",
                  transition: "0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, #1e293b, #0f172a)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.35)",
                  },
                  "&:active": {
                    transform: "scale(0.98)",
                  },
                }}
              >
                Save Personal Details
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PersonalDetails;
