import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { createValidator } from '../helper';
import { EnvironmentVariables } from './config.validate';
import { Config } from './config';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? undefined
          : resolve(process.cwd(), '../../.env'),

      validate: createValidator(EnvironmentVariables),
      validationOptions: { allowUnknown: false },
    }),
  ],
  providers: [Config],
  exports: [Config],
})
export class ConfigModule {}
