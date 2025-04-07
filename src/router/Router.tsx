import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { switchRoutes } from "./routes";
import Main from "@/pages/main/Main";

const Router: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={switchRoutes.root} element={<Main />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
