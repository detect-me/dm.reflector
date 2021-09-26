const { NODE_ENV } = process.env;

export const IS_DEV = NODE_ENV === 'development';
export const IS_PROD = NODE_ENV === 'production';
