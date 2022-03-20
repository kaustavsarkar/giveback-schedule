export type Builder<T> = {
  [k in keyof T]: (args: T[k]) => Builder<T>;
} & {build(): T};
