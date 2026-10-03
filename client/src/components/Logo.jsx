export default function Logo({ className = "h-8" }) {
  return (
    <div className={`flex items-center gap-2.5 font-sans select-none ${className}`}>
      {/* Sleek Isometric Multi-layer UI Vector Icon */}
      <svg className="w-8 h-8" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bloxyGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff7675" />
            <stop offset="100%" stopColor="#d63031" />
          </linearGradient>
          <linearGradient id="bloxyGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a29bfe" />
            <stop offset="100%" stopColor="#6c5ce7" />
          </linearGradient>
          <filter id="bloxyGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Bottom Layer Plate */}
        <path d="M18 28L6 21.5L18 15L30 21.5L18 28Z" fill="#1e1e38" stroke="#484878" strokeWidth="1.5" />
        {/* Middle Layer Plate (Accent) */}
        <path d="M18 22L7 16L18 10L29 16L18 22Z" fill="url(#bloxyGrad2)" fillOpacity="0.4" stroke="#a29bfe" strokeWidth="1.5" />
        {/* Top Floating Glass Plate */}
        <path d="M18 16L8 10.5L18 5L28 10.5L18 16Z" fill="url(#bloxyGrad1)" stroke="#ffffff" strokeWidth="1.8" filter="url(#bloxyGlow)" />
        {/* Sparkle Glint */}
        <circle cx="28" cy="10.5" r="1.5" fill="#ffffff" />
      </svg>

      {/* Modern Developer Typography */}
      <div className="flex items-baseline tracking-tight">
        <span className="font-extrabold text-xl text-white tracking-wider">BLOXY</span>
        <span className="font-black text-xl text-[#ff7675] ml-0.5">UI</span>
      </div>
    </div>
  );
}
