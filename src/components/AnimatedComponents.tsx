import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

// Animación de entrada para secciones
interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function FadeInSection({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '' 
}: FadeInSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0 
      } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animación de hover para cards
export function AnimatedCard({ 
  children, 
  className = '',
  whileHover = { y: -8, scale: 1.02 },
  whileTap = { scale: 0.98 },
}: {
  children: ReactNode;
  className?: string;
  whileHover?: any;
  whileTap?: any;
}) {
  return (
    <motion.div
      className={className}
      whileHover={whileHover}
      whileTap={whileTap}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}

// Animación de texto escribiéndose
export function TypewriterText({ 
  text, 
  delay = 0,
  speed = 0.05 
}: { 
  text: string; 
  delay?: number;
  speed?: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: delay + index * speed,
            duration: 0,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Barra de progreso de scroll
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-[0%] z-50"
      style={{ scaleX }}
    />
  );
}

// Animación de partículas flotantes
export function FloatingParticles({ count = 20 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
          }}
          animate={{
            y: -50,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
}

// Animación de contador
export function AnimatedCounter({ 
  value, 
  duration = 2 
}: { 
  value: number; 
  duration?: number; 
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { 
        opacity: 1, 
        scale: 1,
      } : {}}
      transition={{ duration }}
    >
      {isInView ? value : 0}
    </motion.span>
  );
}

// Animación de reveal de texto
export function RevealText({ 
  children, 
  delay = 0 
}: { 
  children: string; 
  delay?: number; 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const words = children.split(' ');

  return (
    <span ref={ref} className="inline-block">
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : {}}
            transition={{
              delay: delay + index * 0.1,
              duration: 0.6,
              ease: [0.25, 0.25, 0.25, 0.75],
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

// Animación de hover magnético
export function MagneticHover({ 
  children, 
  strength = 0.3 
}: { 
  children: ReactNode; 
  strength?: number; 
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    
    const x = (clientX - left - width / 2) * strength;
    const y = (clientY - top - height / 2) * strength;

    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0px, 0px)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.2s ease-out' }}
    >
      {children}
    </div>
  );
}

// Animación de aparecer en secuencia
export function StaggeredContainer({ 
  children, 
  staggerDelay = 0.1 
}: { 
  children: ReactNode; 
  staggerDelay?: number; 
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredItem({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.25, 0.25, 0.75],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
