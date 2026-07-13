"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "../lib/api";
import Profile from "./profile";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "#categories" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  


  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");

    if (storedUser) {
      setUsername(storedUser);
    }
    if (storedEmail){
      setEmail(storedEmail); 
    }
  }, []);


  const handleLogout = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await logout();

      localStorage.removeItem("username");
      localStorage.removeItem("email");

      router.push("/login");

    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link href="/" className="text-2xl font-bold text-indigo-600">
          NextMart
        </Link>


        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">

          {NAV_LINKS.map((link)=>(
            <a
              key={link.label}
              href={link.href}
              className="hover:text-indigo-600"
            >
              {link.label}
            </a>
          ))}

        </nav>


        <div className="flex items-center gap-3">

          <Profile
            username={username}
            email={email}
          />


          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>


          <button
            onClick={()=>setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
          >
            ☰
          </button>


        </div>

      </div>


      {menuOpen && (

        <nav className="md:hidden px-6 py-4 border-t">

          {NAV_LINKS.map((link)=>(

            <a
              key={link.label}
              href={link.href}
              onClick={()=>setMenuOpen(false)}
              className="block py-2"
            >
              {link.label}
            </a>

          ))}

        </nav>

      )}

    </header>
  );
}