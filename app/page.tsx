import Image from "next/image";
import Link from "next/link";
import { fetchInvoices, fetchCustomers, fetchRevenue } from "./lib/data";

export default async function HomePage() {
  // Fetch data directly from Prisma (Server Component)
  const invoices = await fetchInvoices();
  const customers = await fetchCustomers();
  const revenue = await fetchRevenue();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-3xl">
        {/* Dashboard Heading */}
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>

        {/* Navigation */}
        <nav className="flex gap-4 mb-4">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/about">About</Link>
        </nav>

        {/* Revenue Summary */}
        <section className="mb-6 w-full">
          <h2 className="text-xl font-semibold">Revenue Summary</h2>
          <p className="mt-2 text-lg">Total Revenue: ${revenue}</p>
        </section>

        {/* Invoices List */}
        <section className="mb-6 w-full">
          <h2 className="text-xl font-semibold">Invoices</h2>
          <ul className="list-disc pl-5 mt-2">
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <li key={invoice.id}>
                  <strong>{invoice.customer.name}</strong> — ${invoice.amount} ({invoice.status})
                </li>
              ))
            ) : (
              <li>No invoices found.</li>
            )}
          </ul>
        </section>

        {/* Customers List */}
        <section className="w-full">
          <h2 className="text-xl font-semibold">Customers</h2>
          <ul className="list-disc pl-5 mt-2">
            {customers.length > 0 ? (
              customers.map((customer) => (
                <li key={customer.id}>{customer.name}</li>
              ))
            ) : (
              <li>No customers found.</li>
            )}
          </ul>
        </section>

        {/* Footer Actions */}
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-6">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/vercel.svg" alt="Vercel logomark" width={20} height={20} />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Docs
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
