import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema({
    fullname: String,
    _platforms: [{
        type: Schema.ObjectId,
        ref: 'Platform'
    }],
    _supports: [{
        type: Schema.ObjectId,
        ref: 'Support'
    }],
    _trainings: [{
        type: Schema.ObjectId,
        ref: 'Training'
    }]
});

const admin = mongoose.model('admin', adminSchema);


export default admin;
