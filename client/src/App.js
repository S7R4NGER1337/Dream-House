import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import ErrorBoundary from "./components/ErrorBoundary";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminPropertyForm from "./pages/admin/AdminPropertyForm";
import AdminAgents from "./pages/admin/AdminAgents";
import AdminAgentForm from "./pages/admin/AdminAgentForm";
import ProtectedRoute from "./pages/admin/ProtectedRoute";

const Home = lazy(() => import("./pages/home/Home"));
const AboutUs = lazy(() => import("./pages/aboutUs/AboutUs"));
const Services = lazy(() => import("./pages/services/Services"));
const Property = lazy(() => import("./pages/property/Property"));
const Properties = lazy(() => import("./pages/properties/Properties"));
const Contact = lazy(() => import("./pages/contact/Contact"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

function PublicLayout() {
  return (
    <>
      <Nav />
      <div style={{ marginTop: "5rem" }}>
        <ErrorBoundary>
        <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center", color: "#94a3b8" }}>Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/property/:id" element={<Property />} />
            <Route path="/services" element={<Services />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        </ErrorBoundary>
      </div>
      <Footer />
    </>
  );
}

function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {isAdmin ? (
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/properties" element={<ProtectedRoute><AdminProperties /></ProtectedRoute>} />
          <Route path="/admin/properties/new" element={<ProtectedRoute><AdminPropertyForm /></ProtectedRoute>} />
          <Route path="/admin/properties/:id/edit" element={<ProtectedRoute><AdminPropertyForm /></ProtectedRoute>} />
          <Route path="/admin/agents" element={<ProtectedRoute><AdminAgents /></ProtectedRoute>} />
          <Route path="/admin/agents/new" element={<ProtectedRoute><AdminAgentForm /></ProtectedRoute>} />
          <Route path="/admin/agents/:id/edit" element={<ProtectedRoute><AdminAgentForm /></ProtectedRoute>} />
        </Routes>
      ) : (
        <PublicLayout />
      )}
    </>
  );
}

export default App;
