import { del } from "@vercel/blob";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return Response.json(
        { error: "No URLs provided for deletion" },
        { status: 400 },
      );
    }

    await del(urls);

    return Response.json({
      success: true,
      message: `Deleted ${urls.length} blob(s)`,
    });
  } catch (error) {
    console.error("Blob cleanup failed:", error);
    return Response.json({ error: "Cleanup failed" }, { status: 500 });
  }
}
