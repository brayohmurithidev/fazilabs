import { useState } from 'react';

const socials = [
  { name: 'LinkedIn', url: '#', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg' },
  { name: 'GitHub', url: '#', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg' },
  { name: 'Twitter', url: '#', icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg' },
];

const services = [
  'Product Design',
  'Website Development',
  'Mobile Apps',
];

export default function ContactModern() {
  const [selectedService, setSelectedService] = useState(services[0]);

  return (
    <section id="contact" className="relative py-20 px-4 md:px-0 bg-gradient-to-b from-[#f8fafc] via-[#eaf0fa] to-white dark:from-[#1a223a] dark:via-[#232b4a] dark:to-[#10131a] border-t border-[color:var(--color-olive)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[color:var(--color-gold)] rounded-full mb-8" />
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-[#0034EF] via-[#384470] to-[#F0CC00]">Contact Me</h2>
        <div className="flex flex-col md:flex-row gap-10 bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-lg p-6 md:p-10 border border-[color:var(--color-olive)]">
          {/* Contact Form */}
          <form className="flex-1 flex flex-col gap-4">
            <div className="flex flex-wrap gap-2 mb-2 justify-center md:justify-start">
              {services.map((service) => (
                <button
                  key={service}
                  type="button"
                  className={`px-4 py-2 rounded-lg font-semibold shadow transition border border-[color:var(--color-primary)] focus:outline-none ${
                    selectedService === service
                      ? 'bg-gradient-to-r from-[color:var(--color-gold)] to-[color:var(--color-orange)] text-black'
                      : 'bg-white text-[color:var(--color-primary)] hover:bg-[color:var(--color-secondary)]/10'
                  }`}
                  onClick={() => setSelectedService(service)}
                >
                  {service}
                </button>
              ))}
            </div>
            {/* Hidden field for selected service */}
            <input type="hidden" name="service" value={selectedService} />
            <input type="text" name="name" placeholder="Name" className="rounded-md border border-[color:var(--color-olive)] px-4 py-2" required />
            <input type="email" name="email" placeholder="Email" className="rounded-md border border-[color:var(--color-olive)] px-4 py-2" required />
            <textarea name="message" placeholder="Message / Project details" className="rounded-md border border-[color:var(--color-olive)] px-4 py-2 min-h-[100px]" required />
            <button type="submit" className="bg-gradient-to-r from-[color:var(--color-gold)] to-[color:var(--color-orange)] text-black mt-2 px-6 py-3 rounded-lg font-semibold shadow-none hover:from-[color:var(--color-orange)] hover:to-[color:var(--color-gold)] transition">Send Message</button>
          </form>
          {/* Contact Info */}
          <div className="flex-1 flex flex-col gap-8 justify-center items-center md:items-start border-t md:border-t-0 md:border-l border-[color:var(--color-olive)] pt-8 md:pt-0 md:pl-10">
            <div>
              <p className="font-semibold text-[color:var(--color-secondary)]">Email</p>
              <a href="mailto:info@fazilabs.com" className="text-[color:var(--color-primary)] font-semibold">info@fazilabs.com</a>
            </div>
            <div>
              <p className="font-semibold text-[color:var(--color-secondary)]">Phone</p>
              <a href="tel:+254706134387" className="text-[color:var(--color-primary)] font-semibold">+254706134387</a>
            </div>
            <div>
              <p className="font-semibold text-[color:var(--color-secondary)] mb-2">Connect with me</p>
              <div className="flex gap-4">
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