import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: String,
    keyFunctions: [{
        type: String 
    }],
    _creator: {
        type: Schema.ObjectId,
        ref: 'Admin'
    },
    path: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const category = mongoose.model('category', categorySchema);


export default category;

