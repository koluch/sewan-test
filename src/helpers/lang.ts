// https://basarat.gitbooks.io/typescript/docs/types/never.html
export function neverThrow(obj: never, message?: string): never {
  throw new Error(message || "Should never happen");
}

/*
  Compares to values for equality
 */
export function isEqual<T>(value: T, other: T): boolean {
  if (value === other) {
    return true;
  }

  // Get the value type
  const type = Object.prototype.toString.call(value);

  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false;

  // If items are not an object or array, return false
  if (["[object Array]", "[object Object]"].indexOf(type) < 0) return false;

  // Compare the length of the length of the two items
  const valueLen =
    type === "[object Array]"
      ? (value as any).length
      : Object.keys(value).length;
  const otherLen =
    type === "[object Array]"
      ? (other as any).length
      : Object.keys(other).length;
  if (valueLen !== otherLen) return false;

  // Compare two items
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function compare(item1: any, item2: any): boolean {
    // Get the object type
    const itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (["[object Array]", "[object Object]"].indexOf(itemType) >= 0) {
      return isEqual(item1, item2);
    }

    // Otherwise, do a simple comparison

    // If the two items are not the same type, return false
    if (itemType !== Object.prototype.toString.call(item2)) return false;

    // Else if it's a function, convert to a string and compare
    if (itemType === "[object Function]") {
      return item1.toString() === item2.toString();
    }

    // Otherwise, just compare
    return item1 === item2;
  }

  // Compare properties
  if (type === "[object Array]") {
    for (let i = 0; i < valueLen; i++) {
      if (!compare((value as any)[i], (other as any)[i])) return false;
    }
  } else {
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        if (!compare(value[key], other[key])) return false;
      }
    }
  }

  // If nothing failed, return true
  return true;
}
