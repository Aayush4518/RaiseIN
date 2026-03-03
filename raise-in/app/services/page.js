"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    title: "Campaign Creation",
    description: "Easily create and launch your funding campaign in minutes",
    icon: "🚀",
    features: [
      "Simple campaign setup",
      "Rich media upload",
      "Custom funding goals",
      "Real-time tracking",
    ],
  },
  {
    id: 2,
    title: "Payment Processing",
    description: "Secure and seamless payment collection powered by Razorpay",
    icon: "💳",
    features: [
      "Multiple payment methods",
      "Instant settlements",
      "Fraud protection",
      "Full transparency",
    ],
  },
  {
    id: 3,
    title: "Community Support",
    description: "Connect with supporters and share your story with the world",
    icon: "👥",
    features: [
      "Community engagement",
      "Campaign sharing",
      "Updates & milestones",
      "Donor thank-you notes",
    ],
  },
  {
    id: 4,
    title: "Analytics & Insights",
    description: "Track your campaign performance with detailed analytics",
    icon: "📊",
    features: [
      "Campaign metrics",
      "Donor insights",
      "Progress tracking",
      "Performance reports",
    ],
  },
  {
    id: 5,
    title: "Secure Dashboard",
    description: "Manage your campaigns and withdrawals from one place",
    icon: "🔒",
    features: [
      "Campaign management",
      "Fund withdrawal",
      "Donation tracking",
      "Account security",
    ],
  },
  {
    id: 6,
    title: "24/7 Support",
    description: "Get help whenever you need it from our dedicated team",
    icon: "🤝",
    features: [
      "Email support",
      "FAQ resources",
      "Community forum",
      "Priority assistance",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="w-full min-h-screen">
      {/* Background Grid */}
      <div className="fixed top-0 left-0 z-[-1] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />

      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="px-4 md:px-8 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Our Services
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Everything you need to launch and manage a successful fundraising campaign
            </motion.p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="px-4 md:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-gray-900 border border-gray-700 rounded-xl p-8 hover:border-blue-500 transition-all duration-300">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-400 mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 md:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Start Your Campaign?
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Join thousands of fundraisers who have successfully raised funds for their causes
              </p>
              <Link
                href="/funding"
                className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all font-semibold"
              >
                Create Your Campaign
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
