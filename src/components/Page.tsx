import { useState, useEffect } from "react";
import Router from "@/router/Router";

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return <Router />;
}
