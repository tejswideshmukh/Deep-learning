import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStore } from './store/useStore';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import DSATracker from './pages/DSATracker';
import MLTracker from './pages/MLTracker';
import GenAITracker from './pages/GenAITracker';
import DailyPlanner from './pages/DailyPlanner';
import Analytics from './pages/Analytics';
import Projects from './pages/Projects';
import Companies from './pages/Companies';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const store = useStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard store={store} />} />
          <Route path="/dsa" element={<DSATracker store={store} />} />
          <Route path="/ml" element={<MLTracker store={store} />} />
          <Route path="/genai" element={<GenAITracker store={store} />} />
          <Route path="/planner" element={<DailyPlanner store={store} />} />
          <Route path="/analytics" element={<Analytics store={store} />} />
          <Route path="/projects" element={<Projects store={store} />} />
          <Route path="/companies" element={<Companies store={store} />} />
          <Route path="/settings" element={<SettingsPage store={store} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
