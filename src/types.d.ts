declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'dev' | 'prod' | 'production' | 'build' | 'test' | 'testing';
    PORT: string;
  }
}

export type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift'
export type ArrayLen<T, L extends number, TObj = [T, ...Array<T>]> =
  Pick<TObj, Exclude<keyof TObj, ArrayLengthMutationKeys>>
  & {
    readonly length: L
    [I: number]: T
    [Symbol.iterator]: () => IterableIterator<T>
  }