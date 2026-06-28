import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getPromo } from '../utils/adminStore';

const staticFabrics = [
  { name: 'Heritage Banarasi Silk', image: '/banarasi_suit.png', desc: 'Handwoven pure zari panels.' },
  { name: 'Lucknowi Chikankari', image: '/chikankari_suit.png', desc: 'Detailed shadow stitch artistry.' },
  { name: 'Summer Gota Patti', image: '/sharara_suit.png', desc: 'Traditional royal gold borders.' }
];

const defaultPromo = {
  title: 'Summer Festive Edit',
  discount: '40',
  couponCode: 'FESTIVE40',
  endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  endTime: '23:59',
  fabrics: staticFabrics,
};

export default function SpecialOffer() {
  const [promo, setPromo] = useState(defaultPromo);
  const [fabrics, setFabrics] = useState(staticFabrics);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [copied, setCopied] = useState(false);
  const [activeFabric, setActiveFabric] = useState(0);

  const loadPromoData = () => {
    const data = getPromo(defaultPromo);
    setPromo(data);
    setFabrics(data.fabrics || staticFabrics);
  };

  useEffect(() => {
    loadPromoData();
    window.addEventListener('admin-data-updated', loadPromoData);
    return () => window.removeEventListener('admin-data-updated', loadPromoData);
  }, []);

  useEffect(() => {
    if (!promo.endDate) return;

    const calculateTimeLeft = () => {
      const endDateTimeStr = `${promo.endDate}T${promo.endTime || '00:00'}:00`;
      const difference = +new Date(endDateTimeStr) - +new Date();
      
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [promo]);

  const formatNumber = (num) => String(num).padStart(2, '0');

  const timerItems = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hrs' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' },
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promo.couponCode || 'FESTIVE40');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextFabric = () => {
    setActiveFabric((prev) => (prev + 1) % fabrics.length);
  };

  const prevFabric = () => {
    setActiveFabric((prev) => (prev - 1 + fabrics.length) % fabrics.length);
  };

  return (
    <section className="py-28 bg-[#FAF9F6] overflow-hidden relative text-left">
      
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 100 C 200 300, 400 0, 1000 200" fill="none" stroke="#BCA58A" strokeWidth="0.8" />
          <path d="M0 300 C 300 500, 600 200, 1200 400" fill="none" stroke="#BCA58A" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] tracking-[0.35em] text-[#BCA58A] uppercase block mb-4 font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Seasonal Promotion
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-[#111111] mb-5 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {promo.title}<br />
              <em className="italic text-[#BCA58A]">Up to {promo.discount}% Off</em>
            </h2>
            
            <p className="text-[#6B6B6B] text-sm mb-10 leading-relaxed max-w-lg"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Indulge in our collection of hand-embroidered salwar suits, designer anarkalis, and premium silk sets. Verified craftsmanship at irresistible prices.
            </p>

            {/* Countdown Clock Grid */}
            <div className="flex gap-4 mb-10">
              {timerItems.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#E8DDD0] border border-[#BCA58A]/20 flex items-center justify-center text-2xl md:text-3xl font-light text-[#111111] hover:border-[#BCA58A]/50 transition-all duration-300 relative"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {formatNumber(item.value)}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#BCA58A]/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-[9px] tracking-[0.2em] text-[#BCA58A] uppercase mt-2 font-semibold"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Interactive Promo Coupon code */}
            <div className="mb-10 flex flex-wrap items-center gap-4">
              <span className="text-xs tracking-wider text-[#111111]/70 font-semibold">USE DISCOUNT CODE:</span>
              <button
                onClick={handleCopyCode}
                className="group relative bg-[#BCA58A]/10 hover:bg-[#BCA58A]/20 border border-dashed border-[#BCA58A] px-5 py-2.5 rounded-xl text-[#111111] font-mono font-bold tracking-widest text-sm flex items-center gap-2.5 transition-all duration-300"
              >
                <span>{promo.couponCode || 'FESTIVE40'}</span>
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} className="text-[#BCA58A] group-hover:text-[#111111]" />}
                
                {/* Floating tooltip */}
                <AnimatePresence>
                  {copied && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: -45 }}
                      exit={{ opacity: 0 }}
                      className="absolute left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold py-1 px-3 rounded shadow-lg uppercase tracking-wider"
                    >
                      Copied!
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(188,165,138,0.2)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-[#BCA58A] hover:bg-[#BCA58A] text-[#FAF9F6] px-10 py-4 tracking-[0.25em] text-[10px] font-bold transition-colors group cursor-pointer"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              SHOP THE SALE
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right Side Visual Showcase (Fabric Carousel) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative justify-self-center lg:justify-self-end w-full max-w-md"
          >
            {/* Elegant Fabric Pattern Photo */}
            <div className="aspect-[4/3] overflow-hidden bg-[#FAF9F6] relative border border-[#BCA58A]/15 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeFabric}
                  src={fabrics[activeFabric].image}
                  alt={fabrics[activeFabric].name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover object-top"
                />
              </AnimatePresence>
              
              <div className="absolute inset-4 border border-white/20 rounded-2xl pointer-events-none"></div>

              {/* Slider Controls */}
              <button
                onClick={prevFabric}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/55 hover:bg-[#BCA58A] text-white transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextFabric}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/55 hover:bg-[#BCA58A] text-white transition-colors cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>

              {/* Fabric label overlay */}
              <div className="absolute bottom-4 left-6 right-6 bg-black/50 backdrop-blur-md p-3.5 rounded-xl border border-white/10 text-left">
                <span className="text-[9px] font-bold text-[#BCA58A] tracking-widest uppercase block mb-0.5">Fabric Zoom Showcase</span>
                <h4 className="text-xs font-semibold text-white tracking-wide">{fabrics[activeFabric].name}</h4>
                <p className="text-[10px] text-gray-300 mt-0.5">{fabrics[activeFabric].desc}</p>
              </div>
            </div>

            {/* Float Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 bg-white border border-[#111111]/10 p-5 rounded-2xl shadow-xl text-left max-w-[180px] hidden sm:block"
            >
              <span className="text-[9px] font-bold text-[#BCA58A] tracking-widest uppercase block mb-1">
                Special Offer
              </span>
              <p className="text-xs font-semibold text-[#111111] leading-snug">
                Free shipping on orders over ₹4,999
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
