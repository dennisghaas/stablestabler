import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { dirname } from 'path';
import { existsSync } from 'fs';
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

export function resolveFrontendDistDirHelper() {
  let dir = __dirname;

  while (dir !== '/') {
    if (
      dir.endsWith('/apps/backend/dist') ||
      dir.includes('/apps/backend/dist')
    ) {
      const frontendPath = dir.replace(
        '/apps/backend/dist',
        '/apps/frontend/dist',
      );

      if (existsSync(frontendPath)) {
        return frontendPath;
      }
    }
    dir = dirname(dir);
  }

  throw new Error('Frontend dist path could not be detect automatically.');
}
