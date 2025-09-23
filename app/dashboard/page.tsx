"use client";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="p-8 sm:p-20 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <ul className="list-disc list-inside space-y-2">
        <li>Item One</li>
        <li>Item Two</li>
        <li>Item Three</li>
      </ul>

      {/* Add the Next.js logo here */}
      <div className="mt-8">
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </div>
    </div>
  );
}
