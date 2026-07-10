import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, glass = false, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className={`${glass ? 'glass' : 'card'} p-6 ${hover ? 'hover:shadow-card-hover hover:-translate-y-1' : ''} ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

export default Card;
