import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

import db from "@/db/drizzle";
import { units } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

// Updated type for params
type Params = { params: Promise<Record<string, string>> };

export const GET = async (
  _req: NextRequest,
  { params }: Params
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const resolvedParams = await params;
  const id = parseInt(resolvedParams.unitId, 10);

  const data = await db.query.units.findFirst({
    where: eq(units.id, id),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: NextRequest,
  { params }: Params
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const resolvedParams = await params;
  const id = parseInt(resolvedParams.unitId, 10);

  const body = (await req.json()) as typeof units.$inferSelect;
  const data = await db
    .update(units)
    .set({
      ...body,
    })
    .where(eq(units.id, id))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  _req: NextRequest,
  { params }: Params
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const resolvedParams = await params;
  const id = parseInt(resolvedParams.unitId, 10);

  const data = await db
    .delete(units)
    .where(eq(units.id, id))
    .returning();

  return NextResponse.json(data[0]);
};
