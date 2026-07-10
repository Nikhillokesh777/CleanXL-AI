import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Contact = () => (
  <div className="min-h-screen pt-28 pb-20 px-4">
    <div className="max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="w-14 h-14 rounded-2xl icon-gradient flex items-center justify-center mx-auto mb-5 shadow-glow">
          <MessageSquare size={24} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Get in Touch</h1>
        <p className="text-slate-500 font-light">Have a question or feedback? We'd love to hear from you.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="card p-8"
      >
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" placeholder="John" />
            <Input label="Last Name" placeholder="Doe" />
          </div>
          <Input label="Email" type="email" placeholder="john@example.com" icon={Mail} />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Message</label>
            <textarea
              rows={5}
              placeholder="Tell us how we can help..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 resize-none text-sm"
            />
          </div>
          <Button variant="primary" icon={Send} className="w-full justify-center">
            Send Message
          </Button>
        </form>
      </motion.div>
    </div>
  </div>
);

export default Contact;
