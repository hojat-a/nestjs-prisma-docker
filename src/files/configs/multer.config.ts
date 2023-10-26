import { diskStorage } from 'multer';
import { allowedFileExtensions } from '../constants';
import { HttpException } from '@nestjs/common';
import { extname } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: process.env['UPLOAD_PATH'],
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExtension = extname(file.originalname);
      cb(null, uniqueSuffix + fileExtension);
    },
  }),
  fileFilter: function (req, file, cb) {
    {
      if (allowedFileExtensions.includes(file.mimetype)) {
        cb(null, true);
      } else {
        // provide the validation error in the request
        cb(new HttpException(`Unsupported file type`, 422), false);
      }
    }
  },
  limits: {
    fileSize: 2_000_000,
  },
};
