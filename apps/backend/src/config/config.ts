import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Config {
  constructor(private readonly configService: ConfigService) {}

  getNodeEnv(): 'development' | 'production' {
    return this.configService.getOrThrow<'development' | 'production'>(
      'NODE_ENV',
    );
  }

  isProduction(): boolean {
    return this.getNodeEnv() === 'production';
  }

  getCorsDetails():
    | { origin: string | undefined; methods: string[]; credentials: boolean }
    | undefined {
    return {
      origin: this.getCorsOrigin(),
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      credentials: true,
    };
  }

  /* *************** */
  /* URLS */
  /* *************** */

  getBaseUrl(): string {
    return this.configService.getOrThrow('VITE_BASE_URL');
  }

  getBaseApiUrl(): string {
    return this.configService.getOrThrow('VITE_BASE_API_URL');
  }

  /* *************** */
  /* GLOBAL SETTINGS */
  /* *************** */

  getPort(): number {
    return parseInt(this.configService.getOrThrow('PORT'), 10);
  }

  getCorsOrigin(): string | undefined {
    const origin = this.configService.getOrThrow('CORS_ORIGIN');
    if (!origin) return;
    return origin.split(',');
  }

  /* *************** */
  /* DATABASE */
  /* *************** */

  getDbPort(): number {
    return parseInt(this.configService.getOrThrow('DB_PORT'), 10);
  }

  getDbSync(): boolean {
    return this.configService.getOrThrow('DB_SYNC') === 'true';
  }

  getDbHost(): string {
    return this.configService.getOrThrow('DB_HOST');
  }

  getDbUser(): string {
    return this.configService.getOrThrow('DB_USERNAME');
  }

  getDbPassword(): string {
    return this.configService.getOrThrow('DB_PASSWORD');
  }

  getDbName(): string {
    return this.configService.getOrThrow('DB_DATABASE');
  }

  /* *************** */
  /* SECRETS */
  /* *************** */

  getApiKey(): string {
    return this.configService.getOrThrow('API_KEY');
  }

  getJWTAlgorithm(): string {
    return 'HS512';
  }

  /* *************** */
  /* OPEN API SETUP */
  /* *************** */

  getSwaggerSetup(): {
    name: string;
    description: string;
    version: string;
    path: string;
  } {
    return {
      name: 'StableStabler API',
      description: 'This api will manage and create new sessions for a multi- & single-player game',
      version: '1.0',
      path: 'docs',
    };
  }
}
