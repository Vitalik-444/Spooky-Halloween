export const JackOLanternIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`inline-block transition-transform hover:scale-110 ${className}`}
  >
    <path
      d="M11 2C11 2 12 4 14 4C14.5 4 15 3.5 15 3"
      stroke="#5d8a36"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M12 4C7.5 4 4 7.5 4 12C4 16.5 7.5 20 12 20C16.5 20 20 16.5 20 12C20 7.5 16.5 4 12 4Z"
      fill="#ff7518"
      stroke="#b24300"
      strokeWidth="1"
    />
    <path
      d="M9 4.5C7.2 6.5 6 9 6 12C6 15 7.2 17.5 9 19.5M15 4.5C16.8 6.5 18 9 18 12C18 15 16.8 17.5 15 19.5"
      stroke="#c95000"
      strokeWidth="0.8"
      fill="none"
    />
    <path d="M8 9.5L9.5 12L7 12Z" fill="#ffe600" />
    <path d="M16 9.5L14.5 12L17 12Z" fill="#ffe600" />
    <path d="M12 11L12.7 12.3H11.3Z" fill="#ffe600" />
    <path
      d="M7.5 14.5C8.5 16.5 10 17 12 17C14 17 15.5 16.5 16.5 14.5C15 15.2 14.2 14 12.8 15.2C12 14.2 11.2 15.2 9.8 14C8.8 15.2 8.2 14.7 7.5 14.5Z"
      fill="#ffe600"
    />
  </svg>
);
export const CauldronIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 11h16" />
    <path d="M4 11c0 5 3.5 9 8 9s8-4 8-9H4z" fill="currentColor" fillOpacity="0.25" />
    <path d="M3 11c0-1.5 2-2 4-2h10c2 0 4 .5 4 2" />
    <path d="M6 20l-1.5 2" />
    <path d="M18 20l1.5 2" />
    <circle cx="8" cy="6" r="1.5" fill="#a855f7" stroke="none" />
    <circle cx="12" cy="4.5" r="1.8" fill="#ff7518" stroke="none" />
    <circle cx="16" cy="6.5" r="1.2" fill="#22c55e" stroke="none" />
  </svg>
);
export const CobwebCorner = ({ position = "top-left" }: { position?: "top-left" | "top-right" }) => {
  const isLeft = position === "top-left";
  return (
    <div
      className={`absolute ${isLeft ? "top-0 left-0" : "top-0 right-0"} pointer-events-none z-10 opacity-35 select-none`}
      style={{ transform: isLeft ? "none" : "scaleX(-1)" }}
    >
      <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="rgba(255, 230, 200, 0.45)" strokeWidth="0.8">
        <path d="M0,0 L100,0" />
        <path d="M0,0 L0,100" />
        <path d="M0,0 L100,100" />
        <path d="M0,0 L60,100" />
        <path d="M0,0 L100,60" />
        <path d="M0,0 L30,100" />
        <path d="M0,0 L100,30" />
        <path d="M20,0 Q18,18 0,20" />
        <path d="M40,0 Q36,36 0,40" />
        <path d="M60,0 Q54,54 0,60" />
        <path d="M80,0 Q72,72 0,80" />
        <path d="M100,0 Q90,90 0,100" />
      </svg>
    </div>
  );
};
