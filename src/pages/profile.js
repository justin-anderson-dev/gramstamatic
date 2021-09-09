import '../styles/app.css';
import { useEffect } from 'react';

export default function Profile() {
  useEffect(() => {
    document.title = 'Profile - Gramm.fans';
  }, []);
  return (
    <div className="bg-gray-background">
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">I am the Profile page!</p>
      </div>
    </div>
  );
}
