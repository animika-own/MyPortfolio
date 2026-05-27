import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import api from "../services/api";

interface Certification {
  id: number;
  title: string;
  year: string;
}

const Certifications = () => {
  const [certs, setCerts] = useState<Certification[]>([]);

  const [form, setForm] = useState({
    title: "",
    year: "",
  });

  // GET
  const fetchCerts = async () => {
    try {
      const res = await api.get("/certifications");
      setCerts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ADD
  const addCert = async () => {
    try {
      await api.post("/certifications", form);
      setForm({ title: "", year: "" });
      fetchCerts();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const deleteCert = async (id: number) => {
    try {
      await api.delete(`/certifications/${id}`);
      fetchCerts();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      {/* HEADER */}
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Certifications
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Add and manage your certifications
      </Typography>

      {/* TABLE */}
      <Card sx={{ borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Certification List
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#0f172a" }}>
                  <TableCell sx={{ color: "#fff" }}>ID</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Title</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Year</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {certs.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.title}</TableCell>
                    <TableCell>{c.year}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => deleteCert(c.id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* FORM */}
      <Card sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Add Certification
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Title"
                fullWidth
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Year"
                fullWidth
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={addCert}
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
                Add Certification
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Certifications;
