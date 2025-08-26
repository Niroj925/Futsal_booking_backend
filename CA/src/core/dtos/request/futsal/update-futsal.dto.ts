import { PartialType } from '@nestjs/swagger';
import { CreateFutsalDto } from './create-futsal.dto';

export class UpdateFutsalDto extends PartialType(CreateFutsalDto) {}
