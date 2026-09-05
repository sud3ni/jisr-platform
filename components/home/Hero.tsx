import HeroContent from "./HeroContent";
import HeroIllustration from "./HeroIllustration";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 via-white to-white">

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">

        <HeroContent />

        <HeroIllustration />

      </div>

      <div className="mx-auto max-w-7xl px-6 pb-20">

        <HeroStats />

      </div>

    </section>
  );
}
