import '../styles/app.css';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found - Gramstamatic';
  }, []);
  return (
    <div className="bg-gray-background">
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">Oopsie Doopsie! Not Found.</p>
      </div>
    </div>
  );
}
