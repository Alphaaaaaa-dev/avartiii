import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SensorDashboard from '@/components/SensorDashboard';
import FeatureCards from '@/components/FeatureCards';
import EventLog from '@/components/EventLog';
import DetectionTechnology from '@/components/DetectionTechnology';
import DeploymentSteps from '@/components/DeploymentSteps';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="scanline-overlay noise-overlay">
      <Navbar />
      <HeroSection />
      <SensorDashboard />
      <FeatureCards />
      <EventLog />
      <DetectionTechnology />
      <DeploymentSteps />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Index;
