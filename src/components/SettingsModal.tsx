import { useState } from 'react';
import { X } from 'lucide-react';
import './SettingsModal.css';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (hfToken: string) => void;
  currentHfToken: string;
}

function SettingsModalInner({
  onClose,
  onSave,
  currentHfToken,
}: Omit<SettingsModalProps, 'isOpen'>) {
  const [hfToken, setHfToken] = useState(currentHfToken);

  const handleSave = () => {
    onSave(hfToken);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Settings</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="form-group">
          <label htmlFor="hf-token">Hugging Face token</label>
          <input
            id="hf-token"
            type="password"
            className="form-input"
            placeholder="hf_…"
            value={hfToken}
            onChange={(e) => setHfToken(e.target.value)}
          />
          <p className="api-hint">
            Create a token at{' '}
            <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer">
              Hugging Face settings
            </a>
            . Use the same value as <code>VITE_HF_TOKEN</code> in <code>.env</code>.
          </p>
        </div>

        <p className="api-hint">
          Image model: <strong>black-forest-labs/FLUX.1-schnell</strong> via Inference provider <strong>nscale</strong> (5 steps).
        </p>

        <button className="save-btn" onClick={handleSave}>
          Save Settings
        </button>
      </div>
    </div>
  );
}

export function SettingsModal({ isOpen, onClose, onSave, currentHfToken }: SettingsModalProps) {
  if (!isOpen) return null;
  return (
    <SettingsModalInner
      onClose={onClose}
      onSave={onSave}
      currentHfToken={currentHfToken}
    />
  );
}
