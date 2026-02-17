import { writeFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public/uploads");

  // Create folder if it doesn't exist
  await mkdir(uploadDir, { recursive: true });

  const uploadPath = path.join(uploadDir, file.name);

  await writeFile(uploadPath, buffer);

  return NextResponse.json({
    success: true,
    filePath: `/uploads/${file.name}`,
  });
}
