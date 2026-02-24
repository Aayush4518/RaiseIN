import cryptop from "crypto";

export async function POST(req){
    const body= await req.json()

    const {razorpay_order_id, razorpay_payment_id, razorpay_signature}= body;
    const expectedSignature= cryptop.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id) 
    .digest('hex') 

    if(expectedSignature === razorpay_signature){
        return Response.json({success: true, message: 'Payment verified successfully'});
    }
    else{
        return Response.json({success: false, message: 'Payment verification failed'}, {status: 400});
    }
}