import {
  DynamicModule,
  Module,
  ModuleMetadata,
  Provider,
  Type,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
  static forRootAsync(options: PrismaModuleAsyncOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: PrismaModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
    };
  }

  private static createAsyncProviders(
    options: PrismaModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return this.createAsyncOptionsProvider(options);
    }

    return [
      ...this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: PrismaModuleAsyncOptions,
  ): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: 'PRISMA_SERVICE_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ];
    }

    return [
      {
        provide: 'PRISMA_SERVICE_OPTIONS',
        useFactory: async (optionsFactory: PrismaOptionsFactory) =>
          await optionsFactory.createPrismaOptions(),
        inject: [options.useExisting || options.useClass],
      },
    ];
  }
}

export interface PrismaOptionsFactory {
  createPrismaOptions():
    | Promise<Prisma.PrismaClientOptions>
    | Prisma.PrismaClientOptions;
}

export interface PrismaModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;
  useExisting?: Type<Prisma.PrismaClientOptions>;
  useClass?: Type<Prisma.PrismaClientOptions>;
  useFactory?: (
    ...args: any[]
  ) => Promise<Prisma.PrismaClientOptions> | Prisma.PrismaClientOptions;
  inject?: any[];
  clientOptions?: Prisma.PrismaClientOptions;
}
