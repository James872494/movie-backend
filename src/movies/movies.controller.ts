// import {
//   Controller,
//   Get,
//   Post,
//   Param,
//   Body,
//   Res,
//   UploadedFile,
//   UseInterceptors,
// } from '@nestjs/common';
// import { MoviesService } from './movies.service';
// import type { Response } from 'express';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { extname } from 'path';

// @Controller('movies')
// export class MoviesController {
//   constructor(private readonly moviesService: MoviesService) {}

//   @Post()
//   async create(@Body() body: any) {
//     return this.moviesService.create(body);
//   }

//   @Get()
//   async getAll() {
//     return this.moviesService.findAll();
//   }

//   @Get(':id')
//   async getOne(@Param('id') id: string) {
//     return this.moviesService.findById(id);
//   }

//   // Upload a movie file
//   @Post(':id/upload')
//   @UseInterceptors(
//     FileInterceptor('file', {
//       storage: diskStorage({
//         destination: './uploads/movies',
//         filename: (req, file, cb) => {
//           cb(null, Date.now() + extname(file.originalname));
//         },
//       }),
//     }),
//   )
//   async uploadFile(
//     @Param('id') id: string,
//     @UploadedFile() file: Express.Multer.File,
//   ) {
//     const movie = await this.moviesService.findById(id);
//     movie.filePath = file.path;
//     return movie.save();
//   }

//   // Download movie file
//   @Get(':id/download')
//   async download(@Param('id') id: string, @Res() res: Response) {
//     const movie = await this.moviesService.findById(id);
//     res.download(movie.filePath);
//   }
// }

import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import type { Response } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // Create movie with multiple files
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'poster', maxCount: 1 },
        { name: 'trailer', maxCount: 1 },
        { name: 'file', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads/movies',
          filename: (req, file, cb) => {
            cb(null, Date.now() + extname(file.originalname));
          },
        }),
      },
    ),
  )
  async create(
    @UploadedFiles()
    files: {
      poster?: Express.Multer.File[];
      trailer?: Express.Multer.File[];
      file?: Express.Multer.File[];
    },
    @Body() body: any, // Contains text fields
  ) {
    // Attach file paths to body
    if (files.poster) body.poster = files.poster[0].path;
    if (files.trailer) body.trailer = files.trailer[0].path;
    if (files.file) body.filePath = files.file[0].path;

    return this.moviesService.create(body);
  }

  @Get()
  async getAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.moviesService.findById(id);
  }

  // Download movie file
  @Get(':id/download')
  async download(@Param('id') id: string, @Res() res: Response) {
    const movie = await this.moviesService.findById(id);
    res.download(movie.filePath);
  }
}
