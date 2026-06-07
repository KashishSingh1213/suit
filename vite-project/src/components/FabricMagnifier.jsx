import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export default function FabricMagnifier() {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bgPosition, setBgPosition] = useState({ x: '50%', y: '50%' });

  // High-res image for the fabric details
  const fabricImage = '/chikankari_suit.png'; // We'll use this as our intricate fabric

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Position of cursor relative to the container
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Calculate percentage for the zoomed background position
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    setPosition({ x, y });
    setBgPosition({ x: `${xPercent}%`, y: `${yPercent}%` });
  };

  return (
    <section className="relative w-full bg-[#111111] py-32 overflow-hidden" id="fabric-zoom">
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left Side: Typography */}
        <div className="w-full lg:w-1/3">
          <span className="text-[#BCA58A] text-[10px] tracking-[0.4em] uppercase font-bold mb-6 block" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The Microscopic Detail
          </span>
          <h2 className="text-5xl md:text-6xl font-light text-[#FAF9F6] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Feel the <br/>
            <em className="italic text-[#BCA58A]">Texture</em>
          </h2>
          <p className="text-[#FAF9F6]/70 text-sm tracking-widest leading-relaxed font-medium mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Our embroidery is so dense, it requires up to 500 stitches per square inch. Hover over the garment to inspect the microscopic precision of our master artisans.
          </p>
          
          <div className="flex items-center gap-4 text-[#BCA58A]">
            <Search size={16} className="animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Interactive Zoom Enabled</span>
          </div>
        </div>

        {/* Right Side: The Interactive Magnifier Canvas */}
        <div className="w-full lg:w-2/3">
          <div 
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            className="relative w-full aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden cursor-crosshair bg-[#1E1E1E]"
          >
            {/* The Base Image */}
            <img 
              src={fabricImage} 
              alt="Fabric Detail" 
              className="w-full h-full object-cover object-top opacity-60"
            />
            
            {/* Dark Cinematic Overlay to make the zoom pop more */}
            <div className="absolute inset-0 bg-[#111111]/30 pointer-events-none" />

            {/* The Magnifying Glass Lens */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="absolute pointer-events-none z-10 rounded-full border-4 border-[#BCA58A]/30 shadow-2xl backdrop-blur-sm"
                style={{
                  width: '250px',
                  height: '250px',
                  left: `${position.x - 125}px`, // Center the lens on cursor (250 / 2)
                  top: `${position.y - 125}px`,
                  backgroundImage: `url(${fabricImage})`,
                  backgroundSize: '400% 400%', // 4x Zoom
                  backgroundPosition: `${bgPosition.x} ${bgPosition.y}`,
                  backgroundRepeat: 'no-repeat',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.1)'
                }}
              >
                {/* Crosshair inside the lens */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <div className="w-4 h-[1px] bg-[#FAF9F6]"></div>
                  <div className="h-4 w-[1px] bg-[#FAF9F6] absolute"></div>
                </div>
              </motion.div>
            )}
            
            {/* Prompt text if not hovered */}
            {!isHovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <span className="bg-[#111111]/80 backdrop-blur-md text-[#FAF9F6] border border-[#FAF9F6]/10 px-6 py-3 rounded-full text-[10px] tracking-[0.3em] font-bold uppercase shadow-2xl flex items-center gap-3">
                  <Search size={14} className="text-[#BCA58A]" />
                  Hover to Magnify
                </span>
              </motion.div>
            )}
            
          </div>
        </div>

      </div>
    </section>
  );
}
