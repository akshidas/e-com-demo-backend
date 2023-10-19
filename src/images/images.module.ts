import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageRepo } from './image.repo';
import { Image, ImageSchema } from './image.schema';
import { ImageService } from './image.service';
import { ImagesController } from './images.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
  ],
  controllers: [ImagesController],
  providers: [ImageRepo, ImageService],
})
export class ImagesModule {}
