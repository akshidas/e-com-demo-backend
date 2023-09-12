import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, now } from 'mongoose';
import { Auth } from './auth.schema';

@Injectable()
export class AuthRepo {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
  ) {}

  async create(id: Types.ObjectId) {
    const saved = await this.authModel.findOne({ user_id: id });

    if (saved) {
      saved.loggedInTime = [...saved.loggedInTime, now()];
      await saved.save();
      return true;
    }

    const auth = new this.authModel({ user_id: id, loggedInTime: [now()] });
    await auth.save();
    return true;
  }
}
