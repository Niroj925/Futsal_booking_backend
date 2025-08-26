import { PartialType } from '@nestjs/swagger';
import { CreateFutsalCourtDto } from './create-futsal-court.dto';

export class UpdateFutsalCourtDto extends PartialType(CreateFutsalCourtDto) {}
