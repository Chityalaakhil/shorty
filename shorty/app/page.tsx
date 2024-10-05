"use client";

// import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [link, setLink] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(e, link);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 fade-in">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <form onSubmit={handleSubmit} className="flex flex-column gap-4 text-center min-w-full">
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter Your Link"
            className="p-4 text-lg border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            className="p-4 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            Get Short Link
          </button>
        </form>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
