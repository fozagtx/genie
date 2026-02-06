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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-rose-50">
      {/* Subtle background dots */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground/10 rounded-full"
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
            className="font-heading text-5xl sm:text-7xl font-bold mb-6 text-foreground"
          >
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Next-Generation
            </span>{" "}
            AI Development
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
            <Link to="/terminal" className="font-sans bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold transition-all duration-200 w-full sm:w-auto shadow-md hover:shadow-lg hover:opacity-90 inline-block text-center no-underline">
              Launch Genie AI
            </Link>
            <Link to="/docs" className="font-sans border border-border hover:border-foreground/40 text-foreground px-8 py-4 rounded-full font-semibold transition-all duration-200 w-full sm:w-auto inline-block text-center no-underline">
              View Documentation
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
