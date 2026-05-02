import React, { useState } from "react";
import { Award, CheckCircle, ShieldCheck } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

/**
 * VoterPledge — An interactive component implementing the official ECI Voter's Pledge.
 * Allows users to digitally "sign" the pledge to uphold democratic traditions.
 * @returns {JSX.Element} The Voter Pledge section.
 */
export default function VoterPledge() {
  const [name, setName] = useState("");
  const [hasPledged, setHasPledged] = useState(false);

  /**
   * Handles the pledge submission.
   * Triggers a toast notification and updates local component state.
   */
  const handlePledge = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name to take the pledge.");
      return;
    }
    
    setHasPledged(true);
    toast.success("Pledge taken successfully!", {
      icon: "🇮🇳",
      style: {
        borderRadius: "12px",
        background: "#06101d",
        color: "#fff",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      },
    });
  };

  return (
    <section id="pledge" className="pledge-section py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -ml-32 -mb-32"></div>

      <div className="container max-w-4xl">
        <div className="glass-panel p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-accent"></div>
          
          {!hasPledged ? (
            <div className="animate-fade-in">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gradient">The Voter's Pledge</h2>
                  <p className="text-muted text-sm uppercase tracking-widest font-semibold mt-1">An ECI SVEEP Initiative</p>
                </div>
              </div>

              <div className="relative mb-10 p-6 md:p-8 bg-white/5 rounded-2xl border border-white/10 italic leading-relaxed text-lg text-white/90">
                <span className="absolute -top-4 -left-2 text-6xl text-primary/20 font-serif">"</span>
                We, the citizens of India, having abiding faith in democracy, hereby pledge to uphold the democratic traditions of our country and the dignity of free, fair and peaceful elections, and to vote in every election fearlessly and without being influenced by considerations of religion, race, caste, community, language or any inducement.
                <span className="absolute -bottom-10 -right-2 text-6xl text-primary/20 font-serif">"</span>
              </div>

              <form onSubmit={handlePledge} className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                  <label htmlFor="voter-name" className="block text-sm font-medium text-muted mb-2 ml-1">
                    Sign with your full name
                  </label>
                  <input
                    id="voter-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name here..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <button 
                  type="submit"
                  className="btn btn-primary w-full md:w-auto h-[50px] px-8 flex items-center justify-center gap-2 group"
                >
                  <Award size={20} className="group-hover:rotate-12 transition-transform" />
                  Take the Pledge
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-10 animate-scale-in">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/10 text-green-500 mb-8 scale-110">
                <CheckCircle size={48} />
              </div>
              <h2 className="text-4xl font-bold mb-4 text-gradient">Pledge Honored!</h2>
              <p className="text-xl text-white/80 max-w-lg mx-auto leading-relaxed">
                Thank you, <span className="text-primary font-bold">{name}</span>. Your commitment to democratic values strengthens the very foundation of our nation.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <button 
                  onClick={() => setHasPledged(false)}
                  className="text-sm text-muted hover:text-white transition-colors"
                >
                  Edit Name
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster position="bottom-center" />
    </section>
  );
}
