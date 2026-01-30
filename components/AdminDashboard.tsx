
import React, { useState } from 'react';
import { PaymentRequest, User, Role, DemoPaymentNumber } from '../types';

interface AdminDashboardProps {
  payments: PaymentRequest[];
  demoNumbers: DemoPaymentNumber[];
  onApprove: (paymentId: string) => void;
  onReject: (paymentId: string) => void;
  onAddDemoNumber: (num: string, label: string) => void;
  onRemoveDemoNumber: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  payments, 
  demoNumbers, 
  onApprove, 
  onReject, 
  onAddDemoNumber, 
  onRemoveDemoNumber 
}) => {
  const [activeTab, setActiveTab] = useState<'payments' | 'demo-system' | 'users'>('payments');
  const [newNum, setNewNum] = useState('');
  const [newLabel, setNewLabel] = useState('');

  return (
    <div className="bg-white/70 backdrop-blur-2xl rounded-[3rem] p-12 shadow-apple border border-white/20 min-h-[700px] animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight">System Authority</h2>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">Master Administration</p>
        </div>
        <div className="flex bg-gray-100/50 p-1.5 rounded-2xl border border-gray-200/50 shadow-inner">
          {(['payments', 'demo-system', 'users'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === tab ? 'bg-black text-white shadow-xl' : 'text-gray-400 hover:text-black'}`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'payments' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black">Verification Queue</h3>
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-black">{payments.length} Pending</span>
          </div>
          
          {payments.length === 0 ? (
            <div className="py-32 text-center bg-gray-50/50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No pending transaction records</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {payments.map(p => (
                <div key={p.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex flex-col md:flex-row justify-between items-center shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 font-black italic text-2xl">b</div>
                    <div>
                      <p className="text-lg font-black text-gray-900">{p.studentName}</p>
                      <p className="text-xs text-gray-400 font-mono">TXID: <span className="text-black font-bold uppercase tracking-wider">{p.transactionId}</span></p>
                      <p className="text-[10px] text-gray-400 font-black uppercase mt-1 tracking-widest">{p.courseId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 mt-6 md:mt-0">
                    <div className="text-right">
                      <p className="text-2xl font-black text-blue-600">৳{p.amount}</p>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{new Date(p.timestamp).toLocaleTimeString()}</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => onReject(p.id)} className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                      <button onClick={() => onApprove(p.id)} className="w-12 h-12 bg-green-600 text-white rounded-2xl flex items-center justify-center hover:bg-green-700 transition-all shadow-lg shadow-green-200">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'demo-system' && (
        <div className="space-y-12">
          <div className="bg-black text-white p-10 rounded-[2.5rem] shadow-2xl">
            <h3 className="text-lg font-black mb-6 uppercase tracking-widest text-blue-400">Add Demo Payment Number</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input 
                type="text" 
                placeholder="017XXXXXXXX" 
                className="bg-white/10 border border-white/20 px-6 py-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                value={newNum}
                onChange={e => setNewNum(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Label (e.g. Test Acc 1)" 
                className="bg-white/10 border border-white/20 px-6 py-4 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={newLabel}
                onChange={e => setNewLabel(e.target.value)}
              />
              <button 
                onClick={() => { onAddDemoNumber(newNum, newLabel); setNewNum(''); setNewLabel(''); }}
                className="bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-blue-500 transition-all"
              >
                Inject Number
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoNumbers.map(dn => (
              <div key={dn.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative group">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${dn.isUsed ? 'bg-gray-100 text-gray-400' : 'bg-green-50 text-green-600'}`}>
                    {dn.isUsed ? 'Consumed' : 'Ready'}
                  </span>
                  <button onClick={() => onRemoveDemoNumber(dn.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
                <p className="text-xl font-black font-mono text-gray-900">{dn.number}</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">{dn.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100">
          <p className="text-gray-400 font-black uppercase tracking-[0.2em]">User Matrix Active — Directory Online</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
