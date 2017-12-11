import mongoose from 'mongoose';

const { Schema } = mongoose;

const supportSchema = new Schema({
    title: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const support = mongoose.model('support', supportSchema);


export default support;

