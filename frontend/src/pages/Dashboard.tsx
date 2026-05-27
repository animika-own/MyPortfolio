import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    skills: 0,
    projects: 0,
    education: 0,
    experience: 0,
    training: 0,
    certifications: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [
        skills,
        projects,
        education,
        experience,
        training,
        certifications,
      ] = await Promise.all([
        api.get("/skills"),
        api.get("/projects"),
        api.get("/education"),
        api.get("/work-experience"),
        api.get("/trainings"),
        api.get("/certifications"),
      ]);

      setCounts({
        skills: skills.data.length,
        projects: projects.data.length,
        education: education.data.length,
        experience: experience.data.length,
        training: training.data.length,
        certifications: certifications.data.length,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cardStyle = (bg: string) => ({
    background: `linear-gradient(135deg, ${bg})`,
    borderRadius: 4,
    color: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    transition: "0.3s",
    cursor: "pointer",
    minHeight: 180,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: "0 18px 35px rgba(0,0,0,0.2)",
    },
  });

  const renderContent = (title: string, value: number, loadingText: string) => {
    if (loading) {
      return (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress sx={{ color: "#fff", mb: 2 }} />

          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {loadingText}
          </Typography>
        </Box>
      );
    }

    return (
      <>
        <Typography variant="subtitle1">{title}</Typography>

        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
      </>
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        background: "linear-gradient(135deg, #f5f7fa, #e4ecf7)",
      }}
    >
      {/* HEADER */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Portfolio Admin Dashboard
        </Typography>

        <Typography color="text.secondary">
          A full-stack portfolio system to manage skills, projects, experience
          and resume
        </Typography>
      </Box>

      {/* CARDS */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={cardStyle("#4facfe, #00f2fe")}>
            <CardContent>
              {renderContent(
                "Skills",
                counts.skills,
                "Loading technical skills..."
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={cardStyle("#43e97b, #38f9d7")}>
            <CardContent>
              {renderContent(
                "Projects",
                counts.projects,
                "Fetching awesome projects..."
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={cardStyle("#fa709a, #fee140")}>
            <CardContent>
              {renderContent(
                "Education",
                counts.education,
                "Loading academic journey..."
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={cardStyle("#a18cd1, #fbc2eb")}>
            <CardContent>
              {renderContent(
                "Experience",
                counts.experience,
                "Preparing experience insights..."
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={cardStyle("#ff9a9e, #fad0c4")}>
            <CardContent>
              {renderContent(
                "Trainings",
                counts.training,
                "Loading learning milestones..."
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={cardStyle("#89f7fe, #66a6ff")}>
            <CardContent>
              {renderContent(
                "Certificates",
                counts.certifications,
                "Verifying achievements..."
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* FOOTER */}
      <Box
        sx={{
          mt: 6,
          textAlign: "center",
          color: "text.secondary",
        }}
      >
        <Typography variant="body2">
          Built by Animika Das • A personal project to showcase practical
          development skills
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
