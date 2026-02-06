import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Bot, Code, Shield, FileText, Zap, CheckCircle, GitBranch, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useInView } from "framer-motion";

const agents = [
  {
    icon: Code,
    title: "Simple Coder",
    description: "HTML/CSS/JavaScript projects with clean, efficient code generation.",
    features: ["Frontend focus", "Clean markup", "Responsive design"],
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    icon: Bot,
    title: "Complex Coder",
    description: "React/TypeScript applications with modern frameworks and best practices.",
    features: ["React/TypeScript", "Component architecture", "State management"],
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: Shield,
    title: "Security Sentinel",
    description: "Vulnerability scanning and security best practices validation.",
    features: ["Security analysis", "Vulnerability detection", "Best practices"],
    gradient: "from-red-500/20 to-pink-500/20",
  },
  {
    icon: Zap,
    title: "Performance Profiler",
    description: "Code optimization and performance analysis for faster applications.",
    features: ["Performance metrics", "Code optimization", "Bundle analysis"],
    gradient: "from-yellow-500/20 to-orange-500/20",
  },
  {
    icon: Search,
    title: "Bug Hunter",
    description: "Logic error detection and automated debugging assistance.",
    features: ["Error detection", "Debug assistance", "Code quality"],
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description: "Best practices validation and code review automation.",
    features: ["Code review", "Standards compliance", "Quality metrics"],
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: FileText,
    title: "Test Crafter",
    description: "Automated test generation for comprehensive code coverage.",
    features: ["Test generation", "Coverage analysis", "Unit & integration"],
    gradient: "from-indigo-500/20 to-purple-500/20",
  },
  {
    icon: GitBranch,
    title: "GitHub Agent",
    description: "Repository operations and automated workflow management.",
    features: ["Repo management", "PR automation", "CI/CD integration"],
    gradient: "from-pink-500/20 to-rose-500/20",
  },
]

const Marquee = ({ children, direction = 1 }: { children: React.ReactNode; direction?: number }) => {
  return (
    <div className="w-full overflow-hidden">
      <motion.div
        className="flex"
        animate={{ x: direction === 1 ? ["0%", "-100%"] : ["-100%", "0%"] }}
        transition={{ ease: "linear", duration: 80, repeat: Infinity }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export function GenieAgentsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="agents" ref={ref} className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-white">
            Specialized AI Agents
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-3xl mx-auto">
            Your virtual development team powered by specialized AI agents for every aspect of software development.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-4 py-8">
        <Marquee direction={1}>
          {[...agents, ...agents].map((agent, index) => (
            <AgentCard agent={agent} key={`top-${index}`} />
          ))}
        </Marquee>
        <Marquee direction={-1}>
          {[...agents, ...agents].reverse().map((agent, index) => (
            <AgentCard agent={agent} key={`bottom-${index}`} />
          ))}
        </Marquee>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mt-12"
      >
        <Link to="/terminal" className="font-sans bg-white hover:bg-slate-200 text-black font-bold text-base py-3 px-8 rounded-md transition-all duration-300 inline-block text-center no-underline">
          Explore Genie AI
        </Link>
      </motion.div>
    </section>
  );
}

const AgentCard = ({ agent }: { agent: typeof agents[0] }) => {
  return (
    <Card className="bg-neutral-900/50 border border-white/10 hover:border-white/20 transition-colors duration-300 flex-shrink-0 w-96 mx-2 group p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-lg bg-black border border-white/10">
          <agent.icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-slate-50">{agent.title}</h3>
          <p className="font-sans text-sm text-muted-foreground">{agent.description}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-auto">
        {agent.features.map(feature => (
          <span key={feature} className="font-sans text-xs text-slate-300 bg-white/5 px-2 py-1 rounded-full border border-white/10">
            {feature}
          </span>
        ))}
      </div>
    </Card>
  );
};