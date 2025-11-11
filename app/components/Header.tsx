"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">JoinWithTheHerd</h1>
          <nav className="flex space-x-6">
            <Link href="/cart" className="text-gray-700 hover:text-gray-900">
              Cart
            </Link>
            <Link
              href="/auth/login"
              className="text-gray-700 hover:text-gray-900"
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
