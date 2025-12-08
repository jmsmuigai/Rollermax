'use client';

import { ShieldCheck, Globe, Clock, BarChart3, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <Globe className="w-8 h-8 text-white" />,
    title: "International Shipping",
    desc: "Seamless customs clearance and global delivery network spanning 220+ countries.",
    color: "bg-roller-blue"
  },
  {
    icon: <Clock className="w-8 h-8 text-white" />,
    title: "Express Logistics",
    desc: "Same-day and next-day delivery options for your most time-critical shipments.",
    color: "bg-roller-red"
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    title: "Secure Cargo",
    desc: "AI-monitored fleet ensuring 100% safety and transparency for high-value goods.",
    color: "bg-slate-800"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-roller-dark mb-4">World-Class Services</h2>
          <p className="text-gray-600">Tailored logistics solutions designed to keep your business moving forward.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item, idx) => (
            <div key={idx} className="group p-8 rounded-3xl border border-gray-100 hover:border-transparent hover:shadow-float transition-all duration-300 bg-white hover:bg-gradient-to-b hover:from-white hover:to-blue-50">
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-roller-dark">{item.title}</h3>
              <p className="text-gray-600 mb-6">{item.desc}</p>
              <a href="#" className="text-roller-blue font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn more <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Services;
