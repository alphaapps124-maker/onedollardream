import HeroSection from "../sections/HeroSection";
import RoadJourneySection from "../sections/RoadJourneySection";
import PledgeFormSection from "../sections/PledgeFormSection";
import GrantCategoriesSection from "../sections/GrantCategoriesSection";
import CommunityChampionSection from "../sections/CommunityChampionSection";
import PhasesTimelineSection from "../sections/PhasesTimelineSection";
import TrustStripSection from "../sections/TrustStripSection";
import VideoSection from "../sections/VideoSection";
import FAQSection from "../sections/FAQSection";
import FinalCTASection from "../sections/FinalCTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RoadJourneySection />
      <PledgeFormSection />
      <TrustStripSection />
      <GrantCategoriesSection />
      <CommunityChampionSection />
      <PhasesTimelineSection />
      <VideoSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
