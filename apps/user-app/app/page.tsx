"use client";
import { useRouter } from "next/navigation";
import { FaWallet, FaExchangeAlt, FaShieldAlt } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navbar */}
      {/* <nav className="p-4 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">UserApp</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="container mx-auto text-center py-20">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Your All-in-One Digital Wallet
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Add money, transfer to friends, and enjoy seamless transactions with
          UserApp.
        </p>
        <button
          onClick={() => {
            router.push(
              "/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3001%2F"
            );
          }}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700"
        >
          Register Now
        </button>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose UserApp?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FaWallet className="text-5xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Add Money
            </h3>
            <p className="text-gray-600">
              Easily add money to your wallet using Onramp.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FaExchangeAlt className="text-5xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              P2P Transfer
            </h3>
            <p className="text-gray-600">
              Send money to friends and family instantly.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FaShieldAlt className="text-5xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure</h3>
            <p className="text-gray-600">
              Your transactions are safe and encrypted.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <span className="text-4xl font-bold text-blue-600">1</span>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Sign Up
            </h3>
            <p className="text-gray-600">Create your account in minutes.</p>
          </div>
          <div className="text-center p-6">
            <span className="text-4xl font-bold text-blue-600">2</span>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Add Money
            </h3>
            <p className="text-gray-600">Use Onramp to fund your wallet.</p>
          </div>
          <div className="text-center p-6">
            <span className="text-4xl font-bold text-blue-600">3</span>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Transfer
            </h3>
            <p className="text-gray-600">Send money to anyone, anytime.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 mt-16">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            &copy; 2023 UserApp. All rights reserved.
          </p>
          <div className="mt-4">
            <a href="#" className="text-gray-600 hover:text-blue-600 mx-2">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 mx-2">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
