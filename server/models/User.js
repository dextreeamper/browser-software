import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const userSchema = new Schema({
    fullname: {
        type: String
    },
    email: {
        type: String,
        validate: {
            isAsync: true,
            // async custom validator.
            validator: function(v, cb){
                // custom validation - checking if the email is exist.
                User.find({email: v}, function(err, docs){
                    // the condition on callback function should return false to execute the error message.
                    cb(!docs.length);
                });
            },
            message: '{VALUE} is already used.'
        }
    },
    password: {
        type: String,
    },
    createdAt: { type: Date, default: Date.now },    
});


// creating our pre hooks middleware
// we want that after saving our password, we will encrypt it.
userSchema.pre('save', function(next){
    // the 'this' state will hold the passed data - its context.
    // this hook has an access to the document that has been created.
    const user = this;

    this.getHashPassword(user.password, function(error, hashPass){
        // if there is an error on the script - the server will response a 500 internal server error.
        if (error){
            // if there is something is wrong.
            return next(error);
        }
    
        // if there is no error, we will change the value of the password into hash.
        user.password = hashPass;
        next(); 
    
    });
});


// we will create our method for our instance of the user object.
userSchema.methods.getHashPassword = function(plainTextPassword, cb){
    // generate first our salt that we will use for our encryption.
    bcrypt.genSalt(11, function(err, salt) {
        // we need to check first if there is an error occur and we will call the cb and pass the error object..
        if (err){
            return cb(err);
        }

        // if there is no error.
        // this hash function is the will encrypt our password plain text.
        bcrypt.hash(plainTextPassword, salt, function(error, hashPassword){
            if(err){
                return cb(err);
            }
            
            // if there is no error, we will return hash password.
            return cb(null, hashPassword);
        });
    });
};

// we will create our class method for comparing 
userSchema.statics.checkIfPasswordCorrect = function(plainPassword, hash, cb){
   // we will compare the password sent from login to the password retrive on the db.
    bcrypt.compare(plainPassword, hash, function(err, result){
        if(err){
            return cb(err);
        }

        return cb(null, result);
    });
};


const User = mongoose.model('User', userSchema);
export default User;

