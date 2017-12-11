import mongoose from 'mongoose';

const { Schema } = mongoose;

const trainingSchema = new Schema({
    title: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const training = mongoose.model('training', trainingSchema);


export default training;

