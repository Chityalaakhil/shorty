"use client";

// import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [link, setLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setShortLink("");

    console.log(e, link);

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: link }),
      });

      if (!response.ok) {
        throw new Error('Failed to shorten URL');
      }

      const data = await response.json();
      setShortLink(data.shortUrl);
    } catch (err) {
      setError(`An error occurred while shortening the URL: ${err}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading}
          >
            {isLoading ? "Shortening..." : "Get Shorty"}
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {shortLink && (
          <div className="flex flex-col gap-4">
            <p>Short Link: {shortLink}</p>
            <button
              onClick={() => navigator.clipboard.writeText(shortLink)}
              className="p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Copy Short Link
            </button>
          </div>
        )}

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
