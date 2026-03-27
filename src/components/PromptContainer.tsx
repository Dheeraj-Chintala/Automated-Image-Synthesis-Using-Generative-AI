import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import './PromptContainer.css';

interface PromptContainerProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

export function PromptContainer({ onGenerate, isLoading }: PromptContainerProps) {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleGenerate();
    }
  };

  return (
    <div className="prompt-container">
      <div className="input-box">
        <textarea
          className="textarea-field"
          placeholder="Describe the image you want to create... (Ctrl + Enter to send)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <div className="controls">
          <div></div>
          <button 
            className="generate-btn" 
            onClick={handleGenerate} 
            disabled={!prompt.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="spinner" />
                Generating...
              </>
            ) : (
              <>
                <Send size={18} />
                Generate
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
