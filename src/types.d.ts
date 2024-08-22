declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'dev' | 'prod' | 'production' | 'build' | 'test' | 'testing';
    PORT: string;
  }
}
