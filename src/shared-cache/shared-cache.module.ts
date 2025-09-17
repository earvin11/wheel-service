import { Module } from '@nestjs/common';
import { SharedCacheService } from './shared-cache.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  exports: [SharedCacheService],
  imports: [CacheModule.register()],
  providers: [SharedCacheService],
})
export class SharedCacheModule {}
