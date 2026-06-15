import Hero           from '../components/sections/Hero';
import AboutSection   from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import ClientSection  from '../components/sections/ClientSection';
import ContactSection from '../components/sections/ContactSection';

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