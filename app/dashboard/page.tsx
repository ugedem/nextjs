// app/dashboard/page.tsx
import { PrismaClient, Customer, Invoice } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const prisma = new PrismaClient();

export default async function Dashboard() {
  // Fetch customers and invoices
  const [customers, invoices] = await Promise.all([
    prisma.customer.findMany(),
    prisma.invoice.findMany({
      orderBy: { date: "asc" },
    }),
  ]);

  // Summary stats
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidInvoices = invoices.filter(inv => inv.status === "paid").length;
  const pendingInvoices = invoices.filter(inv => inv.status === "pending").length;
  const overdueInvoices = invoices.filter(inv => inv.status === "overdue").length;

  // Prepare chart data
  const revenueData = invoices.reduce((acc: any[], inv) => {
    const dateStr = new Date(inv.date).toLocaleDateString();
    const existing = acc.find(d => d.date === dateStr);
    if (existing) existing.revenue += inv.amount;
    else acc.push({ date: dateStr, revenue: inv.amount });
    return acc;
  }, []);

  const invoiceStatusData = [
    { name: "Paid", value: paidInvoices, color: "#16a34a" },
    { name: "Pending", value: pendingInvoices, color: "#ca8a04" },
    { name: "Overdue", value: overdueInvoices, color: "#dc2626" },
  ];

  return (
    <main className="p-8 min-h-screen bg-gray-50 space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} color="text-green-700" />
        <SummaryCard title="Paid Invoices" value={paidInvoices} color="text-blue-600" />
        <SummaryCard title="Pending Invoices" value={pendingInvoices} color="text-yellow-600" />
        <SummaryCard title="Overdue Invoices" value={overdueInvoices} color="text-red-600" />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Invoice Status Pie */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={invoiceStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {invoiceStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Invoices Table */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Recent Invoices</CardTitle>
          <Button variant="outline">View All</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.slice(-5).map(invoice => {
                const customer = customers.find(c => c.id === invoice.customerId);
                return (
                  <TableRow key={invoice.id}>
                    <TableCell>{customer?.name || "Unknown"}</TableCell>
                    <TableCell className={
                      invoice.status === "paid"
                        ? "text-green-600"
                        : invoice.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }>
                      {invoice.status}
                    </TableCell>
                    <TableCell>${invoice.amount}</TableCell>
                    <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Top Customers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {customers.map(c => (
              <CustomerCard key={c.id} customer={c} />
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

/* -------------------- Reusable Components -------------------- */

interface SummaryCardProps {
  title: string;
  value: string | number;
  color: string;
}

function SummaryCard({ title, value, color }: SummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </CardContent>
    </Card>
  );
}

interface CustomerCardProps {
  customer: Customer;
}

function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <div className="flex items-center space-x-3 bg-white p-4 rounded-lg border shadow-sm">
      <img
        src={customer.image_url || "/default-avatar.png"}
        alt={customer.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <p className="font-semibold text-gray-800">{customer.name}</p>
        <p className="text-sm text-gray-500">{customer.email}</p>
      </div>
    </div>
  );
}
