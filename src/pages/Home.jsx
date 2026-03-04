import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import SeekTruth from "../components/home/SeekTruth";
import SubscriptionValue from "../components/home/SubscriptionValue";
import BlenderIncentive from "../components/home/BlenderIncentive";
import TeamTeaser from "../components/home/TeamTeaser";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <SeekTruth />
      <SubscriptionValue />
      <BlenderIncentive />
      <TeamTeaser />
    </main>
  );
}
