export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/[0.05] pt-20 pb-10 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold tracking-[0.3em] uppercase text-white mb-2">
              LUXORA
            </div>
            <p className="text-zinc-500 font-light max-w-sm">
              The uncompromising intersection of high-fidelity acoustic engineering and architectural design.
            </p>
          </div>
          
          <nav aria-label="Footer Navigation" className="grid grid-cols-2 gap-12 md:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white mb-2">Product</h4>
              <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors" aria-label="Features">Architecture</a>
              <a href="#experience" className="text-sm text-zinc-400 hover:text-white transition-colors" aria-label="Experience">Experience</a>
              <a href="#customize" className="text-sm text-zinc-400 hover:text-white transition-colors" aria-label="Order">Order</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white mb-2">Corporate</h4>
              <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors" aria-label="Privacy Policy">Privacy Policy</a>
              <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors" aria-label="Terms of Service">Terms of Service</a>
              <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors" aria-label="Contact Us">Contact Support</a>
            </div>
          </nav>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-zinc-600 tracking-wide">
            &copy; {new Date().getFullYear()} LUXORA Acoustics Inc. All rights reserved.
          </div>
          <div className="text-xs text-zinc-600 flex gap-4">
            <span>Designed in California.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
