import React, { useState, useEffect, useRef } from 'react';
import { WEDDING_CONFIG } from './data/weddingData';
import { GoldParticles } from './components/GoldParticles';
import { WaxSealIntro } from './components/WaxSealIntro';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HeroSection } from './components/HeroSection';
import { VenueSection } from './components/VenueSection';
import { GuestbookSection } from './components/GuestbookSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lock body scroll while envelope is active
  useEffect(() => {
    if (!isIntroOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isIntroOpen]);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(WEDDING_CONFIG.audioUrl);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Handle music toggle
  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingAudio(true))
        .catch((err) => console.log('Audio autoplay prevented:', err));
    }
  };

  // When user unseals envelope, try starting ambient music
  const handleOpenIntro = () => {
    setIsIntroOpen(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlayingAudio(true))
        .catch(() => {
          // If browser restricts audio, user can click toggle button anytime
        });
    }
  };

  // Scroll spy to update active nav section
  useEffect(() => {
    if (!isIntroOpen) return;

    const handleScroll = () => {
      const sections = ['hero', 'venue', 'wishes'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isIntroOpen]);

  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-void text-champagne selection:bg-gold/30 selection:text-gold-light antialiased pb-16">
      {/* Golden Shimmer Particle Atmosphere */}
      <GoldParticles />

      {/* Wax Seal Luxury Entrance Modal */}
      {!isIntroOpen && (
        <WaxSealIntro onOpen={handleOpenIntro} />
      )}

      {/* Top Navigation Bar - Fades in only after envelope unsealing */}
      {isIntroOpen && (
        <Navbar
          activeSection={activeSection}
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={toggleAudio}
        />
      )}

      {/* Main Single-Page Journey */}
      <main className={`relative z-10 w-full overflow-x-hidden transition-opacity duration-1000 ${
        isIntroOpen ? 'opacity-100' : 'opacity-0 invisible pointer-events-none h-0 overflow-hidden'
      }`}>
        <HeroSection
          onNavigateToVenue={() => navigateToSection('venue')}
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={toggleAudio}
        />
        <div className="hairline-gold max-w-lg mx-auto my-4" />
        <VenueSection />
        <div className="hairline-gold max-w-lg mx-auto my-4" />
        <GuestbookSection />
      </main>

      {/* Footer */}
      {isIntroOpen && <Footer />}

      {/* Sticky Bottom Navigation Bar - Fades in only after envelope unsealing */}
      {isIntroOpen && (
        <BottomNav
          activeSection={activeSection}
          onNavigate={navigateToSection}
        />
      )}
    </div>
  );
};

export default App;
