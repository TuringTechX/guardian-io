// Import necessary components and hooks
import React from 'react';
import Link from 'next/link';

const IndexPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-6 px-4">
        <h1 className="text-4xl font-bold text-center">Guardian-IO: Supply Chain Transparency</h1>
      </header>

      <main className="py-10 px-4">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Dashboard Card */}
          <Link href="/dashboard">
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg cursor-pointer hover:bg-gray-600">
              <h2 className="text-2xl font-bold">Dashboard</h2>
              <p className="mt-2">
                Interactive dashboard with supply chain transparency data, including graphs, charts, and world maps.
              </p>
            </div>
          </Link>

          {/* Collaboration Platform Card */}
          <Link href="/collaboration">
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg cursor-pointer hover:bg-gray-600">
              <h2 className="text-2xl font-bold">Collaboration Platform</h2>
              <p className="mt-2">
                Engage in forums, share documents, and interact with other users to discuss sustainability practices.
              </p>
            </div>
          </Link>

          {/* Compliance Checker Card */}
          <Link href="/compliance-checker">
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg cursor-pointer hover:bg-gray-600">
              <h2 className="text-2xl font-bold">Compliance Checker</h2>
              <p className="mt-2">
                Evaluate your compliance with sustainability standards through an intuitive form-based system.
              </p>
            </div>
          </Link>

          {/* Wildlife Crime Awareness Card */}
          <Link href="/wildlife-crime">
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg cursor-pointer hover:bg-gray-600">
              <h2 className="text-2xl font-bold">Wildlife Crime Awareness</h2>
              <p className="mt-2">
                View hotspots of wildlife crime with interactive maps and animated endangered species icons.
              </p>
            </div>
          </Link>

          {/* Risk Assessment Card */}
          <Link href="/risk-assessment">
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg cursor-pointer hover:bg-gray-600">
              <h2 className="text-2xl font-bold">Risk Assessment</h2>
              <p className="mt-2">
                Utilize machine learning to assess and predict risks within your supply chain.
              </p>
            </div>
          </Link>

          {/* Blockchain Transparency Card */}
          <Link href="/blockchain">
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg cursor-pointer hover:bg-gray-600">
              <h2 className="text-2xl font-bold">Blockchain Transparency</h2>
              <p className="mt-2">
                Explore blockchain technology to verify and track transparent supply chain transactions.
              </p>
            </div>
          </Link>

          {/* Ethical Sourcing Card */}
          <Link href="/ethical-sourcing">
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg cursor-pointer hover:bg-gray-600">
              <h2 className="text-2xl font-bold">Ethical Sourcing</h2>
              <p className="mt-2">
                Receive AI-driven recommendations for ethical suppliers with badges for sustainability.
              </p>
            </div>
          </Link>

          {/* Gamification of Goals */}
          <Link href="/gamification">
            <div className="bg-gray-700 rounded-lg p-6 shadow-lg cursor-pointer hover:bg-gray-600">
              <h2 className="text-2xl font-bold">Gamification of Goals</h2>
              <p className="mt-2">
                Track progress on sustainability goals and earn badges in a gamified leaderboard system.
              </p>
            </div>
          </Link>
        </section>
      </main>

      <footer className="bg-gray-800 py-4 text-center">
        <p>© 2024 Guardian-IO. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default IndexPage;
