import { Image as ImageIcon, Loader2, AlertCircle, Download } from 'lucide-react';
import './ImageResult.css';

interface ImageResultProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

export function ImageResult({ imageUrl, isLoading, error }: ImageResultProps) {
  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `lumina-ai-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="image-result">
      {isLoading && (
        <div className="loading-state">
          <Loader2 size={40} className="spinner" />
          <p>Synthesizing image...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="error-state">
          <AlertCircle size={40} />
          <h3>Generation Failed</h3>
          <p>{error}</p>
        </div>
      )}

      {!imageUrl && !isLoading && !error && (
        <div className="empty-state">
          <ImageIcon size={48} />
          <p>Your creation will appear here</p>
        </div>
      )}

      {imageUrl && !isLoading && !error && (
        <>
          <img src={imageUrl} alt="Generated result" className="generated-image" />
          <div className="image-actions">
            <button className="action-btn" onClick={handleDownload} title="Download Image">
              <Download size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
