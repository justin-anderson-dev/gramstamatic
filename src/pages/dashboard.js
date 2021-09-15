import { useEffect } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Timeline from '../components/timeline';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Gramm.fans';
  }, []);

  return(
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg px-4 lg:px-0">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}
