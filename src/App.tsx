import { useState, useEffect, useRef } from 'react';
import { PromptContainer } from './components/PromptContainer';
import { ImageResult } from './components/ImageResult';
import { generateImage, resolveHfToken } from './services/api';
import './App.css';

function App() {
  const [hfToken, setHfToken] = useState(import.meta.env.VITE_HF_TOKEN || '');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imageUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('hfToken');
    if (!import.meta.env.VITE_HF_TOKEN && saved) setHfToken(saved);
  }, []);

  useEffect(() => {
    imageUrlRef.current = imageUrl;
  }, [imageUrl]);

  useEffect(() => {
    return () => {
      const u = imageUrlRef.current;
      if (u?.startsWith('blob:')) URL.revokeObjectURL(u);
    };
  }, []);

  const handleGenerate = async (prompt: string) => {
    if (!resolveHfToken(hfToken)) {
      setError(
        'Add VITE_HF_TOKEN to your .env file, then restart the dev server (Vite only reads .env at startup).'
      );
      return;
    }

    setIsLoading(true);
    setError(null);
    setImageUrl((prev) => {
      if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev);
      return null;
    });

    try {
      const result = await generateImage(prompt, hfToken || undefined);
      setImageUrl(result);
    } catch (err: unknown) {
      console.error('Generation Error:', err);
      const message =
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred during generation.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <main>
        <div className="hero">
          <h1>Synthesize <span>Imagination</span></h1>
          <p>Transform your words into stunning visual art in seconds.</p>
        </div>

        <div className="content-grid">
          <PromptContainer 
            onGenerate={handleGenerate} 
            isLoading={isLoading} 
          />
          
          <ImageResult 
            imageUrl={imageUrl} 
            isLoading={isLoading} 
            error={error} 
          />
        </div>
      </main>
    </div>
  );
}

export default App;
