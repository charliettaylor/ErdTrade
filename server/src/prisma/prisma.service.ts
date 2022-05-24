import {
  INestApplication,
  Inject,
  Injectable,
  OnModuleInit,
  Optional,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    @Optional()
    @Inject('PRISMA_SERVICE_OPTIONS')
    private clientOptions?: Prisma.PrismaClientOptions,
  ) {
    super(clientOptions);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
