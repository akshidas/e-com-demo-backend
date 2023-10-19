import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImageService } from './image.service';

@Controller({
  version: '1',
})
export class ImagesController {
  constructor(private readonly imageService: ImageService) {}
  @Get()
  getAll() {
    return 'all';
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/',
        filename(req, file, callback) {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const image = await this.imageService.create(file);
    if (image) {
      return { data: image };
    }
  }
}
