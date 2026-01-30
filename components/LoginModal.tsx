
import React, { useState } from 'react';
import { Role } from '../types';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (role: Role, identifier: string, subject?: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [role, setRole] = useState<Role>(Role.STUDENT);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    parentPhone: '',
    class: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      if (identifier === registrationData.parentPhone) {
        alert("Security Protocol Violation: Student phone and Parent phone cannot be identical.");
        return;
      }
      onLogin(Role.STUDENT, identifier);
    } else {
      onLogin(role, identifier);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="bg-white/90 backdrop-blur-3xl w-full max-w-xl rounded-[3rem] shadow-2xl border border-white/40 overflow-hidden">
        <div className="p-12 overflow-y-auto max-h-[90vh]">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-4xl font-black tracking-tighter text-[#1D1D1F]">
                {isRegistering ? 'Enrollment.' : 'Gateway.'}
              </h2>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">
                {isRegistering ? 'Join MGCC Academic Suite' : 'System Authorization'}
              </p>
            </div>
            <button onClick={onClose} className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {!isRegistering && (
            <div className="flex bg-gray-100/50 p-1.5 rounded-2xl mb-10 border border-gray-200/50">
              {([Role.STUDENT, Role.PARENT, Role.TEACHER, Role.ADMIN] as Role[]).map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-3 text-[10px] font-black tracking-widest rounded-xl transition-all ${role === r ? 'bg-white text-black shadow-lg shadow-black/5' : 'text-gray-400 hover:text-black'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegistering && (
              <>
                <div>
                  <label className="block text-[10px] uppercase font-black text-gray-400 tracking-widest mb-2 ml-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-black/5 outline-none transition-all font-bold"
                    placeholder="e.g. Sadiya Afrin"
                    value={registrationData.name}
                    onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-black text-gray-400 tracking-widest mb-2 ml-1">Class</label>
                    <input
                      type="text"
                      required
                      className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-black/5 outline-none transition-all font-bold"
                      placeholder="e.g. HSC 2nd"
                      value={registrationData.class}
                      onChange={(e) => setRegistrationData({...registrationData, class: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black text-gray-400 tracking-widest mb-2 ml-1">Parent Phone</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-black/5 outline-none transition-all font-bold"
                      placeholder="018..."
                      value={registrationData.parentPhone}
                      onChange={(e) => setRegistrationData({...registrationData, parentPhone: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black text-gray-400 tracking-widest mb-2 ml-1">Residential Address</label>
                  <input
                    type="text"
                    required
                    className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-black/5 outline-none transition-all font-bold"
                    placeholder="Full academic address"
                    value={registrationData.address}
                    onChange={(e) => setRegistrationData({...registrationData, address: e.target.value})}
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[10px] uppercase font-black text-gray-400 tracking-widest mb-2 ml-1">
                {isRegistering ? 'Student Phone (Account ID)' : role === Role.TEACHER ? 'Secure 4-Digit ID' : 'Phone / ID'}
              </label>
              <input
                type="text"
                required
                className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-black/5 outline-none transition-all font-bold text-lg"
                placeholder={role === Role.TEACHER ? '1024' : '017...'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-black text-gray-400 tracking-widest mb-2 ml-1">Security Key</label>
              <input
                type="password"
                required
                className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-black/5 outline-none transition-all font-bold"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-6 bg-black text-white rounded-[1.5rem] font-black text-xl shadow-2xl shadow-black/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              {isRegistering ? 'Create Academic Account' : 'Authenticate'}
            </button>
          </form>
          
          <div className="mt-12 pt-10 border-t border-gray-100 flex flex-col items-center gap-4">
            <p className="text-sm text-gray-400 font-bold">
              {isRegistering ? (
                <>Already a member? <button onClick={() => setIsRegistering(false)} className="text-black hover:underline">Sign In</button></>
              ) : (
                <>New to the suite? <button onClick={() => setIsRegistering(true)} className="text-black hover:underline">Register Hub</button></>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
