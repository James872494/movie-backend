// src/movies/movies.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './schema/movie.schema';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}

  async create(movieData: Partial<Movie>): Promise<MovieDocument> {
    const movie = new this.movieModel(movieData);
    return movie.save();
  }

  async findAll(): Promise<MovieDocument[]> {
    return this.movieModel.find().exec();
  }

  async findById(id: string): Promise<MovieDocument> {
    const movie = await this.movieModel.findById(id).exec();
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }
}
