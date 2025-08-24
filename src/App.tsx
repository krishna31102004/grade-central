import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FileUploadProvider } from "@/context/FileUploadContext";
import Homepage from "./pages/Homepage";
import SubjectPage from "./pages/SubjectPage";
import AllSubjects from "./pages/AllSubjects";
import Contribute from "./pages/Contribute";
import Feedback from "./pages/Feedback";
import DisclaimerCredits from "./pages/DisclaimerCredits";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FileUploadProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/subjects" element={<AllSubjects />} />
            <Route path="/subject/:subjectId" element={<SubjectPage />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/disclaimer-credits" element={<DisclaimerCredits />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FileUploadProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
