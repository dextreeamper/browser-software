import multer from 'multer';
import fs from 'fs';

// we will setting up the options for our multer.
export const uploadAvatar = (path) => {
    // we are setting up the storage information for our image, eg. the destination folder and filename.
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            // save the files on the directory created.
            cb(null, path);
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
        }
    });

    return multer({ storage });
};

// we will setting up the options for our multer.
export const uploadImage = (path) => {
    // we are setting up the storage information for our image, eg. the destination folder and filename.
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            // we will create a directory path.
            const directoryPath = path + '/' + req.params.softwareId;
            // create a directory based on the path. check first if the directory is not exist
            if(!fs.existsSync(directoryPath)){
                fs.mkdirSync(directoryPath);
            }
            // save the files on the directory created.
            cb(null, directoryPath);
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
        }
    });

    return multer({ storage });
};


