
import React, { useState } from 'react';
import { PRICING_PACKAGES } from '../constants';
import { PricingPackage } from '../types';

const PaymentModal: React.FC<{ 
  pkg: PricingPackage; 
  onClose: () => void; 
  onSuccess: () => void 
}> = ({ pkg, onClose, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({ card: '', expiry: '', cvv: '', name: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API delay
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Secure Checkout</h3>
            <p className="text-slate-400 text-sm">ScoreBoost {pkg.name} Plan</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Initial Enrollment</span>
            <span className="text-2xl font-bold text-slate-900">{pkg.price}</span>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Cardholder Name</label>
              <input 
                required
                type="text" 
                placeholder="Full Name as on card"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Card Number</label>
              <div className="relative">
                <input 
                  required
                  type="text" 
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  onChange={e => setFormData({...formData, card: e.target.value})}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                  <div className="w-6 h-4 bg-slate-200 rounded-sm"></div>
                  <div className="w-6 h-4 bg-slate-300 rounded-sm"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Expiry</label>
                <input 
                  required
                  type="text" 
                  placeholder="MM/YY"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  onChange={e => setFormData({...formData, expiry: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">CVV</label>
                <input 
                  required
                  type="text" 
                  placeholder="000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  onChange={e => setFormData({...formData, cvv: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              disabled={isProcessing}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                  Authorize Enrollment
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>
              PCI DSS Compliant & SSL Secured
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const SuccessModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
    <div className="bg-white rounded-3xl w-full max-w-md p-8 text-center shadow-2xl animate-in zoom-in-95 duration-300">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-2">Welcome to ScoreBoost!</h3>
      <p className="text-slate-500 mb-8 leading-relaxed">
        Your enrollment was successful. A consultant will reach out within 24 hours to begin your forensic audit.
      </p>
      <button 
        onClick={onClose}
        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all"
      >
        Access Client Dashboard
      </button>
    </div>
  </div>
);

const PricingCard: React.FC<{ pkg: PricingPackage; onSelect: (pkg: PricingPackage) => void }> = ({ pkg, onSelect }) => {
  return (
    <div className={`relative flex flex-col p-6 rounded-2xl transition-all duration-300 ${pkg.recommended ? 'bg-slate-900 text-white shadow-xl scale-105 border-2 border-blue-500' : 'bg-white text-slate-900 border border-slate-200'}`}>
      {pkg.recommended && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Best Value
        </span>
      )}
      <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
      <div className="text-3xl font-bold mb-6">{pkg.price} <span className="text-sm font-normal text-slate-400">/mo</span></div>
      <ul className="flex-1 space-y-3 mb-8">
        {pkg.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <svg className={`w-5 h-5 ${pkg.recommended ? 'text-blue-400' : 'text-emerald-500'} shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button 
        onClick={() => onSelect(pkg)}
        className={`w-full py-3 rounded-xl font-semibold transition-colors ${pkg.recommended ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}
      >
        Select Plan
      </button>
    </div>
  );
};

const PricingSection: React.FC = () => {
  const [selectedPkg, setSelectedPkg] = useState<PricingPackage | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <section id="pricing" className="py-20 bg-slate-50 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Simple, Transparent Pricing</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Choose the package that fits your recovery goals. All plans include disputes for all 3 major credit bureaus.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {PRICING_PACKAGES.map(pkg => (
            <PricingCard key={pkg.id} pkg={pkg} onSelect={setSelectedPkg} />
          ))}
        </div>
      </div>

      {selectedPkg && (
        <PaymentModal 
          pkg={selectedPkg} 
          onClose={() => setSelectedPkg(null)} 
          onSuccess={() => {
            setSelectedPkg(null);
            setShowSuccess(true);
          }}
        />
      )}

      {showSuccess && (
        <SuccessModal onClose={() => setShowSuccess(false)} />
      )}
    </section>
  );
};

export default PricingSection;
