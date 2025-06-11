
import './App.css';
import AgentPerformance from './components/AgentPerformance'
import ComplaintsProductOverview from './components/ComplaintsProductOverview'
import ChartWithDrillDown from './components/ChartWithDrillDown'
import { BrowserRouter ,Routes, Route } from "react-router-dom";
function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/AgentPerformance" element={<AgentPerformance />} />
        <Route path="/ComplaintsProductOverview" element={<ComplaintsProductOverview />} />
        <Route path="/ChartWithDrillDown" element={<ChartWithDrillDown />} />

        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
