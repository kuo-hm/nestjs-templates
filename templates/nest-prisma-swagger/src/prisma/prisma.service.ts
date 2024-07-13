import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { IPaginatedResponse } from './dto/paginate';
interface PrismaPaginationProps<Where, Args> {
  page?: number;
  limit?: number;
  model: {
    findMany: (
      args: Args & { where?: Where; skip?: number; take?: number },
    ) => Promise<any[]>;
    count: (args: { where?: Where }) => Promise<number>;
  };
  args: Args;
  where?: Where;
}
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService | null) {
    super({
      datasources: {
        db: { url: config.get('DATABASE_URL') },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async paginate<Where, Args>({
    page = 1,
    model,
    args,
    limit,
    where,
  }: PrismaPaginationProps<Where, Args>): Promise<IPaginatedResponse> {
    const skip = (page - 1) * limit;

    try {
      const [items, count] = await Promise.all([
        model.findMany({
          ...args,
          where,
          skip: skip < 0 ? 0 : skip,
          take: limit === 0 ? undefined : limit,
        }),
        model.count({ where: where }),
      ]);
      return {
        items,
        meta: {
          currentPage: page,
          itemCount: items.length,
          itemsPerPage: limit,
          totalItems: count,
          totalPages: Math.ceil(count / limit),
        },
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
