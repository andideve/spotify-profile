const isObject = (arg: unknown): arg is Record<string, unknown> =>
  !Array.isArray(arg) && typeof arg === 'object';

const mergeObj = <T>(a: Record<string, unknown>, b: Record<string, unknown>): T => {
  let result = a;

  Object.keys(b).forEach((key) => {
    const oldVal = a[key];
    let newVal = b[key];

    if (isObject(oldVal) && isObject(newVal)) {
      newVal = mergeObj(oldVal, newVal);
    }

    result = { ...result, [key]: newVal };
  });

  return result as T;
};

export default mergeObj;
