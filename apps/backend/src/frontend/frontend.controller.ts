import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { Config } from '../config/config';

@Controller()
export class FrontendController {
  constructor(private readonly config: Config) {}

  @Get()
  getIndex(@Res() res: Response) {
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'apps',
      'frontend',
      'dist',
      'index.html',
    );

    let html = fs.readFileSync(filePath, 'utf8');
    html = html.replace(/{{VITE_BASE_API_URL}}/g, this.config.getBaseApiUrl());

    res.setHeader('Content-Type', 'text/html');
    return res.send(html);
  }
}
