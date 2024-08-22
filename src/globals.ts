export const IN_DEV = ['development', 'dev'].includes(process.env.NODE_ENV?.toLowerCase() || '');
export const IN_TEST = ['test', 'testing'].includes(process.env.NODE_ENV?.toLowerCase() || '');
export const IN_PROD = ['production', 'prod', 'build'].includes(process.env.NODE_ENV?.toLowerCase() || '');

export const PORT = parseInt(process.env.PORT || '3000', 10);

export const SECONDS = 1000;
export const MINUTES = SECONDS * 60;
export const HOURS = MINUTES * 60;
export const DAYS = HOURS * 24;
export const WEEKS = DAYS * 7;
