import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import SensorsPage from "./pages/SensorsPage";
import LiveCamerasPage from "./pages/LiveCamerasPage";
import AlertsPage from "./pages/AlertsPage";
import EmergencyHistoryPage from "./pages/EmergencyHistoryPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import MaintenancePage from "./pages/MaintenancePage";
import CompliancePage from "./pages/CompliancePage";
import ContactSupportPage from "./pages/ContactSupportPage";
import SettingsPage from "./pages/SettingsPage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route element={<AppLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/sensors" element={<SensorsPage />} />
            <Route path="/cameras" element={<LiveCamerasPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/emergency-history" element={<EmergencyHistoryPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/support" element={<ContactSupportPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
