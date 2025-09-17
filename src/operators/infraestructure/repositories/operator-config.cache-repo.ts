import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { OperatorConfigEntity } from 'src/operators/domain/entites/operator-config.entity';
import { OperatorConfigCacheRepository } from 'src/operators/domain/repositories/operator-config.cache-repository';

export class OperatorConfigCacheRepo implements OperatorConfigCacheRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async save(data: OperatorConfigEntity): Promise<string> {
    return await this.cacheManager.set(
      `operator-config: ${data.operator}`,
      JSON.stringify(data),
    );
  }
  async findByOperator(operatorId: string): Promise<string | null> {
    return await this.cacheManager.get(`operator-config${operatorId}`);
  }
  async remove(operatorId: string): Promise<void> {
    await this.cacheManager.del(`operator-config${operatorId}`);
    return;
  }
}
