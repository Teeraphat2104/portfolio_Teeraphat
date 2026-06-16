import { HeroSection } from "../components/HeroSection";
import { BlogSection } from "../components/BlogSection";

export const Home: React.FC = () => {
  return (
    <div className="space-y-20 mb-20">
      <HeroSection />
      <BlogSection />
    </div>
  );
};
