"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  FaWallet,
  FaExchangeAlt,
  FaShieldAlt,
  FaBolt,
  FaChartLine,
  FaServer,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

// Helper component for animation staggering
const AnimatedDiv = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <div
    className="animate-fade-in-down opacity-0"
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

export default function Home() {
  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    router.push("/dashboard");
    return null; // Don't render anything while redirecting
  }

  const handleSignIn = () => {
    // Make sure to update your callback URL if it's different
    router.push(
      "/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3001%2Fdashboard"
    );
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-bg-primary text-text-primary">
      {/* --- Navbar --- */}
      <header className="absolute top-0 left-0 w-full z-10">
        <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
          <span className="text-2xl font-bold">Paytm</span>
          <div>
            <button
              onClick={handleSignIn}
              className="hidden sm:inline-block text-text-secondary hover:text-text-primary mr-6"
            >
              Sign In
            </button>
            <button
              onClick={handleSignIn}
              className="bg-accent-primary text-white font-semibold px-6 py-3 rounded-lg
                         transition-all duration-300 transform 
                         hover:bg-opacity-90 hover:shadow-lg hover:shadow-accent-primary/30"
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* --- Hero Section --- */}
      <section className="relative container mx-auto text-center pt-48 pb-32 px-6">
        <div className="absolute inset-0 -z-10 bg-radial-glow"></div>
        <AnimatedDiv delay={0}>
          <h1 className="text-5xl sm:text-7xl font-bold text-text-primary mb-6">
            Take control of your
            <br />
            <span className="text-accent-primary">digital payments</span>
          </h1>
        </AnimatedDiv>
        <AnimatedDiv delay={200}>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
            Our streamlined wallet delivers instant P2P transactions, bank-grade
            security, and a modern financial experience.
          </p>
        </AnimatedDiv>
        <AnimatedDiv delay={400}>
          <button
            onClick={handleSignIn}
            className="bg-accent-primary text-white font-semibold px-8 py-4 rounded-lg text-lg
                       transition-all duration-300 transform 
                       hover:bg-opacity-90 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-primary/30"
          >
            Get started for free
          </button>
        </AnimatedDiv>
        <AnimatedDiv delay={600}>
          <div className="mt-16 text-text-tertiary">
            <span className="tracking-widest uppercase">Trusted by</span>
            <div className="flex justify-center items-center gap-10 mt-4">
              <span className="font-semibold text-lg">
                Instant Bank Transfers
              </span>
              <span className="font-semibold text-lg">Secure Wallets</span>
              <span className="font-semibold text-lg">P2P Network</span>
            </div>
          </div>
        </AnimatedDiv>
      </section>

      {/* --- Feature Grid Section (from 10.54.43.jpg) --- */}
      <section className="py-24 bg-bg-secondary">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6">
            Powerful features built for confidence
          </h2>
          <p className="text-lg text-text-secondary text-center max-w-2xl mx-auto mb-16">
            Streamline your finances with tools to keep you secure, informed,
            and in control.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaBolt />}
              title="Instant P2P Transfers"
              description="Send and receive money in seconds, without delays or bottlenecks."
            />
            <FeatureCard
              icon={<FaShieldAlt />}
              title="Bank-Grade Security"
              description="Protect your funds with multi-layer encryption and secure sign-on."
            />
            <FeatureCard
              icon={<FaServer />}
              title="Reliable Architecture"
              description="Built on a decoupled monorepo for maximum uptime and scalability."
            />
            <FeatureCard
              icon={<FaWallet />}
              title="All-in-One Wallet"
              description="Manage your balance, add funds, and view all transactions in one place."
            />
            <FeatureCard
              icon={<FaExchangeAlt />}
              title="Async Bank Webhooks"
              description="Our system processes deposits asynchronously, so you never have to wait."
            />
            <FeatureCard
              icon={<FaChartLine />}
              title="Transaction Analytics"
              description="Get notified instantly about all account activity and spending trends."
            />
          </div>
        </div>
      </section>

      {/* --- Alternating Feature Section (from 10.54.29.jpg) --- */}
      <section className="py-32 overflow-hidden">
        <div className="container mx-auto px-6 space-y-24">
          <FeatureShowcase
            title="Effortless payments & instant requests"
            description="Easily send or request payments from anyone with just a phone number. All funds are settled instantly with support from our secure bank partners."
            imageUrl="/path-to-your-p2p-screenshot.png" // << ADD YOUR IMAGE PATH
          />
          <FeatureShowcase
            title="Data that drives smart decisions"
            description="Analyze your transactions from every angle. Dive into spending habits, filter by date, and understand your financial health with our simple, powerful dashboard."
            imageUrl="/path-to-your-dashboard-screenshot.png" // << ADD YOUR IMAGE PATH
            reverse={true}
          />
        </div>
      </section>

      {/* --- How It Works Section (from 10.54.43.jpg) --- */}
      <section className="py-24 bg-bg-secondary">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Simple steps to smarter payments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <HowItWorksStep
              num="1"
              title="Create your account"
              description="Sign up in seconds with our simple, secure process."
            />
            <HowItWorksStep
              num="2"
              title="Complete verification"
              description="Verify your identity just once to unlock all features."
            />
            <HowItWorksStep
              num="3"
              title="Fund your wallet"
              description="Add money instantly using our secure bank onramp."
            />
            <HowItWorksStep
              num="4"
              title="Start transferring"
              description="Send and receive money instantly with our P2P tools."
            />
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-20 border-t border-border-primary">
        <div className="container mx-auto px-6 text-center">
          <span className="text-3xl font-bold">Paytm</span>
          <p className="text-text-secondary mt-4 max-w-md mx-auto">
            A final call to action to get the user to sign up and start using
            your powerful wallet.
          </p>
          <button
            onClick={handleSignIn}
            className="bg-accent-primary text-white font-semibold px-8 py-4 rounded-lg text-lg mt-8
                       transition-all duration-300 transform 
                       hover:bg-opacity-90 hover:shadow-lg hover:shadow-accent-primary/30"
          >
            Sign Up Now
          </button>
          <div className="mt-16 text-text-tertiary">
            &copy; 2025 Paytm. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Reusable Components for the Landing Page ---

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="card-glass p-8 rounded-2xl">
    <div className="w-16 h-16 bg-accent-dark text-accent-primary flex items-center justify-center rounded-xl mb-6 text-3xl">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold mb-3">{title}</h3>
    <p className="text-text-secondary">{description}</p>
  </div>
);

