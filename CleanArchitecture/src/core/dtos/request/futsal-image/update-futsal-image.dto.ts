import { PartialType } from '@nestjs/swagger';
import { CreateFutsalImageDto } from './create-futsal-image.dto';

export class UpdateFutsalImageDto extends PartialType(CreateFutsalImageDto) {}
