import Razorpay from "razorpay";
import { donationRateLimit } from "@/lib/ratelimit";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";


export async function POST(req){
    const session= await getServerSession(authOptions)
    if(!session?.user?.id){
        return new Response(JSON.stringify({error: 'Unauthorized'}), {status: 401})
    }
    const ip= req.headers.get('x-forwarded-for')||req.socket?.remoteAddress || 'anonymous';
    const key= `${session.user.email}-${ip}` // Unique key for rate limiting per user and IP
    const {success}= await donationRateLimit.limit(key)
    if(!success){
        return new Response(JSON.stringify({error: 'Too many requests'}), {status: 429})
    }
    const {amount}= await req.json();
    const razorpay= new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
    const options={ 
        amount: amount*100,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
    }
    try{
        const order= await razorpay.orders.create(options);
        return Response.json(order); 
    }
    catch(err){
        console.error(err);
        return new Response(JSON.stringify({error: 'Failed to create order'}), {status: 500});
    }
}