// app/lib/data.ts

import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

// Fetch invoices with customer data
export async function fetchInvoices() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: { customer: true },
      orderBy: { date: 'desc' },
    });
    return invoices;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
}

// Fetch customers
export async function fetchCustomers() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { name: 'asc' },
    });
    return customers;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
}

// Fetch revenue (example: sum of paid invoices)
export async function fetchRevenue() {
  try {
    const revenue = await prisma.invoice.aggregate({
      _sum: { amount: true },
      where: { status: 'paid' },
    });
    return revenue._sum.amount || 0;
  } catch (error) {
    console.error('Error fetching revenue:', error);
    throw error;
  }
}
