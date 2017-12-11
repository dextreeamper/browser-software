import bcrypt from 'bcrypt';

// ------------------------- custom hashing password helper function ----------------
export const hashingPassword = {};

hashingPassword.addHashPasswordAsInstance = function(schema){
    // we will create our method for our instance of the user object.
    schema.methods.hashThePassword = function(plainTextPassword, cb){
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
};


hashingPassword.addCheckIfPasswordCorrectAsStatic = function(schema){
    // we will create our class method for comparing
    schema.statics.checkIfPasswordCorrect = function(plainPassword, hash, cb){
        // we will compare the password sent from login to the password retrive on the db.
        // the design of the callback function is called error-first style or Node style.
        bcrypt.compare(plainPassword, hash, function(err, result){
            if(err){
                return cb(err);
            }
            return cb(null, result);
        });
    };
};

// ----------------- this is a custom query helper function. ----------------------
export const query = {};

query.addFindByEmailAsStatic = function(schema){
    // implement this findyByEmail static function on the schema.
    schema.statics.findByEmail = function(email){
        const vendor = this;
        // Note: findOne function also return a resolve object even though
        // that the email is not exist.
        return new Promise((resolve, reject) => {
            vendor.findOne({'vendorDetails.email': email})
                .then(doc => {
                    // if the email is not exist.
                    if(!doc) return reject('The email or password is incorrect.');
                    // if there is email exist, return the doc object.
                    resolve(doc);
                })
                .catch(error => reject(error));
        });
    };
};

// ------------------------ this is custom login helper function ---------------
export const logic = {};

logic.addComparePasswordAsInstance = function(schema){
    schema.methods.comparePassword = function(plainPassword, retriveDoc){
        // setting the this context on the vendor.
        const vendor = this;

        return new Promise(function(resolve,reject){
            // we will compare the password sent from login to the password retrive on the db.
            bcrypt.compare(plainPassword, vendor.vendorDetails.password, function(err, result){
                // this error object consist an error through the scripts, lets say we forgot to pass a hashed password on this function
                if(err){
                    reject(err);
                }

                // check if the password is correct.
                if(result){
                    resolve(retriveDoc);
                }
                // if it is not correct.
                reject('The email or password is incorrect.');
            });
        });
    };
};
