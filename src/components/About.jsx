import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

import FutureUpdatesSection from './FutureUpdatesSection';
import FoundersTeamSection from './FoundersTeamSection';
import FutureVisionSection from './FutureVisionSection';
import CoreValuesSection from './CoreValuesSection';
import PartnersSection from './PartnersSection';
import AboutHero from './AboutHero';
import Footer from './Footer';

const About = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-montaser relative">
      <AboutHero />
      <CoreValuesSection />
      <FoundersTeamSection />
      <PartnersSection />
      <FutureVisionSection />
      <FutureUpdatesSection />
      <Footer />

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 bg-[#1D4ED8] text-white p-3 rounded-full shadow-lg hover:bg-[#1E40AF] transition z-50"
          aria-label="Go to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default About;