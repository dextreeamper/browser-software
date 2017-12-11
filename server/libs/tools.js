/**
 * Created by dennismacbookpro on 28/06/2017.
 */
import Crop from 'jimp';
import sizeOf from 'image-size';
import remove from 'rimraf';
import SendGrid from 'sendgrid';

/**
 * This will crop the the request image and reduce the quality of the image for optimization.
 *
 * @param {Object} tempImage is the file sent via clieent
 * @param  {String} tempPathImage is path of the temporary image
 * @param {Object} cropData is the information on cropping the image through the client.
 * @returns {Object} information of the newly cropped image.
 */
export const croppingImage = (tempImage, tempImagePath, cropData, dest, cb) => {
    // name of the newly cropped image.
    const imageName = tempImage.fieldname + '-' + Date.now() + '-' + tempImage.originalname;
    // directory name of the cropped image.
    const imagePath = dest + '/' + imageName;

    // get first the width and the height of the image - we will use the sizeOf function from image-size package.
    // this is synchronous process, before the cropping will execute, we will wait to get the dimension of image.
    const imageDimensions = sizeOf(tempImagePath);
    const imageWidth = imageDimensions.width;
    const imageHeight = imageDimensions.height;

    // get the properties of cropData
    const { scaleX, scaleY, width, height, x, y } = cropData;
    // crop the temporary image based on the crop data information. this is an asynchronous process.
    Crop.read(tempImagePath)
        .then((image) => {
            image.resize(scaleX * imageWidth, scaleY * imageHeight) // resize
                .crop(x, y, width, height)
                .quality(60)                 // set JPEG quality
                .write(imagePath); // save the new image

            // once the cropping is successfull, execute the callback function.
            cb();
        }).catch(function (err) {
            remove(tempImagePath, () => console.log('deleting the temp image.'));
            console.error('this is the error on processing jimp', err);
        });

    return {
        imageName,
        imagePath
    };
};

/**
 * It is used for sending an email through Sendgrid email provider.
 *
 * @param {Object} - mailerInfo is used to store the information that will be used on email.
 * @returns {Proimse} - a promise value based on the request the we send.
 */
export const sendEmailThroughSendgrid = (mailerInfo) => {
    // config for sendgrid email request
    // attach the api key of the sendgrind
    const mailer = SendGrid(process.env.SENDGRID_API_KEY);

    const helper = SendGrid.mail;
    const fromEmail = new helper.Email(mailerInfo.from);
    const toEmail = new helper.Email(mailerInfo.to);
    const subject = mailerInfo.subject;
    const content = new helper.Content('text/plain', mailerInfo.content);
    const mail = new helper.Mail(fromEmail, subject, toEmail, content);

    // we will return a new promise.
    return mailer.API({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });
};


