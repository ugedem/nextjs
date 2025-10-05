import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Users, Clock } from "lucide-react";

interface SummaryCardsProps {
  totalRevenue: number;
  totalCustomers: number;
  pendingInvoices: number;
}

export default function SummaryCards({
  totalRevenue,
  totalCustomers,
  pendingInvoices,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="shadow-sm">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold text-green-600">${totalRevenue}</p>
          </div>
          <DollarSign className="text-green-600" />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-gray-500 text-sm">Customers</p>
            <p className="text-2xl font-bold text-blue-600">{totalCustomers}</p>
          </div>
          <Users className="text-blue-600" />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-gray-500 text-sm">Pending Invoices</p>
            <p className="text-2xl font-bold text-yellow-600">
              {pendingInvoices}
            </p>
          </div>
          <Clock className="text-yellow-600" />
        </CardContent>
      </Card>
    </div>
  );
}
