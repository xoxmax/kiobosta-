
import React, { useState } from 'react';
import { Course } from '../types';

interface PaymentModalProps {
  course: Course;
  onClose: () => void;
  onSubmit: (txId: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ course, onClose, onSubmit }) => {
  const [txId, setTxId] = useState('');

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-pink-600 p-6 flex justify-center">
           <div className="bg-white px-6 py-2 rounded-lg font-black text-pink-600 text-2xl tracking-tighter italic">bKash</div>
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Course Enrollment</h2>
          <div className="bg-gray-50 p-4 rounded-xl mb-6">
            <p className="text-sm text-gray-500 uppercase font-bold tracking-widest mb-1">Payable Amount</p>
            <p className="text-3xl font-black text-gray-900">৳{course.price}</p>
            <p className="text-xs text-gray-400 mt-2">Course: {course.title}</p>
          </div>
          
          <div className="space-y-4 mb-8 text-sm text-gray-600">
             <p className="flex items-start">
               <span className="bg-pink-100 text-pink-600 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">1</span>
               Send Money to: <span className="font-bold ml-1">017XXXXXXXX (Personal)</span>
             </p>
             <p className="flex items-start">
               <span className="bg-pink-100 text-pink-600 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">2</span>
               Enter the Transaction ID below for verification.
             </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Transaction ID</label>
            <input
              type="text"
              placeholder="e.g. 7X23K92L"
              className="w-full px-4 py-3 border-2 border-pink-100 focus:border-pink-500 rounded-xl outline-none transition-all uppercase font-mono font-bold text-lg text-center tracking-widest"
              value={txId}
              onChange={(e) => setTxId(e.target.value)}
            />
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={onClose}
              className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit(txId)}
              disabled={!txId}
              className="flex-[2] py-3 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-300 text-white font-bold rounded-xl shadow-lg transition-all"
            >
              Verify Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
