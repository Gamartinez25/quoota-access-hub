import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PermissionsProvider } from "@/contexts/PermissionsContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BenefitsDashboard from "./pages/BenefitsDashboard";
import CapitalEmployees from "./pages/CapitalEmployees";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PermissionsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Benefits Module Routes */}
            <Route path="/benefits/dashboard" element={<BenefitsDashboard />} />
            <Route path="/benefits/wallet" element={<BenefitsDashboard />} />
            <Route path="/benefits/cards" element={<BenefitsDashboard />} />
            <Route path="/benefits/transactions" element={<BenefitsDashboard />} />
            {/* Capital Module Routes */}
            <Route path="/capital/employees" element={<CapitalEmployees />} />
            <Route path="/capital/payroll" element={<CapitalEmployees />} />
            <Route path="/capital/reports" element={<CapitalEmployees />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PermissionsProvider>
  </QueryClientProvider>
);

export default App;
