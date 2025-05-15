import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const socials = [
  { name: 'LinkedIn', url: '#', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg' },
  { name: 'GitHub', url: '#', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg' },
  { name: 'Twitter', url: '#', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg' },
];

const services = [
  {
    id: 'product-design',
    name: 'Product Design',
    description: 'UI/UX Design, Wireframing, Prototyping',
    icon: '🎨'
  },
  {
    id: 'web-development',
    name: 'Website Development',
    description: 'Custom Websites, E-commerce, Web Apps',
    icon: '🌐'
  },
  {
    id: 'mobile-apps',
    name: 'Mobile Apps',
    description: 'iOS & Android Development',
    icon: '📱'
  },
  {
    id: 'consulting',
    name: 'Tech Consulting',
    description: 'Technical Strategy & Architecture',
    icon: '💡'
  }
];

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
];

const timeframes = [
  'ASAP',
  'Within 1 month',
  'Within 3 months',
  'Within 6 months',
  'Just exploring options'
];

export default function ContactModern() {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: selectedService.id,
    budget: '',
    currency: 'USD',
    timeframe: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://formspree.io/f/xdkgyrwd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Service Inquiry - ${selectedService.name}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setIsFormDisabled(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: selectedService.id,
        budget: '',
        currency: 'USD',
        timeframe: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="relative py-20 px-2 sm:px-4 md:px-0 bg-gradient-to-b from-[#f8fafc] via-[#eaf0fa] to-white dark:from-[#1a223a] dark:via-[#232b4a] dark:to-[#10131a] border-t border-[color:var(--color-olive)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[color:var(--color-gold)] rounded-full mb-8" />
      <div className="w-full max-w-[600px] mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#0034EF] via-[#384470] to-[#F0CC00]">Let's Work Together</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-base sm:text-lg">Tell us about your project and we'll get back to you within 24 hours with a detailed proposal.</p>
        {/* Main Form Container */}
        <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-lg p-4 sm:p-6 md:p-10 border border-[color:var(--color-olive)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  className={`w-full p-4 rounded-lg font-semibold shadow transition border border-[color:var(--color-primary)] focus:outline-none text-left text-base sm:text-lg ${
                    selectedService.id === service.id
                      ? 'bg-gradient-to-r from-[color:var(--color-gold)] to-[color:var(--color-orange)] text-black'
                      : 'bg-white text-[color:var(--color-primary)] hover:bg-[color:var(--color-secondary)]/10'
                  } ${isFormDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => {
                    if (!isFormDisabled) {
                      setSelectedService(service);
                      setFormData(prev => ({ ...prev, service: service.id }));
                    }
                  }}
                  disabled={isFormDisabled}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                      <p className="font-bold">{service.name}</p>
                      <p className="text-xs sm:text-sm opacity-80">{service.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="rounded-md border border-[color:var(--color-olive)] px-4 py-2 w-full text-base"
                required
                disabled={status === 'loading' || isFormDisabled}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="rounded-md border border-[color:var(--color-olive)] px-4 py-2 w-full text-base"
                required
                disabled={status === 'loading' || isFormDisabled}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name (Optional)"
                className="rounded-md border border-[color:var(--color-olive)] px-4 py-2 w-full text-base"
                disabled={status === 'loading' || isFormDisabled}
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number (Optional)"
                className="rounded-md border border-[color:var(--color-olive)] px-4 py-2 w-full text-base"
                disabled={status === 'loading' || isFormDisabled}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget</label>
                <div className="relative flex items-center">
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="absolute left-0 top-0 bottom-0 rounded-l-md border border-r-0 border-[color:var(--color-olive)] px-3 py-2 bg-white dark:bg-slate-800 text-sm z-10"
                    required
                    disabled={status === 'loading' || isFormDisabled}
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    className="w-full rounded-md border border-[color:var(--color-olive)] px-4 py-2 pl-20 bg-white dark:bg-slate-800 text-base"
                    required
                    min="0"
                    step="100"
                    disabled={status === 'loading' || isFormDisabled}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Please enter your budget in {currencies.find(c => c.code === formData.currency)?.name}
                </p>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timeline</label>
                <select
                  name="timeframe"
                  value={formData.timeframe}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[color:var(--color-olive)] px-4 py-2 bg-white dark:bg-slate-800 text-base"
                  required
                  disabled={status === 'loading' || isFormDisabled}
                >
                  <option value="">Select Timeline</option>
                  {timeframes.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project, goals, and any specific requirements..."
              className="rounded-md border border-[color:var(--color-olive)] px-4 py-2 min-h-[120px] w-full text-base"
              required
              disabled={status === 'loading' || isFormDisabled}
            />

            <button
              type="submit"
              disabled={status === 'loading' || isFormDisabled}
              className={`w-full bg-gradient-to-r from-[color:var(--color-gold)] to-[color:var(--color-orange)] text-black mt-2 px-6 py-3 rounded-lg font-semibold shadow-none hover:from-[color:var(--color-orange)] hover:to-[color:var(--color-gold)] transition flex items-center justify-center gap-2 ${
                (status === 'loading' || isFormDisabled) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending Inquiry...
                </>
              ) : isFormDisabled ? (
                'Inquiry Sent'
              ) : (
                'Send Inquiry'
              )}
            </button>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 text-green-600 p-4 rounded-lg text-center mt-2"
              >
                <p className="font-medium">Inquiry sent successfully!</p>
                <p className="text-sm mt-1">We'll review your project details and get back to you within 24 hours.</p>
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-600 p-4 rounded-lg text-center mt-2"
              >
                <p className="font-medium">Failed to send inquiry</p>
                <p className="text-sm mt-1">{errorMessage}</p>
              </motion.div>
            )}
          </form>
        </div>

        {/* Contact Info - Now below the form */}
        <div className="mt-8 bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-lg p-4 sm:p-6 md:p-10 border border-[color:var(--color-olive)]">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
            <div className="text-center sm:text-left w-full sm:w-auto">
              <p className="font-semibold text-[color:var(--color-secondary)]">Email</p>
              <a href="mailto:info@fazilabs.com" className="text-[color:var(--color-primary)] font-semibold break-all">info@fazilabs.com</a>
            </div>
            <div className="text-center sm:text-left w-full sm:w-auto">
              <p className="font-semibold text-[color:var(--color-secondary)]">Phone</p>
              <a href="tel:+254706134387" className="text-[color:var(--color-primary)] font-semibold">+254706134387</a>
            </div>
            <div className="text-center sm:text-left w-full sm:w-auto">
              <p className="font-semibold text-[color:var(--color-secondary)] mb-2">Connect with me</p>
              <div className="flex gap-4 justify-center sm:justify-start">
                {socials.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                    <img src={s.icon} alt={s.name} className="w-7 h-7" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 