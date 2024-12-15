import { neon } from '@neondatabase/serverless';

// Initialize the Neon SQL client
const sql = neon(process.env.DATABASE_URL);

async function listInvoices() {
  // Perform the query
  const data = await sql(
    `
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
    `
  );

  // Return the array of records directly
  return data;
}

export async function GET() {
  try {
    // Fetch the invoices
    const invoices = await listInvoices();

    // Return the data as JSON
    return new Response(JSON.stringify(invoices), { status: 200 });
  } catch (error) {
    console.error('Error fetching invoices:', error);

    // Return the error as JSON
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
