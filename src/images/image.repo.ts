import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './image.schema';

@Injectable()
export class ImageRepo {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}

  async getOne(id: string) {
    return this.imageModel.findById(id, ['name', 'url']);
  }

  async create(image: CreateImageDto) {
    const newImage = new this.imageModel(image);
    try {
      const saved = await newImage.save();
      if (saved) {
        return this.getOne(saved.id);
      }
    } catch (err) {
      throw new InternalServerErrorException('failed to save image');
    }
  }
}
