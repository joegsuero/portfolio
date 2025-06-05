import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { switchRoutes } from "./routes";
import Main from "@/pages/main/Main";
import ProjectsPage from "@/pages/projects/Projects";
import ProjectDetail from "@/pages/projects/ProjectDetail";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";

const Router: React.FC = () => {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path={switchRoutes.root} element={<Main />} />
        <Route path={switchRoutes.projects} element={<ProjectsPage />} />
        <Route path={switchRoutes.projectsDetail} element={<ProjectDetail />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
};

export default Router;
