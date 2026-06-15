import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF8] px-6 text-center">
      <p className="text-8xl font-black text-[#1A47E8] mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>404</p>
      <h1 className="text-2xl font-black text-[#111] mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
        Page not found
      </h1>
      <p className="text-[#666] text-sm mb-8 max-w-xs">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#1A47E8] hover:bg-[#1338c4] transition-all duration-200 shadow-md hover:-translate-y-px"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
