import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../services/api";

interface ResumeData {
  id?: number;
  title: string;
  file_url?: string;
}

const Resume = () => {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  // =========================
  // GET RESUME
  // =========================
  const fetchResume = async () => {
    try {
      const res = await api.get("/resume");

      if (res.data) {
        setResume(res.data);

        // SAFE FIX (IMPORTANT)
        setTitle(res.data.title ?? "");
      } else {
        setResume(null);
        setTitle("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // SAVE / UPDATE
  // =========================
  const handleSave = async () => {
    try {
      // SAFE FIX (IMPORTANT)
      if (!title || !title.trim()) {
        alert("Resume title required");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);

      if (file) {
        formData.append("resume", file);
      }

      // UPDATE
      if (resume?.id) {
        await api.post(`/resume/${resume.id}?_method=PUT`, formData);
      }
      // CREATE
      else {
        if (!file) {
          alert("Please upload PDF file");
          return;
        }

        await api.post("/resume", formData);
      }

      fetchResume();
      setFile(null);

      alert("Resume saved successfully");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async () => {
    if (!resume?.id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/resume/${resume.id}`);

      setResume(null);
      setTitle("");
      setFile(null);

      alert("Resume deleted successfully");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      {/* HEADER */}
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Resume
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Upload and preview your CV / Resume
      </Typography>

      {/* FORM */}
      <Card sx={{ borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Grid container spacing={2}>
            {/* TITLE */}
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Resume Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>

            {/* FILE UPLOAD */}
            <Grid size={{ xs: 12 }}>
              <Button variant="outlined" component="label">
                Upload PDF
                <input
                  hidden
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </Button>

              {file && (
                <Typography sx={{ mt: 1 }}>
                  Selected File: {file.name}
                </Typography>
              )}
            </Grid>

            {/* SAVE BUTTON */}
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
                {resume ? "Update Resume" : "Save Resume"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* PREVIEW */}
      {resume && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              {resume.title || "My Resume"}
            </Typography>

            {resume.file_url ? (
              <iframe
                src={resume.file_url}
                width="100%"
                height="700px"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
                title="Resume Preview"
              />
            ) : (
              <Typography>Preview not available</Typography>
            )}

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              {resume.file_url && (
                <Button
                  href={resume.file_url}
                  target="_blank"
                  variant="contained"
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
                  Download PDF
                </Button>
              )}

              <Button color="error" variant="outlined" onClick={handleDelete}>
                Delete
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Resume;
