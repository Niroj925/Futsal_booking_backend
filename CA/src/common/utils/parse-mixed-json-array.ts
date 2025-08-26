export function parseMixedJsonArray(value: any): any[] {
  try {
    // If value is a single JSON string, parse it first
    if (typeof value === 'string') {
      value = JSON.parse(value);
    }

    // Now value should be array-like
    if (Array.isArray(value)) {
      return value.map((item) => {
        if (typeof item === 'string') {
          try {
            return JSON.parse(item); // Parse nested stringified object
          } catch {
            return item; // If not parsable, keep as is
          }
        }
        return item;
      });
    }

    return [];
  } catch {
    return [];
  }
}
