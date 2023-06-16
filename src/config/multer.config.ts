import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { UploadPaths } from 'src/common/enums';

export const multerOptions: MulterOptions = {
  limits: {
    fileSize: 1024 * 1024 * 50, // 50MB
  },
  fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error, acceptFile: boolean) => void,
  ) {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination(
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void,
    ) {
      // ? question: how i can make new folder ?
      if (!existsSync('.' + UploadPaths.USERS_AVATARS)) {
        mkdirSync('.' + UploadPaths.USERS_AVATARS);
      }

      cb(null, '.' + UploadPaths.USERS_AVATARS);
    },
    filename(
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void,
    ) {
      const fileExtension = extname(file.originalname);
      const newFileName = uuidv4() + fileExtension;
      cb(null, newFileName);
    },
  }),
};
