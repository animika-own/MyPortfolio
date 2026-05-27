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

interface Training {
  id: number;
  course_name: string;
  institute_name: string;
  start_date: string;
  end_date: string;
  description: string;
}

const Training = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);

  const [form, setForm] = useState({
    course_name: "",
    institute_name: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  // GET
  const fetchTrainings = async () => {
    try {
      const res = await api.get("/trainings");
      setTrainings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ADD
  const addTraining = async () => {
    try {
      await api.post("/trainings", form);
      setForm({
        course_name: "",
        institute_name: "",
        start_date: "",
        end_date: "",
        description: "",
      });
      fetchTrainings();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const deleteTraining = async (id: number) => {
    try {
      await api.delete(`/trainings/${id}`);
      fetchTrainings();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      {/* HEADER */}
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Training Management
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Add your courses and training experience
      </Typography>

      {/* LIST */}
      <Grid container spacing={2}>
        {trainings.map((t) => (
          <Grid key={t.id} size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {t.course_name}
                  </Typography>

                  <IconButton onClick={() => deleteTraining(t.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Typography variant="body2">
                  <b>Institute:</b> {t.institute_name}
                </Typography>

                <Typography variant="body2">
                  <b>Duration:</b> {t.start_date} → {t.end_date}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {t.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* FORM */}
      <Card sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Add Training
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Course Name"
                fullWidth
                value={form.course_name}
                onChange={(e) =>
                  setForm({ ...form, course_name: e.target.value })
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Institute Name"
                fullWidth
                value={form.institute_name}
                onChange={(e) =>
                  setForm({ ...form, institute_name: e.target.value })
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                type="date"
                fullWidth
                value={form.start_date}
                onChange={(e) =>
                  setForm({ ...form, start_date: e.target.value })
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                type="date"
                fullWidth
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
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
                onClick={addTraining}
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
                Add Training
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Training;
