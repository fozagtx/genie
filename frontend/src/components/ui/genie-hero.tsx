import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function GenieHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>

      {/* Animated background dots */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animation: 'pulse 3s infinite',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            transition={{ duration: 0.8 }}
            className="font-heading text-5xl sm:text-7xl font-bold mb-6 text-slate-50 drop-shadow-lg"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Next-Generation
            </span>{" "}
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              AI Development
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            transition={{ duration: 0.8 }}
            className="font-sans text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Your Virtual Development Team Powered by Specialized AI Agents.
            Generate, review, and deploy code with multi-agent AI intelligence.
          </motion.p>

          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/terminal" className="font-sans bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-md font-semibold transition-all duration-200 w-full sm:w-auto shadow-lg hover:shadow-xl inline-block text-center no-underline">
              Launch Genie AI
            </Link>
            <Link to="/docs" className="font-sans border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-md font-semibold transition-all duration-200 w-full sm:w-auto backdrop-blur-sm inline-block text-center no-underline">
              View Documentation
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}