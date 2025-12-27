import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { VisitorChatWidget } from "@/components/chat/VisitorChatWidget";
import Index from "./pages/Index";
import ModulePage from "./pages/ModulePage";
import ModulesPage from "./pages/ModulesPage";
import GrammarModulePage from "./pages/GrammarModulePage";
import SubscribePage from "./pages/SubscribePage";
import AuthPage from "./pages/AuthPage";
import ForumPage from "./pages/ForumPage";
import ForumCategoryPage from "./pages/ForumCategoryPage";
import ForumThreadPage from "./pages/ForumThreadPage";
import NewThreadPage from "./pages/NewThreadPage";
import LearnToReadPage from "./pages/LearnToReadPage";
import PracticePlaygroundPage from "./pages/PracticePlaygroundPage";
import AdminChatPage from "./pages/AdminChatPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/module/:id" element={<ModulePage />} />
          <Route path="/modules" element={<ModulesPage />} />
          <Route path="/grammar/:id" element={<GrammarModulePage />} />
          <Route path="/subscribe" element={<SubscribePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/learn-to-read" element={<LearnToReadPage />} />
          <Route path="/practice" element={<PracticePlaygroundPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum/:categorySlug" element={<ForumCategoryPage />} />
          <Route path="/forum/:categorySlug/new" element={<NewThreadPage />} />
          <Route path="/forum/:categorySlug/:threadSlug" element={<ForumThreadPage />} />
          <Route path="/admin/chat" element={<AdminChatPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <VisitorChatWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
