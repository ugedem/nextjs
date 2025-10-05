import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Customer {
  id: string;
  name: string;
  email: string;
  image_url?: string;
}

interface CustomerTableProps {
  customers: Customer[];
}

export default function CustomerTable({ customers }: CustomerTableProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Customers</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="flex items-center space-x-3">
                {c.image_url && (
                  <img
                    src={c.image_url}
                    alt={c.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span>{c.name}</span>
              </TableCell>
              <TableCell>{c.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
