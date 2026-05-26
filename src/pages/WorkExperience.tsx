import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import api from "../services/api";

interface Experience {
  id: number;
  company_name: string;
  role: string;
  start_date: string;
  end_date: string;
  description: string;
}

const Experience = () => {
  const [experience, setExperience] = useState<Experience[]>([]);

  const [form, setForm] = useState({
    company_name: "",
    role: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  // GET
  const fetchExperience = async () => {
    try {
      const res = await api.get("/work-experience");
      setExperience(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ADD
  const addExperience = async () => {
    try {
      await api.post("/work-experience", form);
      setForm({
        company_name: "",
        role: "",
        start_date: "",
        end_date: "",
        description: "",
      });
      fetchExperience();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const deleteExperience = async (id: number) => {
    try {
      await api.delete(`/work-experience/${id}`);
      fetchExperience();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      {/* HEADER */}
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Work Experience
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Manage your professional experience
      </Typography>

      {/* TIMELINE CARDS */}
      <Box>
        {experience.map((item) => (
          <Card
            key={item.id}
            sx={{
              mb: 2,
              borderRadius: 3,
              transition: "0.3s",
              "&:hover": { transform: "translateY(-3px)" },
              position: "relative",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {item.role}
                  </Typography>
                  <Typography variant="h6">{item.company_name}</Typography>
                </Box>

                <IconButton onClick={() => deleteExperience(item.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Typography variant="body2" color="text.secondary">
                {item.start_date} → {item.end_date}
              </Typography>

              <Typography variant="body2" sx={{ mt: 1 }}>
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* FORM */}
      <Card sx={{ mt: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add Work Experience
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Company Name"
                fullWidth
                value={form.company_name}
                onChange={(e) =>
                  setForm({ ...form, company_name: e.target.value })
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Role"
                fullWidth
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                value={form.start_date}
                onChange={(e) =>
                  setForm({ ...form, start_date: e.target.value })
                }
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="End Date"
                type="date"
                fullWidth
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={addExperience}
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
                Add Experience
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Experience;
