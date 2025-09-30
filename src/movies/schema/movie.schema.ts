import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  genre: string;

  @Prop()
  year: string;

  @Prop()
  rating: number;

  @Prop()
  duration: string;

  @Prop()
  poster: string;

  @Prop()
  trailer: string;

  @Prop()
  filePath: string; // path to uploaded movie file
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
