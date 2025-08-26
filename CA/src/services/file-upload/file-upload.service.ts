import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { FileUploadOptions, FileUploadResult } from 'src/common/interface/file-upload';


@Injectable()
export class FileUploadService {
  constructor(private readonly configService: ConfigService) {
    // Initialize Cloudinary configuration
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  /**
   * Upload a single file to Cloudinary
   * @param file - File buffer or file path
   * @param options - Upload options
   * @returns Promise<FileUploadResult>
   */
//   async uploadFile(
//     file: Buffer | Express.Multer.File | string,
//     options: FileUploadOptions = {}
//   ): Promise<FileUploadResult> {
//     try {
//       const uploadOptions = this.buildUploadOptions(options);
//       let fileToUpload: Buffer | string;

//       // Handle different file input types
//       if (Buffer.isBuffer(file)) {
//         fileToUpload = file;
//       } else if (typeof file === 'string') {
//         fileToUpload = file;
//       } else if (file.buffer) {
//         fileToUpload = file.buffer;
//       } else {
//         throw new BadRequestException('Invalid file format provided');
//       }

//       const result: UploadApiResponse = await new Promise((resolve, reject) => {
//         if (Buffer.isBuffer(fileToUpload)) {
//           cloudinary.uploader.upload_stream(
//             uploadOptions,
//             (error, result) => {
//               if (error) reject(error);
//               else if (result) resolve(result);
//               else reject(new Error('Upload failed: No result returned'));
//             }
//           ).end(fileToUpload);
//         } else {
//           cloudinary.uploader.upload(fileToUpload as string, uploadOptions, (error, result) => {
//             if (error) reject(error);
//             else if (result) resolve(result);
//             else reject(new Error('Upload failed: No result returned'));
//           });
//         }
//       });

//       return {
//         url: result.secure_url,
//         publicId: result.public_id,
//         format: result.format,
//         resourceType: result.resource_type,
//       };
//     } catch (error) {
//       throw new InternalServerErrorException(`File upload failed: ${error.message}`);
//     }
//   }

  async uploadFile(file: Buffer | string): Promise<FileUploadResult> {
    try {
      let fileToUpload: Buffer | string;

      // Only accept Buffer or string (URL/path)
      if (Buffer.isBuffer(file)) {
        fileToUpload = file;
      } else if (typeof file === 'string') {
        fileToUpload = file;
      } else {
        throw new BadRequestException('Invalid file format: only Buffer or string allowed');
      }

      const result: UploadApiResponse = await new Promise((resolve, reject) => {
        if (Buffer.isBuffer(fileToUpload)) {
          cloudinary.uploader
            .upload_stream((error, result) => {
              if (error) reject(error);
              else if (result) resolve(result);
              else reject(new Error('Upload failed: No result returned'));
            })
            .end(fileToUpload);
        } else {
          cloudinary.uploader.upload(fileToUpload as string, (error, result) => {
            if (error) reject(error);
            else if (result) resolve(result);
            else reject(new Error('Upload failed: No result returned'));
          });
        }
      });

      return {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        resourceType: result.resource_type,
      };
    } catch (error) {
      throw new InternalServerErrorException(`File upload failed: ${error.message}`);
    }
  }

  /**
   * Upload multiple files to Cloudinary
   * @param files - Array of files
   * @param options - Upload options
   * @returns Promise<FileUploadResult[]>
   */
//   async uploadMultipleFiles(
//     files: (Buffer | Express.Multer.File | string)[],
//     options: FileUploadOptions = {}
//   ): Promise<FileUploadResult[]> {
//     try {
//       const uploadPromises = files.map(file => this.uploadFile(file, options));
//       return await Promise.all(uploadPromises);
//     } catch (error) {
//       throw new InternalServerErrorException(`Multiple file upload failed: ${error.message}`);
//     }
//   }

  /**
   * Delete a file from Cloudinary
   * @param publicId - Public ID of the file to delete
   * @param resourceType - Type of resource (image, video, raw)
   * @returns Promise<boolean>
   */
  async deleteFile(publicId: string, resourceType: 'image' | 'video' | 'raw' = 'image'): Promise<boolean> {
    try {
      const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
      return result.result === 'ok';
    } catch (error) {
      throw new InternalServerErrorException(`File deletion failed: ${error.message}`);
    }
  }

  /**
   * Get file URL with transformations
   * @param publicId - Public ID of the file
   * @param transformations - Cloudinary transformations
   * @returns string - Transformed file URL
   */
  getTransformedUrl(publicId: string, transformations: any[] = []): string {
    try {
      return cloudinary.url(publicId, {
        transformation: transformations,
        secure: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(`URL generation failed: ${error.message}`);
    }
  }

  /**
   * Validate file before upload
   * @param file - File to validate
   * @param options - Validation options
   * @returns boolean
   */
  private validateFile(file: Express.Multer.File, options: FileUploadOptions): boolean {
    // Check file size (default 10MB)
    const maxSize = this.configService.get<number>('MAX_FILE_SIZE') || 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException(`File size exceeds maximum allowed size of ${maxSize} bytes`);
    }

    // Check allowed formats
    if (options.allowedFormats && options.allowedFormats.length > 0) {
      const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
      if (!fileExtension || !options.allowedFormats.includes(fileExtension)) {
        throw new BadRequestException(`File format not allowed. Allowed formats: ${options.allowedFormats.join(', ')}`);
      }
    }

    return true;
  }

  /**
   * Build upload options for Cloudinary
   * @param options - User provided options
   * @returns Cloudinary upload options
   */
  private buildUploadOptions(options: FileUploadOptions): any {
    const uploadOptions: any = {
      resource_type: options.resourceType || 'auto',
      folder: options.folder || 'uploads',
      use_filename: true,
      unique_filename: true,
    };

    if (options.transformation && options.transformation.length > 0) {
      uploadOptions.transformation = options.transformation;
    }

    if (options.allowedFormats && options.allowedFormats.length > 0) {
      uploadOptions.allowed_formats = options.allowedFormats;
    }

    return uploadOptions;
  }
}