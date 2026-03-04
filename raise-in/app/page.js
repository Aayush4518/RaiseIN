"use client";
import ScrollSection from "@/app/components/ScrollSection";
import StaggerChildren from "@/app/components/StaggerChildren";
import TextReveal from "@/app/components/TextReveal";
import ParallaxText from "@/app/components/ParallaxText";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const whyRef = useRef(null);

  const handleGetStarted = () => {
    // use replace so that going back doesn't trigger a faulty history entry
    router.replace("/login").catch((err) => {
      console.warn("navigation error:", err);
    });
  };
  const handleLearnMore = () => {
    whyRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/* Hero Section with Background Image */}
      <div
        className="flex flex-col items-center justify-center min-h-screen px-4 py-20 bg-cover bg-center bg-no-repeat relative z-10 -mt-16"
        style={{
          backgroundImage: "url('/images/raiseIN-bg.png')",
        }}
      >
        {/* Dark overlay for better text visibility */}
        {/* <div className="absolute inset-0 bg-black/20 z-0"></div> */}
        
        <ScrollSection
          variant="fadeUp"
          duration={0.8}
          className="flex flex-col items-center justify-center min-h-screen px-4 py-20 relative z-10"
        >
          <div className="text-center space-y-6 max-w-4xl">
            <TextReveal delay={0} duration={0.7} distance={40}>
              <ParallaxText offset={150}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                  RaiseIN
                </h1>
              </ParallaxText>
            </TextReveal>
            
            <TextReveal delay={0.1} duration={0.7} distance={40}>
              <ParallaxText offset={120}>
                <p className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-tight text-white w-screen -ml-4 sm:-ml-4 md:-ml-4">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-600 to-transparent bg-clip-text text-transparent">
                    Helping
                  </span> hands ,<br />changing lives
                </p>
              </ParallaxText>
            </TextReveal>
            
            <TextReveal delay={0.2} duration={0.7} distance={40}>
              <ParallaxText offset={100}>
                <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
                  Join our community of changemakers dedicated to making a positive impact in the world. Together, we can create meaningful change.
                </p>
              </ParallaxText>
            </TextReveal>

            <TextReveal delay={0.3} duration={0.7} distance={30}>
              <ParallaxText offset={80}>
                <div className="flex gap-4 justify-center pt-8 flex-wrap">
                  <button
                    onClick={handleGetStarted}
                    className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
                  >
                    Get Started
                  </button>
                  <button
                    onClick={handleLearnMore}
                    className="px-8 py-3 border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white rounded-lg font-semibold transition-colors"
                  >
                    Learn More
                  </button>
                </div>
              </ParallaxText>
            </TextReveal>
          </div>
        </ScrollSection>
      </div>

      {/* Features & below wrapper */}
      <div className="relative h-full w-full bg-slate-950">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>
        <div className="relative z-10">
          {/* Features Section */}
          <ScrollSection
            variant="fadeIn"
            className="py-20 px-4"
          >
            <div ref={whyRef} id="why-choose" className="max-w-6xl mx-auto">
          <TextReveal delay={0} duration={0.7} distance={35}>
            <h2 className="text-4xl font-bold text-center mb-4 text-white">
              Why Choose RaiseIN?
            </h2>
          </TextReveal>
          
          <TextReveal delay={0.1} duration={0.7} distance={35}>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
              Discover what makes our platform the best choice for making a difference
            </p>
          </TextReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Easy to Use",
                description: "Intuitive interface designed for everyone",
              },
              {
                title: "Community Driven",
                description: "Connect with like-minded changemakers",
              },
              {
                title: "Real Impact",
                description: "Track your contributions and see the difference",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-neutral-800/50 border border-purple-500/20 rounded-lg hover:border-purple-500/50 transition-colors"
              >
                <TextReveal delay={idx * 0.1} duration={0.6} distance={25}>
                  <h3 className="text-xl font-semibold text-purple-400 mb-3">
                    {feature.title}
                  </h3>
                </TextReveal>
                <TextReveal delay={idx * 0.1 + 0.05} duration={0.6} distance={25}>
                  <p className="text-gray-300">{feature.description}</p>
                </TextReveal>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </ScrollSection>


      {/* How It Works Section */}
      <ScrollSection variant="fadeIn" className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <TextReveal delay={0} duration={0.7} distance={35}>
            <h2 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
          </TextReveal>
          <TextReveal delay={0.1} duration={0.7} distance={35}>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
              A simple, three-step process to get you started helping others.
            </p>
          </TextReveal>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Create a Campaign",
                description: "Set up your fundraiser in minutes",
              },
              {
                title: "Share With Community",
                description: "Spread the word to gather support",
              },
              {
                title: "Track Progress",
                description: "See real-time impact of contributions",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-6 bg-neutral-800/60 border border-purple-500/20 rounded-lg hover:border-purple-500/50 transition-colors"
              >
                <TextReveal delay={idx * 0.1} duration={0.6} distance={25}>
                  <h3 className="text-xl font-semibold text-purple-400 mb-3">
                    {step.title}
                  </h3>
                </TextReveal>
                <TextReveal delay={idx * 0.1 + 0.05} duration={0.6} distance={25}>
                  <p className="text-gray-300">{step.description}</p>
                </TextReveal>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </ScrollSection>

      {/* Connect Section */}
      <ScrollSection variant="fadeUp" className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <TextReveal delay={0} duration={0.7} distance={35}>
            <h2 className="text-4xl font-bold text-white mb-4">
              Connect with Me
            </h2>
          </TextReveal>
          <div className="flex justify-center gap-6 mt-8">
            <a
              href="https://www.github.com/Aayush4518"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aayush-singh-766a77290"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-800 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </ScrollSection>

      {/* CTA Section */}
          <ScrollSection
            variant="slideUp"
            duration={0.7}
            className="py-20 px-4"
          >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <TextReveal delay={0} duration={0.7} distance={40}>
              <h2 className="text-4xl font-bold text-white">Ready to Make an Impact?</h2>
            </TextReveal>
            
            <TextReveal delay={0.1} duration={0.7} distance={40}>
              <p className="text-xl text-gray-400">
                Join thousands of changemakers today
              </p>
            </TextReveal>
          </div>
          
          <TextReveal delay={0.2} duration={0.7} distance={30}>
            <button
              onClick={handleGetStarted}
              className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold text-white transition-all transform hover:scale-105"
            >
              Start Your Journey
            </button>
          </TextReveal>
        </div>

      </ScrollSection>
        </div> {/* end relative z-10 */}
      </div> {/* end background wrapper */}
    </div>
  );
}
