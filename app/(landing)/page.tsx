import LandingHero from "@/components/LandingHero";
import LandingNavbar from "@/components/LandingNavbar";
import LandingTestinomials from "@/components/LandingTestinomials";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingTestinomials />
    </div>
  );
};

export default LandingPage;
