import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage({ cart, setView, clearCart }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId] = useState(() => 'GN-' + Math.floor(100000 + Math.random() * 900000));

  const getSubtotal = () => cart.reduce((total, item) => {
    const priceNum = parseInt(item.price.replace(/[^\d]/g, ''), 10);
    return total + priceNum * item.quantity;
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in Name, Phone Number, and Shipping Address.');
      return;
    }
    // Set view to order placed/success panel
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-[700px] mx-auto px-6 pt-36 pb-24 text-center min-h-[70vh] text-[#111111]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="flex flex-col items-center gap-6 border border-[#BCA58A]/20 bg-white p-10 md:p-12 shadow-2xl rounded">
          <CheckCircle2 size={64} className="text-[#BCA58A]" />
          
          <h2 className="text-4xl font-light text-[#111111] tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Order Initiated
          </h2>

          <div className="w-16 h-px bg-[#BCA58A]/30" />

          <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-[500px]">
            Thank you, <strong>{formData.name}</strong>! We have created your order record. To finalize shipping and place the order, please complete the Google Pay payment step below.
          </p>

          <div className="w-full bg-[#FAF9F6] border border-[#BCA58A]/15 p-6 rounded text-left space-y-3">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#6B6B6B] uppercase tracking-wider">Order ID:</span>
              <span className="text-[#111111]">{orderId}</span>
            </div>
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#6B6B6B] uppercase tracking-wider">Total Amount:</span>
              <span className="text-[#BCA58A] text-sm">₹{getSubtotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#6B6B6B] uppercase tracking-wider">Shipping Address:</span>
              <span className="text-[#111111] text-right">{formData.address}, {formData.city}, {formData.state} - {formData.zip}</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 mt-4 w-full">
            <span className="text-xs uppercase tracking-widest text-[#BCA58A] font-bold">Scan to Pay</span>
            <div className="w-48 h-48 bg-white border border-[#BCA58A]/20 p-2 shadow-inner rounded flex items-center justify-center">
              <img src="/gpay_qr_code.png" alt="Google Pay QR Code" className="w-full h-full object-contain" />
            </div>

            <div className="bg-[#BCA58A]/10 border-l-2 border-[#BCA58A] p-5 text-left w-full rounded-r">
              <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">Instructions to Dispatch:</h4>
              <p className="text-xs text-[#111111] leading-relaxed">
                <strong>Step 1:</strong> Scan the Google Pay QR code above and pay <strong>₹{getSubtotal().toLocaleString()}</strong>.
              </p>
              <p className="text-xs text-[#111111] leading-relaxed mt-2">
                <strong>Step 2:</strong> Take a screenshot of the payment receipt.
              </p>
              <p className="text-xs text-[#111111] leading-relaxed mt-2">
                <strong>Step 3:</strong> Click below to send the screenshot on WhatsApp to <span className="font-bold">+91 9877275894</span> along with your **Order ID ({orderId})**.
              </p>
            </div>

            <a 
              href={`https://wa.me/919877275894?text=Hi,%20I%20have%20paid%20for%20order%20${orderId}.%20Here%20is%20my%20payment%20screenshot.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                // Clear the cart on complete order click
                clearCart();
              }}
              className="w-full bg-[#BCA58A] hover:bg-[#9A8268] text-[#FAF9F6] py-4 rounded text-xs font-bold tracking-[0.25em] flex items-center justify-center gap-2.5 transition-colors shadow-lg cursor-pointer uppercase mt-2"
            >
              Send Screenshot on WhatsApp
            </a>

            <button 
              onClick={() => {
                clearCart();
                setView('home');
              }}
              className="text-xs text-[#6B6B6B] hover:text-[#111111] underline font-semibold mt-4 transition-colors cursor-pointer"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-[1200px] mx-auto px-6 pt-32 pb-24 min-h-[85vh] text-[#111111]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <button 
        onClick={() => setView('cart')} 
        className="flex items-center gap-2 text-xs tracking-widest text-[#BCA58A] uppercase font-bold mb-8 hover:text-[#111111] transition-colors cursor-pointer"
      >
        <ArrowLeft size={14} />
        <span>Return to Bag</span>
      </button>

      <h1 className="text-4xl md:text-5xl font-light mb-12 tracking-tight text-[#111111]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Shipping Form */}
        <div className="lg:col-span-2 bg-white border border-[#BCA58A]/10 p-8 shadow-sm rounded">
          <h3 className="text-xl font-light border-b border-[#BCA58A]/10 pb-4 mb-6 text-[#111111]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Shipping Details
          </h3>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 text-left">
                <label className="text-[10px] uppercase tracking-widest text-[#6B6B6B] font-bold">Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formData.name} 
                  onChange={handleInputChange}
                  className="w-full bg-[#FAF9F6] border border-[#BCA58A]/20 focus:border-[#BCA58A] outline-none p-3.5 text-sm transition-colors rounded"
                  placeholder="e.g. Gurpreet Singh"
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-[10px] uppercase tracking-widest text-[#6B6B6B] font-bold">Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  value={formData.phone} 
                  onChange={handleInputChange}
                  className="w-full bg-[#FAF9F6] border border-[#BCA58A]/20 focus:border-[#BCA58A] outline-none p-3.5 text-sm transition-colors rounded"
                  placeholder="e.g. +91 98765 43210"
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <label className="text-[10px] uppercase tracking-widest text-[#6B6B6B] font-bold">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange}
                className="w-full bg-[#FAF9F6] border border-[#BCA58A]/20 focus:border-[#BCA58A] outline-none p-3.5 text-sm transition-colors rounded"
                placeholder="e.g. gurpreet@example.com"
              />
            </div>

            <div className="space-y-2 text-left">
              <label className="text-[10px] uppercase tracking-widest text-[#6B6B6B] font-bold">Street Address *</label>
              <input 
                type="text" 
                name="address" 
                required 
                value={formData.address} 
                onChange={handleInputChange}
                className="w-full bg-[#FAF9F6] border border-[#BCA58A]/20 focus:border-[#BCA58A] outline-none p-3.5 text-sm transition-colors rounded"
                placeholder="Apartment, House number, street address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 text-left">
                <label className="text-[10px] uppercase tracking-widest text-[#6B6B6B] font-bold">City *</label>
                <input 
                  type="text" 
                  name="city" 
                  required 
                  value={formData.city} 
                  onChange={handleInputChange}
                  className="w-full bg-[#FAF9F6] border border-[#BCA58A]/20 focus:border-[#BCA58A] outline-none p-3.5 text-sm transition-colors rounded"
                  placeholder="e.g. Amritsar"
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-[10px] uppercase tracking-widest text-[#6B6B6B] font-bold">State *</label>
                <input 
                  type="text" 
                  name="state" 
                  required 
                  value={formData.state} 
                  onChange={handleInputChange}
                  className="w-full bg-[#FAF9F6] border border-[#BCA58A]/20 focus:border-[#BCA58A] outline-none p-3.5 text-sm transition-colors rounded"
                  placeholder="e.g. Punjab"
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-[10px] uppercase tracking-widest text-[#6B6B6B] font-bold">ZIP / Postal Code *</label>
                <input 
                  type="text" 
                  name="zip" 
                  required 
                  value={formData.zip} 
                  onChange={handleInputChange}
                  className="w-full bg-[#FAF9F6] border border-[#BCA58A]/20 focus:border-[#BCA58A] outline-none p-3.5 text-sm transition-colors rounded"
                  placeholder="e.g. 143001"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#111111] hover:bg-[#BCA58A] hover:text-[#FAF9F6] text-[#FAF9F6] py-4 text-xs font-bold tracking-[0.25em] transition-colors cursor-pointer uppercase rounded"
            >
              Continue to Payment Step
            </button>
          </form>
        </div>

        {/* Order Summary Panel */}
        <div className="border border-[#BCA58A]/15 bg-white p-8 space-y-6 shadow-md rounded">
          <h3 className="text-xl font-light border-b border-[#BCA58A]/10 pb-4 text-[#111111]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Order Review
          </h3>

          <div className="divide-y divide-[#BCA58A]/10 max-h-[280px] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="py-4 flex gap-4 first:pt-0 last:pb-0 text-left">
                <div className="w-14 h-18 bg-[#E8DDD0] overflow-hidden flex-shrink-0 border border-[#BCA58A]/5">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-[#111111] truncate">{item.name}</h4>
                  <span className="text-[9px] text-[#6B6B6B] block">Qty: {item.quantity} · Size: {item.size}</span>
                  <span className="text-xs font-semibold text-[#BCA58A] block mt-1">{item.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#BCA58A]/15 pt-4 space-y-2 text-xs uppercase tracking-wider font-semibold text-[#6B6B6B]">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span className="text-[#111111]">₹{getSubtotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-[#111111]">FREE</span>
            </div>
            <div className="border-t border-[#BCA58A]/10 mt-2 pt-2 flex justify-between text-sm text-[#111111] font-bold">
              <span>Grand Total</span>
              <span className="text-[#BCA58A]">₹{getSubtotal().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
