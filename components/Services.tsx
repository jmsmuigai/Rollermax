'use client';

import { ShieldCheck, Globe, Clock, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const serviceConfigs = [
  {
    title: "International Shipping",
    desc: "Seamless customs clearance and global delivery network spanning 220+ countries.",
    color: "bg-roller-blue",
    icon: "Aeroplane"
  },
  {
    title: "Express Logistics",
    desc: "Same-day and next-day delivery options for your most time-critical shipments.",
    color: "bg-roller-red",
    icon: "Motorcycle"
  },
  {
    title: "Secure Cargo",
    desc: "AI-monitored fleet ensuring 100% safety and transparency for high-value goods.",
    color: "bg-slate-800",
    icon: "Lorry"
  }
];

const Services = () => {
  const [imageMap, setImageMap] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadImages() {
      try {
        const res = await fetch('/images/manifest.json');
        if (!res.ok) return;
        const list = await res.json();
        const map: Record<string, string> = {};
        ['Aeroplane', 'Motorcycle', 'Lorry'].forEach(name => {
          const img = list.find((f: string) => new RegExp(name, 'i').test(f));
          if (img) map[name] = `/images/${img}`;
        });
        setImageMap(map);
      } catch (e) {
        // ignore
      }
    }
    loadImages();
  }, []);

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-roller-dark mb-4">World-Class Services</h2>
          <p className="text-gray-600">Tailored logistics solutions designed to keep your business moving forward.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceConfigs.map((item, idx) => (
            <div key={idx} className="group p-8 rounded-3xl border border-gray-100 hover:border-transparent hover:shadow-float transition-all duration-300 bg-white hover:bg-gradient-to-b hover:from-white hover:to-blue-50 relative overflow-hidden">
              {imageMap[item.icon] && (
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-15 transition-opacity pointer-events-none">
                  <Image
                    src={imageMap[item.icon]}
                    alt={item.title}
                    width={128}
                    height={128}
                    className="object-contain"
                  />
                </div>
              )}
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform relative z-10`}>
                {item.icon === 'Aeroplane' && <Globe className="w-8 h-8 text-white" />}
                {item.icon === 'Motorcycle' && <Clock className="w-8 h-8 text-white" />}
                {item.icon === 'Lorry' && <ShieldCheck className="w-8 h-8 text-white" />}
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
