export const validateIntValue = (value: string): number => {
  const res = parseInt(value);
  if (isNaN(res)) {
    return null;
  }
  return res;
};

export const validateArrayIntValue = (value: string): number[] => {
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      const array = value as string[];
      const res: number[] = array.map((item) => parseInt(item));
      return res;
    }
    return value;
  }
  const res: number[] = JSON.parse(value);
  if (!Array.isArray(res)) {
    return null;
  }
  return res;
};

export const validateBooleanValue = (value: string | boolean): boolean => {
  if (typeof value === 'boolean') {
    return value;
  }
  if (value === 'true') {
    return true;
  }
  return false;
};

export const validateArrayStringValue = (value: string): Array<any> | null => {
  try {
    const trimmedValue = value.trim(); // Remove any leading/trailing whitespace
    const fixedString = trimmedValue.replace(/'/g, '"');
    const arrayOfObjects = JSON.parse(fixedString);

    return arrayOfObjects;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null; // Return null in case of any parsing errors
  }
};
