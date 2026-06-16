import Hero from '../components/sections/Hero';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import ClientSection from '../components/sections/ClientSection';
import ContactSection from '../components/sections/ContactSection';

// CareersSection has been promoted to its own page at /careers.
// The Careers nav link routes there directly.

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ClientSection />
      <ContactSection />
    </>
  );
}
