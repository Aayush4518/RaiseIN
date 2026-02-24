import Razorpay from "razorpay";

export async function POST(req){
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
        return Response.json({error: 'Failed to create order'}, {status: 500});
    }
}