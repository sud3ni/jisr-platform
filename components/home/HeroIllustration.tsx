import Image from "next/image";

export default function HeroIllustration() {
  return (
    <div className="relative flex items-center justify-center">

      <div className="absolute h-[420px] w-[420px] rounded-full bg-blue-100 blur-3xl opacity-70"></div>

      <Image
        src="/images/hero-illustration.png"
        alt="جسر بين الخريجين والمؤسسات"
        width={650}
        height={650}
        priority
        className="relative z-10"
      />

    </div>
  );
}

