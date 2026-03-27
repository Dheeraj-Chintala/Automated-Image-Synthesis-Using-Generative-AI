import { Sparkles } from 'lucide-react';
import './Header.css';

export function Header() {
  return (
    <header>
      <div className="logo">
        <Sparkles size={24} color="var(--accent-primary)" />
        Lumina<span>AI</span>
      </div>
    </header>
  );
}
