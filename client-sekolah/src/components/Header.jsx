import { Link } from "react-router-dom";

export default function Header() {
  return (
    // header container
    <div
      className="sticky top-0 z-20 p-6
      max-w-screen h-1/4
      bg-slate-900/90 text-white"
    >
      {/* logo */}
      <Link to="/">
        <div>
          <p className="font-bold text-3xl">Poolapack School</p>
          <p>Admin Page</p>
        </div>
      </Link>
    </div>
  );
}
