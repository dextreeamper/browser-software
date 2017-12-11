import mongoose from 'mongoose';

import { hashingPassword, query, logic } from '../libs/schemaCustomMethods';

const { Schema } = mongoose;

// for our details sub schema.
const detailsSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        validate: {
            isAsync: true,
            validator: (value, cb) => {
                Vendor.find({'vendorDetails.email': value}, (err, docs) => {
                    // when we passed a false boolean value on the cb, the validation will execute.
                    cb(!docs.length);
                }); 
            },
            message: 'The email {VALUE} is already used.'
        },
    },
    password: String,    
    phoneNumber: String,
    company: String,
    avatar: {
        URL: String,
        path: String
    },
});

// creating our pre hooks middleware on our sub document.
//
// write the middleware for the subdocument before the declaration of the parentSchema.
detailsSchema.pre('save', function(next){
    // the 'this' state will hold the passed data - its context.
    // this hook has an access to the document that has been created.
    const vendorDetails = this;
    this.hashThePassword(vendorDetails.password, function(error, hashPass){
        // if there is an error on the script - the server will response a 500 internal server error.
        if (error){
            // if there something wrong.
            return next(error);
        }
        // if there is no error, we will change the value of the password into hash.
        vendorDetails.password = hashPass;
        next();  
    });
    
});


// this is our registering some instance and static method.
// implementing the hash password as instance method on this schema.
hashingPassword.addHashPasswordAsInstance(detailsSchema);
// register the checkIfPassword as static on this schema.
hashingPassword.addCheckIfPasswordCorrectAsStatic(detailsSchema);

// other details schema
const otherSchema = new Schema({
    socialMedia: {
        facebookLink: String,
        googleLink: String,
        linkedinLink: String,
        youtubeLink: String,
        twitterLink: String
    },
    website: String,
    location: String
});
// other details schema
 
// creating our vendor schema
const vendorSchema = new Schema({
    vendorDetails: detailsSchema,
    otherDetails: otherSchema,
    isVerified: { type: Boolean, default: false },
    _accountPlan_id: Number,
    createdAt: { 
        type: Date,
        default: Date.now
    }
});

// register the query helper static function on vendorSchema
query.addFindByEmailAsStatic(vendorSchema);
// register the query helper instance function on vendorSchema
logic.addComparePasswordAsInstance(vendorSchema);

// creating our Vendor model
const Vendor = mongoose.model('Vendor', vendorSchema);


export default Vendor;




