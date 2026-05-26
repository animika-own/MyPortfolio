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

interface Education {
  id: number;
  degree: string;
  institution: string;
  board: string;
  year_of_passing: string;
  grade: string;
}

const Education = () => {
  const [education, setEducation] = useState<Education[]>([]);

  const [form, setForm] = useState({
    degree: "",
    institution: "",
    board: "",
    year_of_passing: "",
    grade: "",
  });

  // GET
  const fetchEducation = async () => {
    try {
      const res = await api.get("/education");
      setEducation(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ADD
  const addEducation = async () => {
    try {
      await api.post("/education", form);
      setForm({
        degree: "",
        institution: "",
        board: "",
        year_of_passing: "",
        grade: "",
      });
      fetchEducation();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const deleteEducation = async (id: number) => {
    try {
      await api.delete(`/education/${id}`);
      fetchEducation();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      {/* HEADER */}
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Education
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Manage your academic background
      </Typography>

      {/* LIST (TIMELINE STYLE) */}
      <Box>
        {education.map((item) => (
          <Card
            key={item.id}
            sx={{
              mb: 2,
              borderRadius: 3,
              position: "relative",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-3px)" },
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
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {item.degree}
                </Typography>

                <IconButton onClick={() => deleteEducation(item.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Typography>{item.institution}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.board} • {item.year_of_passing}
              </Typography>

              <Typography variant="body2">
                <span style={{ fontWeight: 600 }}>Grade (%/CGPA): </span>
                {item.grade}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* FORM */}
      <Card sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add Education
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Degree"
                fullWidth
                value={form.degree}
                onChange={(e) => setForm({ ...form, degree: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Institution"
                fullWidth
                value={form.institution}
                onChange={(e) =>
                  setForm({ ...form, institution: e.target.value })
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Board/University"
                fullWidth
                value={form.board}
                onChange={(e) => setForm({ ...form, board: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Year of Passing"
                fullWidth
                value={form.year_of_passing}
                onChange={(e) =>
                  setForm({ ...form, year_of_passing: e.target.value })
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Grade (% / CGPA)"
                fullWidth
                value={form.grade}
                onChange={(e) => setForm({ ...form, grade: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={addEducation}
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
                Add Education
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Education;
