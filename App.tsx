
import React from 'react';
import ChatWidget from './components/ChatWidget';
import PricingSection from './components/PricingSection';
import CreditChart from './components/CreditChart';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center font-black italic text-xl shadow-lg">SB</div>
            <span className="text-xl font-bold tracking-tighter text-slate-900">SCOREBOOST <span className="text-blue-600">ELITE</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#results" className="hover:text-blue-600 transition-colors">Our Method</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#reviews" className="hover:text-blue-600 transition-colors">Client Reviews</a>
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-md active:scale-95">
              Start Evaluation
            </button>
          </div>
        </div>
      </nav>

      {/* Hero / Main Body */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Prop */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100">
              Credit Restoration Specialist
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1]">
              Legacy-Level <br />
              <span className="text-blue-600">Credit Repair.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-xl leading-relaxed">
              We specialize in the surgical removal of negative accounts across all 3 bureaus. Bankruptcies, repossessions, and collections aren't permanent. We prove it.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold">15k+</div>
                <div className="text-sm font-medium text-slate-600">Negative items removed in 2024</div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold">98%</div>
                <div className="text-sm font-medium text-slate-600">Client satisfaction rate</div>
              </div>
            </div>

            <CreditChart />
          </div>

          {/* Right Column: AI Assistant */}
          <div className="lg:col-span-5 relative h-[600px]">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 blur-3xl rounded-full"></div>
            <ChatWidget />
          </div>
        </div>

        {/* Pricing Section */}
        <PricingSection />

        {/* Features / Why Us */}
        <section id="results" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="flex-1">
                <img 
                  src="https://picsum.photos/seed/credit/800/600" 
                  alt="Financial Success" 
                  className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="flex-1 space-y-8">
                <h2 className="text-4xl font-bold text-slate-900 leading-tight">The ScoreBoost Elite Difference</h2>
                <div className="space-y-6">
                  {[
                    { title: "Aggressive Bureau Disputes", desc: "We don't just send one letter. We use secondary credit data to force bureaus to verify every detail." },
                    { title: "Direct Creditor Negotiation", desc: "Our Elite package includes direct outreach to banks to settle or remove lingering collections." },
                    { title: "Advanced Account Analysis", desc: "Every client gets a deep-dive audit to find technical reporting errors 90% of people miss." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 font-bold text-xs">{i+1}</div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-white text-slate-950 w-8 h-8 rounded-lg flex items-center justify-center font-black italic text-lg shadow-lg">SB</div>
              <span className="text-lg font-bold tracking-tighter">SCOREBOOST ELITE</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              ScoreBoost Elite is a premier credit restoration firm. We are dedicated to accuracy in consumer reporting. Individual results depend on your unique history.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Contact</h4>
            <p className="text-slate-400 text-sm">info@scoreboostelite.com</p>
            <p className="text-slate-400 text-sm">1-800-RESTORE-MY-CREDIT</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Social</h4>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"></div>
              <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"></div>
              <div className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"></div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-slate-900 text-slate-500 text-xs flex flex-col md:flex-row justify-between gap-4">
          <p>© 2024 ScoreBoost Elite. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span>
            <span className="cursor-pointer hover:text-white transition-colors">CROA Disclosure</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
