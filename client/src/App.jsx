import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BloxFX from './pages/BloxFX';
import Icons from './pages/Icons';
import Effects from './pages/Effects';
import Animations from './pages/Animations';
import Components from './pages/Components';
import Builder from './pages/Builder';
import Docs from './pages/Docs';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Navbar />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bloxfx" element={<BloxFX />} />
          <Route path="/icons" element={<Icons />} />
          <Route path="/effects" element={<Effects />} />
          <Route path="/animations" element={<Animations />} />
          <Route path="/components" element={<Components />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
