import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function createValidator<T extends object>(
  cls: ClassConstructor<T>,
): (config: Record<string, unknown>) => T {
  return (config: Record<string, unknown>): T => {
    const validatedConfig = plainToInstance(cls, config, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      errors.forEach((error) =>
        console.error('•', Object.values(error.constraints!)),
      );
      process.exit(1);
    }

    return validatedConfig;
  };
}

export function isValidEnum<T extends Record<string, string>>(
  value: string,
  enumeration: T,
): boolean {
  return Object.values(enumeration).includes(value as T[keyof T]);
}
