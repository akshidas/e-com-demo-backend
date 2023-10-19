import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ImageRepo } from './image.repo';

@Injectable()
export class ImageService {
  constructor(private readonly imageRepo: ImageRepo) {}

  async create(file: Express.Multer.File) {
    const { filename, size } = file;
    const [name] = filename.split('.');

    const image = await this.imageRepo.create({
      name,
      url: `http://localhost:3000/public/${filename}`,
      size,
    });
    if (image) {
      return image;
    }
  }
}
