import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import University from "./pages/University";
import Analyzer from "./pages/Analyzer";
import Training from "./pages/Training";
import Tickets from "./pages/Tickets";
import Flows from "./pages/Flows";
import Tojson from "./pages/Tojson";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 min-w-0">
            <Topbar />
            <main className="p-4 md:p-6 max-w-[1400px] mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/university" element={<University />} />
                <Route path="/analyzer" element={<Analyzer />} />
                <Route path="/training" element={<Training />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/flows" element={<Flows />} />
                <Route path="/tojson" element={<Tojson />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}