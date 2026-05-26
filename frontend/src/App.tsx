import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import Layout from "./components/Layout";
import Projects from "./pages/Project";
import Training from "./pages/Training";
import Certifications from "./pages/Certifications";
import Education from "./pages/Education";
import Experience from "./pages/WorkExperience";
import PersonalDetails from "./pages/PersonalDetails";
import Resume from "./pages/Resume";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected layout routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* nested pages */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="skills" element={<Skills />} />
          <Route path="projects" element={<Projects />} />
          <Route path="trainings" element={<Training />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="education" element={<Education />} />
          <Route path="work-experience" element={<Experience />} />
          <Route path="resume" element={<Resume />} />
          <Route path="personal-details" element={<PersonalDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
