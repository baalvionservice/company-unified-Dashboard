import { NextResponse } from 'next/server';
import permissions from '@/lib/data/permissions.json';

export async function GET(
  request: Request,
  { params }: { params: { user_id: string } }
) {
  try {
    const userId = parseInt(params.user_id, 10);
    const userPermissions = permissions.filter(p => p.user_id === userId);

    if (userPermissions.length === 0) {
      return NextResponse.json({ message: 'User not found or has no permissions' }, { status: 404 });
    }
    
    return NextResponse.json({
        user_id: userId,
        permissions: userPermissions.map(({ module, access }) => ({ module, access }))
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { user_id: string } }
) {
  try {
    const userId = parseInt(params.user_id, 10);
    const body = await request.json();
    console.log(`Updating permissions for user ${userId} with:`, body);
    // In a real app, update logic would go here
    return NextResponse.json({ message: "Permissions updated successfully" });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { user_id: string } }
) {
  try {
    const userId = parseInt(params.user_id, 10);
    console.log(`Deleting all permissions for user ${userId}`);
    // Deletion logic here
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
