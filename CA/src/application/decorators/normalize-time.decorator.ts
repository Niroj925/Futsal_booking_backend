// src/common/decorators/normalize-time.decorator.ts
import { Transform } from "class-transformer";
import { normalizeTimeFormat } from "src/common/utils/time-normalizer";

export function NormalizeTime() {
  return Transform(({ value }) => {
    if (typeof value === "string") {
      return normalizeTimeFormat(value);
    }
    return value;
  });
}
