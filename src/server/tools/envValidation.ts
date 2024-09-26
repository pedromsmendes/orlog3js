import chalk from 'chalk';

const separator = '-'.repeat(40);

export type RequiredVarGroup = {
  allOf?: RequiredVar[];
  oneOf?: RequiredVar[];
};

export type RequiredVar = string | RequiredVarGroup;

const isDefined = (varName: RequiredVar): boolean => {
  if (typeof varName === 'string') {
    return Boolean(process.env[varName]);
  }

  const { allOf, oneOf } = varName;

  if (allOf) {
    return allOf.every(isDefined);
  }

  if (oneOf) {
    return oneOf.some(isDefined);
  }

  return false;
};

const formatVarError = (varName: RequiredVar): string => {
  if (typeof varName === 'string') {
    return chalk.bgYellowBright.black(`"${varName}"`);
  }

  const { allOf, oneOf } = varName as RequiredVarGroup;

  if (allOf) {
    return `${chalk.cyan('all of')}: ${allOf.map(formatVarError).join(', ')}`;
  }

  if (oneOf) {
    return `${chalk.cyan('one of')}:\n- ${oneOf.map(formatVarError).join('\n- ')}`;
  }

  return '';
};

export const validateEnvVariables = (requiredVars: RequiredVar[]) => {
  const errors: string[] = [];

  requiredVars.forEach((varGroup) => {
    if (!isDefined(varGroup)) {
      errors.push(formatVarError(varGroup));
    }
  });

  if (errors.length) {
    const str = errors.join(`\n${separator}\n`);
    const errorMsg = `Missing variables: \n${separator}\n${str}\n${separator}`;
    throw new Error(errorMsg);
  }
};
