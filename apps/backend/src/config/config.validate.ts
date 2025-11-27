import {
  IsString,
  IsUrl,
  IsNumber,
  IsBooleanString,
  IsOptional,
  ValidateIf,
} from 'class-validator';

const isProdEnv = () => process.env.NODE_ENV === 'production';

export class EnvironmentVariables {
  @ValidateIf(() => isProdEnv())
  @IsUrl({}, { message: 'VITE_BASE_URL must be a valid URL in production' })
  @ValidateIf(() => !isProdEnv())
  @IsString({ message: 'VITE_BASE_URL must be a string in development' })
  VITE_BASE_URL: string;

  @ValidateIf(() => isProdEnv())
  @IsUrl({}, { message: 'VITE_BASE_API_URL must be a valid URL in production' })
  @ValidateIf(() => !isProdEnv())
  @IsString({ message: 'VITE_BASE_API_URL must be a string in development' })
  VITE_BASE_API_URL: string;

  @IsNumber({}, { message: 'PORT must be a number' })
  PORT: number;

  @IsString({
    message: 'CORS_ORIGIN must be a string (comma separated URLs allowed)',
  })
  @IsOptional()
  CORS_ORIGIN?: string;

  @IsString({ message: 'DB_TYPE must be defined (e.g., postgres)' })
  DB_TYPE: string;

  @IsNumber({}, { message: 'DB_PORT must be a number' })
  DB_PORT: number;

  @IsBooleanString({
    message: 'DB_SYNC must be a boolean string ("true" or "false")',
  })
  DB_SYNC: string;

  @IsString({ message: 'DB_HOST must be defined' })
  DB_HOST: string;

  @IsString({ message: 'DB_USERNAME must be defined' })
  DB_USERNAME: string;

  @IsString({ message: 'DB_PASSWORD must be defined' })
  DB_PASSWORD: string;

  @IsString({ message: 'DB_DATABASE must be defined' })
  DB_DATABASE: string;

  @IsString({ message: 'VITE_API_KEY must be defined' })
  API_KEY: string;
}
