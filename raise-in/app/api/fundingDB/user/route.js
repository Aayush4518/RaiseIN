import mongoose from 'mongoose';
import FundingFormDB from '@/models/fundingDB';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// GET user's own fundings (requires authentication)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    await mongoose.connect(process.env.MONGODB_URI);

    const userFundings = await FundingFormDB.find({ userId: session.user.id }).sort({
      createdAt: -1,
    });

    return new Response(JSON.stringify(userFundings), { status: 200 });
  } catch (err) {
    console.error('Error in /api/fundingDB/user GET:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// DELETE a user's funding (requires authentication and ownership)
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { fundingId } = await request.json();

    if (!fundingId) {
      return new Response(JSON.stringify({ error: 'fundingId is required' }), {
        status: 400,
      });
    }

    await mongoose.connect(process.env.MONGODB_URI);

    // Ensure user owns this funding before deleting
    const funding = await FundingFormDB.findById(fundingId);

    if (!funding) {
      return new Response(JSON.stringify({ error: 'Funding not found' }), { status: 404 });
    }

    if (funding.userId.toString() !== session.user.id) {
      return new Response(JSON.stringify({ error: 'Not authorized to delete this funding' }), {
        status: 403,
      });
    }

    await FundingFormDB.findByIdAndDelete(fundingId);

    return new Response(JSON.stringify({ message: 'Funding deleted' }), { status: 200 });
  } catch (err) {
    console.error('Error in /api/fundingDB/user DELETE:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
