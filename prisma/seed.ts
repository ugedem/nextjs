import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data before reseeding
  await prisma.invoice.deleteMany();
  await prisma.customer.deleteMany();

  // Create Nigerian customers with images
  const customersData = [
    {
      name: "Chinwe Okafor",
      email: "chinwe.okafor@example.com",
      image_url: "https://i.pravatar.cc/150?img=10",
    },
    {
      name: "Tunde Balogun",
      email: "tunde.balogun@example.com",
      image_url: "https://i.pravatar.cc/150?img=11",
    },
    {
      name: "Ngozi Nwosu",
      email: "ngozi.nwosu@example.com",
      image_url: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "Emeka Obi",
      email: "emeka.obi@example.com",
      image_url: "https://i.pravatar.cc/150?img=13",
    },
    {
      name: "Aisha Abdullahi",
      email: "aisha.abdullahi@example.com",
      image_url: "https://i.pravatar.cc/150?img=14",
    },
  ];

  await prisma.customer.createMany({
    data: customersData,
  });

  console.log(`Created ${customersData.length} customers`);

  // 3️⃣ Retrieve all customers to attach invoices
  const allCustomers = await prisma.customer.findMany();

  // 4️⃣ Create invoices tied to customers
  const invoicesData = [
    {
      customerId: allCustomers[0].id,
      amount: 1500,
      status: "paid",
      date: new Date("2025-09-01"),
    },
    {
      customerId: allCustomers[1].id,
      amount: 2300,
      status: "pending",
      date: new Date("2025-09-10"),
    },
    {
      customerId: allCustomers[2].id,
      amount: 3200,
      status: "paid",
      date: new Date("2025-09-15"),
    },
    {
      customerId: allCustomers[3].id,
      amount: 1850,
      status: "overdue",
      date: new Date("2025-09-20"),
    },
    {
      customerId: allCustomers[4].id,
      amount: 2700,
      status: "paid",
      date: new Date("2025-09-25"),
    },
  ];

  await prisma.invoice.createMany({
    data: invoicesData,
  });

  console.log(`Created ${invoicesData.length} invoices`);
  console.log("Seed data created successfully");
}

// 5️⃣ Execute seeding
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error while seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
