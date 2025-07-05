import NAVBAR from './components/navbar'; 
import HEROSECTION from './components/herosection'; 

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <NAVBAR />
      <HEROSECTION />
      
    </main>
  );
}