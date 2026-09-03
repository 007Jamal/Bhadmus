import { motion } from 'motion/react'

// Simple, tasteful scroll-reveal: fades and slides up as an element enters
// the viewport. Wrap anything in it: <Reveal><YourComponent /></Reveal>
//
// This is intentionally subtle by default. If you have specific animation
// code you want instead, drop it here or in the components directly and it
// will replace/extend this.

export default function Reveal({ children, delay = 0, className = '', y = 16 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
