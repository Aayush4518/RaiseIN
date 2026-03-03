import mongoose from 'mongoose';
import FundingFormDB from '@/models/fundingDB';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { fundingRateLimit } from '@/lib/ratelimit';

// API route for managing a user's own fundings.  Requires authentication and ownership of the funding document.  Supports GET for listing a user's fundings
// and DELETE for removing a funding.  Connects to the same MongoDB used by the
// auth route and uses the authenticated user's ID to ensure they can only access
// their own fundings.

export async function GET(request){
  try{
    await mongoose.connect(process.env.MONGODB_URI)
    const allFundings= await FundingFormDB.find().sort({createdAt: -1})
    return new Response(JSON.stringify(allFundings), {status: 200})
  }
  catch(err){
    console.error('Error in /api/fundingDB GET: ', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

// API route for creating and listing funding documents.  Connects to the
// same MongoDB used by the auth route and adds the authenticated user's ID.

export async function POST(request) {
  try {
    const body = await request.json();

    // get the logged-in user (if any); session contains `user.id` when using the
    // database strategy with the MongoDB adapter.
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || null;

    // only logged-in users may create fundings
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
      const ip= request.headers.get('x-forwarded-for') || request.socket?.remoteAddress || 'anonymous';
      const key= `${session.user.email}-${ip}`;
      const { success } = await fundingRateLimit.limit(key);
      if (!success) {
        return new Response(JSON.stringify({ error: 'Too many requests' }), { status: 429 });
      }

    await mongoose.connect(process.env.MONGODB_URI);

    const created = await FundingFormDB.create({
      title: body.title,
      slug: body.slug,
      description: body.description,
      purpose: body.purpose,
      goalAmount: body.goalAmount,
      currentAmount: body.currentAmount || 0,
      category: body.category,
      image: body.image,
      userId,
    });

    return new Response(JSON.stringify(created), { status: 201 });
  } catch (err) {
    console.error('Error in /api/fundingDB POST:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// export async function GET(request) {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     const all = await FundingFormDB.find().sort({ createdAt: -1 });
//     return new Response(JSON.stringify(all), { status: 200 });
//   } catch (err) {
//     console.error('Error in /api/fundingDB GET:', err);
//     return new Response(JSON.stringify({ error: err.message }), { status: 500 });
//   }
// }

// export async function GET(request){
//     try{
//         await mongoose.connect(process.env.MONGODB_URI)
//         const fundings= await FundingFormDB.find().sort({createdAt: -1})
//         return new Response(JSON.stringify(fundings), {status: 200})

//     }
//     catch(err){
//         console.error('Error in /api/fundingDB GET: ', err)
//         return new Response(JSON.stringify({ error: err.message }), { status: 500 })
//     }
// }
