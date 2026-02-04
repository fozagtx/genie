import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, Code, Shield, Zap, GitBranch, MessageCircle, FileText, Users } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "10+ Specialized AI Agents",
    description: "From HTML/CSS to React/TypeScript, each agent is optimized for specific development tasks.",
  },
  {
    icon: Code,
    title: "Multi-Language Support",
    description: "Generate code in multiple programming languages and frameworks with best practices.",
  },
  {
    icon: Shield,
    title: "Built-in Security & Quality",
    description: "Automated security scanning, performance optimization, and quality assurance.",
  },
  {
    icon: Zap,
    title: "Real-Time Preview",
    description: "WebContainer-powered live preview and deployment for instant feedback.",
  },
  {
    icon: GitBranch,
    title: "GitHub Integration",
    description: "40+ tools for complete repository operations and workflow automation.",
  },
  {
    icon: MessageCircle,
    title: "4 Access Channels",
    description: "Web Terminal, Telegram Bot, Voice Commands, and Background Jobs.",
  },
  {
    icon: FileText,
    title: "AI Documentation",
    description: "Automated documentation generation and project setup assistance.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Multi-agent coordination for complex project development and management.",
  },
];

export function GenieFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  };

  return (
    <section id="features" ref={ref} className="py-24 relative bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-white">
            Complete AI Development Platform
          </h2>
          <p className="font-sans text-lg text-slate-400 max-w-3xl mx-auto">
            Everything you need for modern software development, powered by specialized AI agents
            working together as your virtual development team.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="relative p-6 overflow-hidden rounded-xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-neutral-900 group"
            >
              <div className="flex flex-col items-start gap-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold mb-2 text-slate-50">{feature.title}</h3>
                  <p className="font-sans text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}