"use client";

import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  useUser,
  UserButton,
  SignInButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function HomePage() {
  const { user } = useUser();
  const [news, setNews] = useState<any[]>([]);
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const res = await fetch("/api/news", {
        headers: { email: user.primaryEmailAddress?.emailAddress || "" },
      });
      const data = await res.json();
      if (data.allowed) {
        setAllowed(true);
        setNews(data.news);
      } else {
        setAllowed(false);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">📰 Știri Exclusive</h1>
        <div>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-blue-600 hover:underline font-medium">
                Autentificare
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-6">
        <SignedOut>
          <p className="text-center text-gray-600">
            Te rog autentifică-te pentru a vedea știrile.
          </p>
        </SignedOut>
        <SignedIn>
          {allowed === false ? (
            <div className="text-red-600 font-semibold text-center">
              Nu ai fost invitat. Accesul este restricționat.
            </div>
          ) : allowed === true ? (
            <>
              <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
                Știri Exclusive
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {news.map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-3">{item.content}</p>
                    <p className="text-sm text-gray-400">{item.date}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link
                  href="/invite"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
                >
                  Invită un prieten
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">Se verifică accesul...</p>
          )}
        </SignedIn>
      </main>
    </div>
  );
}
