import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Invoice {
  id: string;
  amount: number;
  status: string;
  date: Date;
  customer: { name: string };
}

interface InvoiceTableProps {
  invoices: Invoice[];
}

export default function InvoiceTable({ invoices }: InvoiceTableProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Invoices</h2>
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
          {invoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell>{inv.customer.name}</TableCell>
              <TableCell
                className={`font-semibold ${
                  inv.status === "paid"
                    ? "text-green-600"
                    : inv.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {inv.status}
              </TableCell>
              <TableCell>${inv.amount}</TableCell>
              <TableCell>{new Date(inv.date).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
