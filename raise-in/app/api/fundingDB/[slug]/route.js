import mongoose from 'mongoose';
import FundingFormDB from '@/models/fundingDB';

// GET a single funding by slug
export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    if (!slug) {
      return new Response(JSON.stringify({ error: 'Slug is required' }), { status: 400 });
    }

    await mongoose.connect(process.env.MONGODB_URI);

    const funding = await FundingFormDB.findOne({ slug }).populate('userId', 'name email');

    if (!funding) {
      return new Response(JSON.stringify({ error: 'Funding not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(funding), { status: 200 });
  } catch (err) {
    console.error('Error in /api/fundingDB/[slug] GET:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// UPDATE currentAmount when donation is received
export async function PATCH(request, { params }) {
  try {
    const { slug } = await params;
    const { donationAmount } = await request.json();

    if (!slug || !donationAmount || donationAmount <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid slug or donation amount' }), { status: 400 });
    }

    await mongoose.connect(process.env.MONGODB_URI);

    const funding = await FundingFormDB.findOneAndUpdate(
      { slug },
      { $inc: { currentAmount: donationAmount } },
      { new: true }
    );

    if (!funding) {
      return new Response(JSON.stringify({ error: 'Funding not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(funding), { status: 200 });
  } catch (err) {
    console.error('Error in /api/fundingDB/[slug] PATCH:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