const FeatureShowcase = ({
  title,
  description,
  imageUrl,
  reverse = false,
}: {
  title: string;
  description: string;
  imageUrl: string;
  reverse?: boolean;
}) => (
  <div
    className={`flex flex-col lg:flex-row items-center gap-16 ${
      reverse ? "lg:flex-row-reverse" : ""
    }`}
  >
    <div className="lg:w-1/2">
      <h2 className="text-4xl font-bold mb-6">{title}</h2>
      <p className="text-lg text-text-secondary mb-8">{description}</p>
      <button className="flex items-center gap-2 text-accent-primary font-semibold text-lg hover:opacity-80 transition-opacity">
        Get started
        <HiArrowRight />
      </button>
    </div>
    <div className="lg:w-1/2">
      <div className="relative card-glass rounded-2xl p-4">
        {/* Replace this with an <Image> component */}
        <img
          src={imageUrl}
          alt="Feature showcase"
          className="rounded-lg shadow-2xl"
        />
        <div className="absolute inset-0 -z-10 bg-radial-glow"></div>
      </div>
    </div>
  </div>
);

const HowItWorksStep = ({
  num,
  title,
  description,
}: {
  num: string;
  title: string;
  description: string;
}) => (
  <div className="text-center">
    <div
      className="w-16 h-16 bg-accent-dark border-2 border-accent-primary text-accent-primary
                 flex items-center justify-center rounded-full text-2xl font-bold mx-auto mb-6"
    >
      {num}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-text-secondary">{description}</p>
  </div>
);
