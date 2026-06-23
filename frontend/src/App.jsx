import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import Copilot from "./pages/Copilot";
import ExecutiveSummary from "./pages/ExecutiveSummary";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/incidents"
            element={<Incidents />}
          />

          <Route
            path="/copilot"
            element={<Copilot />}
          />

          <Route
            path="/executive"
            element={
              <ExecutiveSummary />
            }
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;