import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ShoppingBag, Info } from 'lucide-react';
import { getLookbook } from '../utils/adminStore';

const initialHotspots = [
  {
    id: 1,
    top: '35%',
    left: '42%',
    productName: 'Royal Zari Dupatta',
    price: '₹3,499',
    desc: 'Handwoven pure silk banarasi dupatta with intricate gold zari borders.',
    image: '/designer_suit_1.png',
  },
  {
    id: 2,
    top: '60%',
    left: '55%',
    productName: 'Crimson Anarkali Flare',
    price: '₹14,999',
    desc: 'Voluminous 24-kali silk anarkali with hand-embroidered waist belt.',
    image: '/anarkali_suit.png',
  },
  {
    id: 3,
    top: '75%',
    left: '38%',
    productName: 'Handcrafted Zardozi Kurti',
    price: '₹8,999',
    desc: 'Deep maroon raw silk kurti featuring heavy zardozi neckwork.',
    image: '/sharara_suit.png',
  }
];

const defaultLookbook = {
  bgImage: '/hero_campaign_palace.png',
  hotspots: initialHotspots
};

export default function InteractiveLookbook({ addToCart }) {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [bgImage, setBgImage] = useState(defaultLookbook.bgImage);
  const [hotspots, setHotspots] = useState(defaultLookbook.hotspots);

  const loadLookbook = () => {
    const data = getLookbook(defaultLookbook);
    setBgImage(data.bgImage || defaultLookbook.bgImage);
    setHotspots(data.hotspots || defaultLookbook.hotspots);
  };

  useEffect(() => {
    loadLookbook();
    window.addEventListener('admin-data-updated', loadLookbook);
    return () => window.removeEventListener('admin-data-updated', loadLookbook);
  }, []);

  return (
    <section className="bg-[#FAF9F6] relative h-[100vh] md:h-[120vh] overflow-hidden" id="lookbook">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage} 
          alt="Campaign Lookbook" 
          className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-[#FAF9F6]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6]/80 via-transparent to-transparent" />
      </div>

      {/* Intro Text Overlay */}
      <div className="absolute top-32 left-6 md:left-14 z-10 max-w-lg pointer-events-none">
        <span className="text-[10px] tracking-[0.35em] text-[#BCA58A] uppercase block mb-4 font-bold">Interactive Editorial</span>
        <h2 className="text-4xl md:text-6xl font-light text-[#111111] leading-tight mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Shop The <em className="italic text-[#BCA58A]">Campaign</em>
        </h2>
        <p className="text-[#6B6B6B] text-sm leading-relaxed font-medium">
          Hover or tap the glowing points to explore the individual handcrafted pieces worn in this editorial shoot.
        </p>
      </div>

      {/* Hotspots Container */}
      <div className="absolute inset-0 z-20">
        {hotspots.map((hotspot) => (
          <div 
            key={hotspot.id} 
            className="absolute" 
            style={{ top: hotspot.top, left: hotspot.left }}
          >
            {/* Glowing Dot */}
            <button 
              onClick={() => setActiveHotspot(hotspot)}
              className="relative group cursor-pointer"
            >
              <div className="absolute inset-0 rounded-full bg-[#111111] animate-ping opacity-20 scale-150" />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(250,249,246,0.3)] backdrop-blur-md border ${
                activeHotspot?.id === hotspot.id 
                  ? 'bg-[#111111] border-[#111111] text-[#FAF9F6] scale-110' 
                  : 'bg-black/40 border-[#111111]/50 text-[#111111] hover:bg-[#111111] hover:text-[#FAF9F6] hover:scale-110'
              }`}>
                <Plus size={14} className={`transition-transform duration-300 ${activeHotspot?.id === hotspot.id ? 'rotate-45' : ''}`} />
              </div>
              
              {/* Tooltip hint (only shows on hover when not active) */}
              <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap bg-black/60 backdrop-blur-md border border-[#BCA58A]/30 text-[#111111] text-[10px] uppercase tracking-widest px-3 py-1.5 rounded">
                View Details
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {activeHotspot && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
            className="absolute top-1/2 -translate-y-1/2 right-6 md:right-14 w-full max-w-[340px] bg-[#FAF9F6]/80 backdrop-blur-xl border border-[#BCA58A]/20 shadow-2xl p-6 z-30"
          >
            <button 
              onClick={() => setActiveHotspot(null)}
              className="absolute top-4 right-4 text-[#6B6B6B] hover:text-[#111111] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
            
            <div className="w-full aspect-[4/5] bg-[#E8DDD0] mb-5 overflow-hidden">
              <img src={activeHotspot.image} alt={activeHotspot.productName} className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center gap-2 mb-2 text-[#BCA58A]">
              <Info size={12} />
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase">Spotted in Look 01</span>
            </div>
            
            <h3 className="text-xl font-medium text-[#111111] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {activeHotspot.productName}
            </h3>
            <span className="text-sm font-semibold text-[#BCA58A] block mb-4">{activeHotspot.price}</span>
            
            <p className="text-xs text-[#6B6B6B] leading-relaxed mb-6 border-l border-[#BCA58A]/30 pl-3">
              {activeHotspot.desc}
            </p>

            <button 
              onClick={() => { addToCart(activeHotspot, 'M'); alert('Added to bag'); setActiveHotspot(null); }}
              className="w-full bg-[#111111] hover:bg-[#BCA58A] text-[#FAF9F6] py-3.5 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ShoppingBag size={14} /> Add to Bag
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
