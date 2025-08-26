// import {
//   Controller,
//   Post,
//   Delete,
//   UseInterceptors,
//   UploadedFile,
//   UploadedFiles,
//   Body,
//   Param,
//   BadRequestException,
// } from '@nestjs/common';
// import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
// import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
// import { FileUploadService } from './file-upload.service';
// import { FileUploadOptions } from 'src/common/interface/file-upload';

// // This is an example controller showing how to use the FileUploadService
// @ApiTags('File Upload')
// @Controller('upload')
// export class FileUploadController {
//   constructor(private readonly fileUploadService: FileUploadService) {}

//   @Post('single')
//   @ApiOperation({ summary: 'Upload a single file' })
//   @ApiConsumes('multipart/form-data')
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadSingle(
//     @UploadedFile() file: Express.Multer.File,
//     @Body() options?: FileUploadOptions
//   ) {
//     if (!file) {
//       throw new BadRequestException('No file provided');
//     }

//     const result = await this.fileUploadService.uploadFile(file, options);
//     return {
//       success: true,
//       data: result,
//       message: 'File uploaded successfully',
//     };
//   }

//   @Post('multiple')
//   @ApiOperation({ summary: 'Upload multiple files' })
//   @ApiConsumes('multipart/form-data')
//   @UseInterceptors(FilesInterceptor('files', 10))
//   async uploadMultiple(
//     @UploadedFiles() files: Express.Multer.File[],
//     @Body() options?: FileUploadOptions
//   ) {
//     if (!files || files.length === 0) {
//       throw new BadRequestException('No files provided');
//     }

//     const results = await this.fileUploadService.uploadMultipleFiles(files, options);
//     return {
//       success: true,
//       data: results,
//       message: `${results.length} files uploaded successfully`,
//     };
//   }

//   @Post('image')
//   @ApiOperation({ summary: 'Upload an image with transformations' })
//   @ApiConsumes('multipart/form-data')
//   @UseInterceptors(FileInterceptor('image'))
//   async uploadImage(@UploadedFile() file: Express.Multer.File) {
//     if (!file) {
//       throw new BadRequestException('No image provided');
//     }

//     const options: FileUploadOptions = {
//       folder: 'images',
//       resourceType: 'image',
//       allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
//       transformation: [
//         { quality: 'auto' },
//         { fetch_format: 'auto' },
//       ],
//     };

//     const result = await this.fileUploadService.uploadFile(file, options);
//     return {
//       success: true,
//       data: result,
//       message: 'Image uploaded successfully',
//     };
//   }

//   @Delete(':publicId')
//   @ApiOperation({ summary: 'Delete a file' })
//   async deleteFile(
//     @Param('publicId') publicId: string,
//     @Body('resourceType') resourceType?: 'image' | 'video' | 'raw'
//   ) {
//     const result = await this.fileUploadService.deleteFile(publicId, resourceType);
//     return {
//       success: result,
//       message: result ? 'File deleted successfully' : 'Failed to delete file',
//     };
//   }
// }