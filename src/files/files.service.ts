import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { GetAllFilesQueryDto, CreateFileDto, UpdateFileDto } from './dto';

@Injectable()
export class FilesService {
  constructor(private databaseService: DatabaseService) {}

  async create(file, createFileDto: CreateFileDto, userPayload) {
    try {
      const createFile = await this.databaseService.file.create({
        data: {
          title: createFileDto.title,
          description: createFileDto.description,
          mimetype: file.mimetype,
          originalName: file.originalname,
          fileName: file.filename,
          size: file.size,
          userId: userPayload.userId,
        },
        select: {
          title: true,
          description: true,
        },
      });
      return createFile;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(
    { page = 1, pageSize = 1 }: GetAllFilesQueryDto,
    userPayload = { userId: undefined },
  ) {
    try {
      const files = await this.databaseService.file.findMany({
        skip: +((page - 1) * pageSize),
        take: +pageSize,
        where: {
          userId: userPayload?.userId,
        },
        select: {
          title: true,
          description: true,
          id: true,
        },
      });
      return files || [];
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number, userPayload = { userId: undefined }) {
    try {
      const file = await this.databaseService.file.findUnique({
        where: {
          id,
          userId: userPayload?.userId,
        },
        select: {
          title: true,
          description: true,
          id: true,
          downloadCount: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return file || [];
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async download(id: number) {
    try {
      const file = await this.databaseService.file.update({
        where: {
          id,
        },
        data: {
          downloadCount: {
            increment: 1,
          },
        },
        select: {
          originalName: true,
          fileName: true,
          mimetype: true,
        },
      });
      return file;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('File not exist!!!');
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateFileDto: UpdateFileDto, userPayload) {
    try {
      const updatedData = await this.databaseService.file.update({
        where: {
          id,
          userId: userPayload.userId,
        },
        data: {
          title: updateFileDto.title,
          description: updateFileDto.description,
        },
        select: {
          title: true,
          description: true,
        },
      });
      return updatedData;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException();
      }
      throw new InternalServerErrorException();
    }
  }
}
