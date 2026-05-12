interface SwitchRoutes {
  root: string;
  about: string;
  projects: string;
  projectsDetail: string;
  blog: string;
  missing: string;
}

export const switchRoutes: SwitchRoutes = {
  root: "/",
  about: "/about",
  projects: "/projects",
  projectsDetail: "/projects/:title",
  blog: "/blog",
  missing: "*",
};
