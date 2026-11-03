import { Controller, Get, Inject, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const DATABASE_PING_TIMEOUT_MS = 2_000;

export interface HealthStatus {
  status: 'ok';
  checks?: { database: 'up' };
}

@Controller('health')
export class HealthController {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  @Get()
  liveness(): HealthStatus {
    return { status: 'ok' };
  }

  @Get('ready')
  async readiness(): Promise<HealthStatus> {
    const databaseUp = await this.prisma.isReachable(DATABASE_PING_TIMEOUT_MS);
    if (!databaseUp) {
      throw new ServiceUnavailableException({
        status: 'error',
        checks: { database: 'down' },
      });
    }
    return { status: 'ok', checks: { database: 'up' } };
  }
}