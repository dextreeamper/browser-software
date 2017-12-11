import express from 'express';
import vendorController from '../controllers/vendorController';

const authRouter = express.Router();

// this routes is for sign in vendor.
authRouter.get('/vendors/sign_in', vendorController.login);

export default authRouter;
