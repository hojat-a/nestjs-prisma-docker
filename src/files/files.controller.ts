import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UploadedFile,
  UseInterceptors,
  Query,
  StreamableFile,
  Res,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join, sep } from 'path';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Payload, Public } from 'src/auth/decorators';
import { FileValidationPipe } from './pipes';
import { GetAllFilesQueryDto, CreateFileDto, UpdateFileDto } from './dto';

@Controller({ path: 'files', version: '1' })
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
    @Body() createFileDto: CreateFileDto,
    @Payload() payload,
  ) {
    return this.filesService.create(file, createFileDto, payload);
  }

  @Public()
  @Get()
  findAll(@Query() query: GetAllFilesQueryDto) {
    return this.filesService.findAll(query);
  }

  @Get('/mine')
  findAllUserFiles(@Query() query: GetAllFilesQueryDto, @Payload() payload) {
    return this.filesService.findAll(query, payload);
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.filesService.findOne(+id);
  }

  @Public()
  @Get(':id/download')
  async getFile(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const fileData = await this.filesService.download(+id);
    const file = createReadStream(
      join(process.cwd(), process.env.UPLOAD_PATH, fileData.fileName),
    );
    res.set({
      'Content-Type': fileData.mimetype,
      'Content-Disposition': `attachment; filename="${fileData.originalName}"`,
    });
    return new StreamableFile(file);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileDto: UpdateFileDto,
    @Payload() payload,
  ) {
    return this.filesService.update(+id, updateFileDto, payload);
  }
}
