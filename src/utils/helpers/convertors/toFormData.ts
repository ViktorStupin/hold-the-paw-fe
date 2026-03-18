type FormDataValue = string | Blob | boolean | number | null | undefined;
type FormDataCompatible<T> = {
  [K in keyof T]: T[K] extends FormDataValue | FormDataValue[] ? T[K] : never;
};

export function toFormData<T extends FormDataCompatible<T>>(data: T): FormData {
  const fd = new FormData();

  for (const key in data) {
    const value = data[key];

    if (value === null || value === undefined) continue;

    if (Array.isArray(value)) {
      value.forEach((item) => fd.append(key, item as string | Blob));
    } else if (typeof value === 'boolean' || typeof value === 'number') {
      fd.append(key, String(value));
    } else {
      fd.append(key, value as string | Blob);
    }
  }

  return fd;
}
