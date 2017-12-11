import mongoose from 'mongoose';
import addDoubleType from 'mongoose-double';

// adding type for the mongoose schema types.
addDoubleType(mongoose);
// we will use it for declaring a double type
const SchemaTypes = mongoose.Schema.Types;

const { Schema } = mongoose;

const mainSchema = new Schema({
    name: String,
    desc: String,
    price: {
        type: SchemaTypes.Double,
    },
    pricingDetails: String,
    logo: {
        URL: String,
        path: String
    },
    gallery: [{
        URL: String,
        path: String
    }]
});

const otherSchema = new Schema({
    platforms: [{
        _platform: {
            type: Schema.ObjectId, 
            ref: 'Platform'
        },
        title: String
    }],
    supports: [{
        _support: {
            type: Schema.ObjectId,
            ref: 'Support'
        },
        title: String
    }],
    trainings: [{
        _training: {
            type: Schema.ObjectId,
            ref: 'Training'
        },
        title: String
    }]
});

const softwareSchema = new Schema({
    mainDetails: mainSchema,
    _vendor: { type: Schema.ObjectId, ref: 'Vendor' }, // this is a foreign key, this field is a reference to other collection.
    _categories: [{
        type: Schema.ObjectId,
        ref: 'Category'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Instances of these models represent documents which can be saved and retrieved from our database. 
// First argument will be the singular name of your collection.
const software = mongoose.model('software', softwareSchema);


export default software;
