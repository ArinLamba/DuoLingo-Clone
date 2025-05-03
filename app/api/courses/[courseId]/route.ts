import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

// Updated type for params to be a Promise
type Params = { params: Promise<Record<string, string>> };

export const GET = async (
  _req: Request,
  { params }: Params
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const resolvedParams = await params;
  const id = parseInt(resolvedParams.courseId, 10);

  const data = await db.query.courses.findFirst({
    where: eq(courses.id, id),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: Params
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const resolvedParams = await params;
  const id = parseInt(resolvedParams.courseId, 10);

  const body = await req.json();
  const data = await db
    .update(courses)
    .set({ ...body })
    .where(eq(courses.id, id))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  _req: Request,
  { params }: Params
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const resolvedParams = await params;
  const id = parseInt(resolvedParams.courseId, 10);

  const data = await db
    .delete(courses)
    .where(eq(courses.id, id))
    .returning();

  return NextResponse.json(data[0]);
};
