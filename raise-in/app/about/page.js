"use client";

import { motion } from "framer-motion";

const team = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "10+ years in fintech and social impact",
    icon: "👩‍💼",
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "CTO",
    bio: "Tech innovator passionate about accessibility",
    icon: "👨‍💻",
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Community Lead",
    bio: "Building inclusive communities worldwide",
    icon: "👩‍🤝‍👨",
  },
];

const stats = [
  { label: "Campaigns Created", value: "10K+" },
  { label: "Funds Raised", value: "$50M+" },
  { label: "Active Users", value: "100K+" },
  { label: "Success Rate", value: "92%" },
];

export default function AboutPage() {
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
                About RaiseIN
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Empowering individuals and communities to create positive change through crowdfunding
              <br />
              <span className="text-sm font-bold">*All the stats on this page are just for illustration purposes*</span>
            </motion.p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="px-4 md:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-12"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                At RaiseIN, we believe that great ideas and noble causes shouldn't be limited by geography or financial barriers. Our mission is to create a transparent, secure, and inclusive crowdfunding platform that connects passionate individuals with supporters who want to make a difference.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                We're committed to empowering entrepreneurs, social activists, medical patients, and community leaders to tell their stories and reach a global audience of supporters.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 md:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-900 border border-gray-700 rounded-xl p-8 text-center hover:border-blue-500 transition-all"
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-4 md:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🤝",
                  title: "Trust & Transparency",
                  desc: "We believe in complete transparency in all transactions and communications",
                },
                {
                  icon: "🌍",
                  title: "Inclusivity",
                  desc: "Everyone deserves a chance to make a difference, regardless of background",
                },
                {
                  icon: "💪",
                  title: "Empowerment",
                  desc: "We empower individuals to take control of their fundraising journey",
                },
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-4 md:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-gray-900 border border-gray-700 rounded-xl p-8 text-center hover:border-blue-500 transition-all"
                >
                  <div className="text-5xl mb-4">{member.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-400">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
