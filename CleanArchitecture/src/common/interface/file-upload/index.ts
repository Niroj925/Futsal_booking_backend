export interface FileUploadResult {
  url: string;
  publicId: string;
  format: string;
  resourceType: string;
}

export interface FileUploadOptions {
  folder?: string;
  transformation?: any[];
  resourceType?: 'image' | 'video' | 'raw' | 'auto';
  allowedFormats?: string[];
}