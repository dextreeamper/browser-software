import mongoose from 'mongoose';

const { Schema } = mongoose;

const platformSchema = new Schema({
    title: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const platform = mongoose.model('platform', platformSchema);


export default platform;
