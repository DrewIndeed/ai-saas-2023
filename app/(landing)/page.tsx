import LandingHero from "@/components/LandingHero";
import LandingNavbar from "@/components/LandingNavbar";
import LandingTestinomials from "@/components/LandingTestinomials";

const LandingPage = () => {
  return (
    <div className="h-full overflow-y-auto bg-[url('/landing-bg.png')]">
      <div className="backdrop-blur-md backdrop-saturate-[.7] backdrop-brightness-[0.95]">
        <LandingNavbar />
        <LandingHero />
        <LandingTestinomials />
      </div>
    </div>
  );
};

export default LandingPage;
