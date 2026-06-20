import { HeroSection } from "../components/HeroSection";
import { BlogSection } from "../components/BlogSection";

export const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <BlogSection />
    </div>
  );
};