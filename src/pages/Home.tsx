import { HeroSection } from '../components/HeroSection'
import { FeaturesSection } from '../components/FeaturesSection'
import { StatsSection } from '../components/StatsSection'
import { TestimonialsSection } from '../components/TestimonialsSection'
import { CallToAction } from '../components/CallToAction'
import { BlogSection } from '../components/BlogSection'

export const Home: React.FC = () => {
 return (
  <div className="space-y-20 mb-20">
 <HeroSection />
 <FeaturesSection />
 <StatsSection />
 <TestimonialsSection />
 <CallToAction />
 <BlogSection />
 </div>
 )
}
