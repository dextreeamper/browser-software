// we will import all the package in here
import express from 'express';
// we will import all our custom modules in here
import vendorController from '../controllers/vendorController';
import softwareController from '../controllers/softwareController';
import { uploadImage, uploadAvatar } from '../libs/uploadFile';
import Authentication from '../middlewares/authentication';

// this is configuration for handling images.
const uploadForVendor = uploadAvatar('./server/temp');
const uploadForSoftware = uploadImage('./server/public/uploads/softwares');

// creating an instance of Router class
const router = express.Router();

// ------------------------------ PUBLIC API ---------------------------------------
// PUBLIC REST API
router.get('/vendors/sign_in', vendorController.login);
router.post('/vendors/sign_up' , vendorController.register);
router.get('/vendors/verifyToken', vendorController.verifyEmailToken);
// requesting a newly JWT and deleting a refresh token
router.get('/requestJWT', vendorController.requestToken); // checking if the given token is exist
router.delete('/deleteJWT', vendorController.deletingToken); // deleting token.


// ------------------------------ PRIVATE API --------------------------------------
// this will authenticate the request.
router.use(Authentication());

// CRUD for vendor
router.put('/vendors/:vendorId/email', vendorController.updateEmail);
router.put('/vendors/:vendorId/password', vendorController.updatePassword);
router.put('/vendors/:vendorId/profile', vendorController.updateProfile); // updating information of vendor.
router.put('/vendors/:vendorId/upload', uploadForVendor.single('avatar'), vendorController.uploadAvatar); // updating the avatar

router.get('/vendors/resendToken', vendorController.resendToken); // resending an email token

// adding resource for software.
router.post('/softwares', softwareController.post);
// uploading images for the software.
router.put('/softwares/:softwareId/upload', uploadForSoftware.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'gallery', maxCount: 6 }
]), softwareController.uploadImages);


// exporting our router.
export default router;


