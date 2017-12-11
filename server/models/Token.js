import mongoose from 'mongoose';

const { Schema } = mongoose;

const tokenSchema = new Schema({
    _vendorId: { type: Schema.Types.ObjectId, required: true, ref: 'Vendor' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;