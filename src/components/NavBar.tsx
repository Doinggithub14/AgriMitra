// src/components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 text-white">
      <div className="text-3xl font-bold">workhu</div>
      <div className="flex gap-8 text-lg">
        <Link href="/">Home</Link>
        <Link href="/">Featured</Link>
        <Link href="/">How it Works</Link>
        <Link href="/">Categories</Link>
      </div>
      <button className="bg-white text-black px-5 py-2 rounded-full">
        Start Free-trial
      </button>
    </nav>
  );
}
