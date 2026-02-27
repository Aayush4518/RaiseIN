import mongoose from "mongoose"


// schema for funding form – keep categories in sync with the client-side dropdown
const FundingFormSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    // dropdown values in the UI are all lowercase; mirror them here so validation
    // passes without additional transformation.
    category: {
        type: String,
        required: true,
        enum: ['education', 'medical', 'business', 'emergency', 'community', 'other'],
    },
    description: { type: String, required: true },
    goalAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    image: { type: String }, // optional URL for funding image
    purpose: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const FundingFormDB = mongoose.models.FundingForm || mongoose.model('FundingForm', FundingFormSchema);

export default FundingFormDB