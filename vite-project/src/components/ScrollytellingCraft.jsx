import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const storySteps = [
  {
    id: 1,
    subtitle: 'The Heritage',
    title: 'Woven by Masters',
    text: 'We partner directly with over 40+ heritage weavers across Banaras and Lucknow. Each thread is a testament to centuries of ancestral knowledge.',
    image: '/designer_suit_1.png'
  },
  {
    id: 2,
    subtitle: 'The Artistry',
    title: '140 Hours of Precision',
    text: 'From hand-sewn zardozi wires to meticulously applied gota patti pieces, a single garment requires between 12 to 140 hours of intensive handcrafted work.',
    image: '/chikankari_suit.png'
  },
  {
    id: 3,
    subtitle: 'The Promise',
    title: 'Inspected to Perfection',
    text: 'Our masters inspect every suit across four strict stages: fabric strength, embroidery lock checks, seam density, and fit measurements.',
    image: '/hero_campaign_palace.png'
  }
];

export default function InteractivePillarsCraft() {
  return (
    <section className="relative w-full bg-[#FAF9F6] pt-12 pb-32" id="craftsmanship">
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-[#BCA58A] text-[10px] tracking-[0.4em] uppercase font-bold mb-4 block" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              The Anatomy of a Masterpiece
            </span>
            <h2 className="text-5xl md:text-7xl font-light text-[#111111]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Uncompromising <br/>
              <em className="italic text-[#BCA58A]">Craftsmanship</em>
            </h2>
          </div>
          <p className="text-[#6B6B6B] text-xs tracking-widest font-bold max-w-sm uppercase leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Perfection is not an option; it is the fundamental standard woven into every garment we create.
          </p>
        </div>

        {/* The Pillar Grid */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-auto lg:h-[70vh]">
          {storySteps.map((step) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: step.id * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex-1 rounded-2xl overflow-hidden cursor-pointer bg-[#111111] min-h-[400px] lg:min-h-0"
            >
              {/* Background Image */}
              <img 
                src={step.image} 
                alt={step.title} 
                className="absolute inset-0 w-full h-full object-cover object-center opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/30 to-transparent transition-opacity duration-500 group-hover:opacity-60" />
              
              {/* Glassmorphism Hover Overlay */}
              <div className="absolute inset-0 bg-[#111111]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

              {/* Content Container */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                
                {/* Number Indicator */}
                <div className="mb-auto opacity-0 group-hover:opacity-100 transform -translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  <span className="text-[#FAF9F6] text-[10px] tracking-[0.4em] font-bold font-mono border border-[#FAF9F6]/20 rounded-full px-4 py-2 backdrop-blur-md bg-[#FAF9F6]/10">
                    0{step.id}
                  </span>
                </div>

                {/* Text Container that naturally pushes title up */}
                <div className="flex flex-col">
                  {/* Always Visible Title */}
                  <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
                    <span className="text-[#BCA58A] text-[9px] tracking-[0.3em] font-bold uppercase mb-3 block" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {step.subtitle}
                    </span>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl text-[#FAF9F6] font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {step.title}
                    </h3>
                  </div>
                  
                  {/* Text Reveal on Hover (Expands height naturally) */}
                  <div className="grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100 mt-0 group-hover:mt-4">
                    <div className="overflow-hidden">
                      <p className="text-[#FAF9F6]/90 text-sm tracking-wide leading-relaxed font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {step.text}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
