import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ModulePage from "./pages/ModulePage";
import ModulesPage from "./pages/ModulesPage";
import GrammarModulePage from "./pages/GrammarModulePage";
import SubscribePage from "./pages/SubscribePage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/module/:id" element={<ModulePage />} />
          <Route path="/modules" element={<ModulesPage />} />
          <Route path="/grammar/:id" element={<GrammarModulePage />} />
          <Route path="/subscribe" element={<SubscribePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
