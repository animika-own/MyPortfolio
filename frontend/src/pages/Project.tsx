import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  IconButton,
  TableCell,
  TableRow,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  Paper,
  Link,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../services/api";

interface Project {
  id: number;
  title: string;
  description: string;
  technology: string;
  github_link: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    technology: "",
    github_link: "",
  });

  const [editOpen, setEditOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    id: 0,
    title: "",
    description: "",
    technology: "",
    github_link: "",
  });

  // GET projects
  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ADD project
  const addProject = async () => {
    try {
      await api.post("/projects", form);
      setForm({ title: "", description: "", technology: "", github_link: "" });
      fetchProjects();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.response?.data || err.message);
    }
  };

  // DELETE project
  const deleteProject = async (id: number) => {
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  //   Edit

  const handleEdit = (project: Project) => {
    setEditForm(project);
    setEditOpen(true);
  };

  const updateProject = async () => {
    try {
      await api.put(`/projects/${editForm.id}`, editForm);
      setEditOpen(false);
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      {/* HEADER */}
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Projects Management
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Add and manage your portfolio projects
      </Typography>

      {/* PROJECT LIST */}
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Projects List
        </Typography>

        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            {/* HEADER */}
            <TableHead sx={{ bgcolor: "#0f172a" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>ID</TableCell>
                <TableCell sx={{ color: "#fff" }}>Title</TableCell>
                <TableCell sx={{ color: "#fff" }}>Description</TableCell>
                <TableCell sx={{ color: "#fff" }}>Technology</TableCell>
                <TableCell sx={{ color: "#fff" }}>GitHub Link</TableCell>
                <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            {/* BODY */}
            <TableBody>
              {projects.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>{p.id}</TableCell>

                  <TableCell sx={{ fontWeight: 600 }}>{p.title}</TableCell>

                  <TableCell>
                    {p.description.length > 40
                      ? p.description.substring(0, 40) + "..."
                      : p.description}
                  </TableCell>

                  <TableCell>{p.technology}</TableCell>

                  <TableCell>
                    <Link
                      href={p.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                    >
                      {p.github_link}
                    </Link>
                  </TableCell>

                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(p)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => deleteProject(p.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* FORM */}
      <Card sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Add New Project
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Project Title"
                fullWidth
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
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
              <TextField
                label="Tech Stack (React, Laravel, MySQL...)"
                fullWidth
                value={form.technology}
                onChange={(e) =>
                  setForm({ ...form, technology: e.target.value })
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label="GitHub Link"
                fullWidth
                value={form.github_link}
                onChange={(e) =>
                  setForm({ ...form, github_link: e.target.value })
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={addProject}
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
                Add Project
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Edit module */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth>
        <DialogTitle>Edit Project</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            sx={{ mt: 2 }}
            value={editForm.title}
            onChange={(e) =>
              setEditForm({ ...editForm, title: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Description"
            sx={{ mt: 2 }}
            value={editForm.description}
            onChange={(e) =>
              setEditForm({ ...editForm, description: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Tech Stack"
            sx={{ mt: 2 }}
            value={editForm.technology}
            onChange={(e) =>
              setEditForm({ ...editForm, technology: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Github Link"
            sx={{ mt: 2 }}
            value={editForm.github_link}
            onChange={(e) =>
              setEditForm({ ...editForm, github_link: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={updateProject}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projects;
