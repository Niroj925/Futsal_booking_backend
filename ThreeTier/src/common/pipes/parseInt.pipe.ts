import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class CustomParseIntPipe implements PipeTransform {
  transform(value: string): number {
    const val = parseInt(value, 10)

    if (isNaN(val)) {
      throw new BadRequestException(`Invalid number: ${value}`);
    }
    return val;
  }
}
