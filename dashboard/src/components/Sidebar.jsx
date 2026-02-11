import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Code2, Brain, Sparkles, Calendar, BarChart3, FolderKanban, Building2, Settings } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/dsa', icon: Code2, label: 'DSA Tracker' },
  { to: '/ml', icon: Brain, label: 'AI/ML/DL' },
  { to: '/genai', icon: Sparkles, label: 'GenAI & Agents' },
  { to: '/planner', icon: Calendar, label: 'Daily Planner' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/companies', icon: Building2, label: 'Companies' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-bg-secondary border-r border-border flex flex-col z-50">
      <div className="p-4 border-b border-border">
        <h1 className="text-lg font-bold text-accent-blue">Placement HQ</h1>
        <p className="text-xs text-text-muted mt-0.5">IIT Placement Prep</p>
      </div>
      <nav className="flex-1 py-2 overflow-y-auto">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-accent-blue/15 text-accent-blue font-medium'
                  : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
              }`
            }
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-border">
        <p className="text-xs text-text-muted">Target: Aug 2026</p>
      </div>
    </aside>
  );
}
