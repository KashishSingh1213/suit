import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, Edit2, ChevronDown, Package } from 'lucide-react';

const orders = [
  { id: '#ORD-1042', customer: 'Priya Sharma', email: 'priya@email.com', product: 'Banarasi Silk Suit', size: 'M (38)', qty: 1, amount: '₹9,299', status: 'Delivered', date: '27 Jun 2026', payment: 'UPI', city: 'Delhi' },
  { id: '#ORD-1041', customer: 'Anjali Mehta', email: 'anjali@email.com', product: 'Chikankari Suit Set', size: 'L (40)', qty: 2, amount: '₹14,998', status: 'Shipped', date: '27 Jun 2026', payment: 'Card', city: 'Mumbai' },
  { id: '#ORD-1040', customer: 'Ritu Verma', email: 'ritu@email.com', product: 'Anarkali Floral Suit', size: 'S (36)', qty: 1, amount: '₹6,899', status: 'Processing', date: '26 Jun 2026', payment: 'COD', city: 'Jaipur' },
  { id: '#ORD-1039', customer: 'Sunita Joshi', email: 'sunita@email.com', product: 'Gota Patti Sharara', size: 'XL (42)', qty: 1, amount: '₹4,999', status: 'Pending', date: '26 Jun 2026', payment: 'UPI', city: 'Lucknow' },
  { id: '#ORD-1038', customer: 'Deepa Gupta', email: 'deepa@email.com', product: 'Pakistani Straight Suit', size: 'M (38)', qty: 1, amount: '₹4,799', status: 'Delivered', date: '25 Jun 2026', payment: 'Card', city: 'Bangalore' },
  { id: '#ORD-1037', customer: 'Meena Kapoor', email: 'meena@email.com', product: 'Royal Sharara Suit', size: 'L (40)', qty: 1, amount: '₹11,499', status: 'Cancelled', date: '25 Jun 2026', payment: 'UPI', city: 'Chennai' },
  { id: '#ORD-1036', customer: 'Kavita Rao', email: 'kavita@email.com', product: 'Velvet Embroidered Suit', size: 'M (38)', qty: 2, amount: '₹17,998', status: 'Shipped', date: '24 Jun 2026', payment: 'Card', city: 'Hyderabad' },
  { id: '#ORD-1035', customer: 'Sonal Patel', email: 'sonal@email.com', product: 'Cotton Patiala Suit', size: 'S (36)', qty: 3, amount: '₹7,497', status: 'Delivered', date: '24 Jun 2026', payment: 'COD', city: 'Ahmedabad' },
];

const statusConfig = {
  Delivered:  { bg: '#F0FDF8', text: '#10B981', dot: '#10B981' },
  Shipped:    { bg: '#EFF6FF', text: '#3B82F6', dot: '#3B82F6' },
  Processing: { bg: '#FFF7ED', text: '#F59E0B', dot: '#F59E0B' },
  Pending:    { bg: '#FFF1F2', text: '#F43F5E', dot: '#F43F5E' },
  Cancelled:  { bg: '#F9FAFB', text: '#9CA3AF', dot: '#9CA3AF' },
};

const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function Orders() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [orderData, setOrderData] = useState(orders);
  const [expandedId, setExpandedId] = useState(null);

  const filtered = orderData.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search);
    const matchStatus = filterStatus === 'All' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id, newStatus) => {
    setOrderData(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const counts = statusOptions.reduce((acc, s) => {
    acc[s] = orderData.filter(o => o.status === s).length;
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-[#1A1A1A]">Orders</h2>
          <p className="text-sm text-[#9E9189]">{filtered.length} orders</p>
        </div>
      </div>

      {/* Status pills */}
      <div className="flex gap-2 flex-wrap">
        {['All', ...statusOptions].map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filterStatus === s ? 'bg-[#005461] text-white shadow-md shadow-[#005461]/20' : 'bg-white border border-[#C8E8EC] text-[#6B6B6B] hover:bg-[#F8F4F9]'
            }`}
          >
            {s !== 'All' && s in statusConfig && (
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusConfig[s].dot }} />
            )}
            {s} {s !== 'All' && counts[s] !== undefined && <span className="opacity-70">({counts[s]})</span>}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-[#C8E8EC] p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#005461]" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by customer name or order ID..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F5FCFD] border border-[#C8E8EC] rounded-xl text-sm text-[#1A1A1A] placeholder-[#B0A99F] focus:outline-none focus:border-[#005461] focus:shadow-[0_0_0_3px_rgba(0,84,97,0.1)] transition-all"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#C8E8EC] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-[#FDFBF8] border-b border-[#C8E8EC]">
                {['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-bold tracking-widest text-[#9E9189] uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C8E8EC]">
              <AnimatePresence>
                {filtered.map((order, i) => {
                  const sc = statusConfig[order.status];
                  const isExpanded = expandedId === order.id;
                  return (
                    <>
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="hover:bg-[#FDFBF9] transition-colors"
                      >
                        <td className="px-5 py-4">
                          <span className="text-sm font-bold text-[#005461]">{order.id}</span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#C8E8EC] flex items-center justify-center text-xs font-bold text-[#005461] flex-shrink-0">
                              {order.customer.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#1A1A1A]">{order.customer}</p>
                              <p className="text-xs text-[#9E9189]">{order.city}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm text-[#1A1A1A] font-medium max-w-[160px] truncate">{order.product}</p>
                          <p className="text-xs text-[#9E9189]">Size: {order.size} · Qty: {order.qty}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm font-bold text-[#1A1A1A]">{order.amount}</p>
                          <p className="text-xs text-[#9E9189]">{order.payment}</p>
                        </td>
                        <td className="px-5 py-4">
                          <div className="relative">
                            <select
                              value={order.status}
                              onChange={e => updateStatus(order.id, e.target.value)}
                              className="text-xs font-semibold px-3 py-1.5 rounded-full border-0 appearance-none cursor-pointer focus:outline-none pr-6"
                              style={{ background: sc.bg, color: sc.text }}
                            >
                              {statusOptions.map(s => <option key={s}>{s}</option>)}
                            </select>
                            <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: sc.text }} />
                          </div>
                        </td>
                        <td className="px-5 py-4 text-sm text-[#6B6B6B]">{order.date}</td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : order.id)}
                            className="w-8 h-8 rounded-lg bg-[#C8E8EC] flex items-center justify-center hover:bg-[#C8E8EC] transition-colors"
                          >
                            <Eye size={14} className="text-[#6B6B6B]" />
                          </button>
                        </td>
                      </motion.tr>
                      {/* Expanded detail row */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.tr
                            key={`${order.id}-detail`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <td colSpan={7} className="px-5 py-4 bg-[#FDFBF8] border-b border-[#C8E8EC]">
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                                {[
                                  { label: 'Email', value: order.email },
                                  { label: 'Payment', value: order.payment },
                                  { label: 'City', value: order.city },
                                  { label: 'Order Date', value: order.date },
                                ].map(({ label, value }) => (
                                  <div key={label} className="bg-white rounded-xl p-3 border border-[#C8E8EC]">
                                    <p className="text-xs text-[#9E9189] uppercase tracking-wider mb-1">{label}</p>
                                    <p className="font-semibold text-[#1A1A1A]">{value}</p>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
