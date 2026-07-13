"use client";

import { useState } from "react";
import Link from "next/link";

interface ProfileProps {
  username: string | null;
  email: string | null;
}

export default function Profile({ username, email }: ProfileProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="hidden sm:flex flex-col text-right hover:bg-gray-100 px-3 py-2 rounded-lg"
      >
        <span className="font-medium text-gray-800">
          {username ?? "Guest User"}
        </span>

        <span className="text-sm text-gray-500">
          {email ?? "Not logged in"}
        </span>
      </button>


      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border p-2">

          <div className="px-3 py-2 border-b">
            <p className="font-semibold text-gray-800">
              {username}
            </p>

            <p className="text-sm text-gray-500">
              {email}
            </p>
          </div>


          <Link
            href="/profile"
            className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            My Profile
          </Link>


          <Link
            href="/changepassword"
            className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Change Password
          </Link>


          <button
            onClick={() => setOpen(false)}
            className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Settings
          </button>

        </div>
      )}

    </div>
  );
}