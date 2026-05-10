import type { INestApplication } from '@nestjs/common';
import type { Response } from 'supertest';

export const ctx = {
  app: null as INestApplication | null,
  response: null as Response | null,
  authToken: null as string | null,
};
