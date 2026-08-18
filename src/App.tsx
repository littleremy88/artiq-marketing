import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import HowItWorks from "@/pages/HowItWorks";
import Download from "@/pages/Download";
import Waitlist from "@/pages/Waitlist";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="download" element={<Download />} />
          <Route path="waitlist" element={<Waitlist />} />
          <Route path="auth" element={<Navigate to="/waitlist" replace />} />
          <Route path="account" element={<Navigate to="/waitlist" replace />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
