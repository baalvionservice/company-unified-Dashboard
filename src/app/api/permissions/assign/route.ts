import { NextResponse } from 'next/server';
// In a real app, this would be a database.
let permissions = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, module, access } = body;
    if (!user_id || !module || !access) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    const newPermission = { id: permissions.length + 1, ...body };
    console.log('Assigning new permission:', newPermission);
    // In a real app, save to DB
    return NextResponse.json(newPermission, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
