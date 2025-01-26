// src/app/api/report/route.js
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();
    const { reporter, reportedUser, reason } = await req.json();

    if (!reporter || !reportedUser || !reason) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    // Temporarily ban the reported user
    const user = await User.findOne({ email: reportedUser });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Ban the user for 10 minutes
    user.isBanned = true;
    await user.save();

    // Unban the user after 10 minutes
    setTimeout(async () => {
      user.isBanned = false;
      await user.save();
    }, 10 * 60 * 1000); // 10 minutes in milliseconds

    return new Response(JSON.stringify({ success: true, message: "User temporarily banned for 10 minutes." }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to process report" }), { status: 500 });
  }
}
