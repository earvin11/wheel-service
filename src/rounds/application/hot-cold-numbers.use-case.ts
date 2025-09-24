import { Injectable } from '@nestjs/common';
import { RoundEntity } from '../domain/entities/round.entity';
import { RoundRepository } from '../domain/repositories/round.repository';
import { RoundCacheUseCases } from './round-cache.use-cases';

@Injectable()
export class HotColdNumbersUseCase {
  constructor(
    private readonly roundRepository: RoundRepository,
    private readonly roundCacheUseCases: RoundCacheUseCases,
  ) {}

  // async run(limit: number) {
  //   const limitAdjust = this.adjustRounds(limit);

  //   const resultExists = await this.roundCacheUseCases.findHotCold(
  //     String(limitAdjust),
  //   );
  //   if (resultExists) return JSON.parse(resultExists);

  //   const rounds = await this.roundRepository.findManyBy(
  //     {},
  //     { $natural: -1 },
  //     limitAdjust,
  //   );

  //   const frequency = this.calculateFrequency(rounds);
  //   const result = this.formatHotCold(frequency);

  //   await this.roundCacheUseCases.saveHotCold(String(limitAdjust), result);
  //   return result;
  // }

  // private calculateFrequency(rounds: RoundEntity[]): Record<number, number> {
  //   // Inicializamos todos los números con frecuencia 0
  //   const freq: Record<number, number> = {};
  //   for (let i = 0; i <= 36; i++) {
  //     freq[i] = 0;
  //   }

  //   // Sumamos las apariciones
  //   for (const r of rounds) {
  //     if (r.result >= 0 && r.result <= 36) {
  //       freq[r.result]++;
  //     }
  //   }
  //   return freq;
  // }

  private formatHotCold(freq: Record<number, number>) {
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    return {
      hotNumbers: sorted
        .slice(0, 5)
        .map(([num, count]) => ({ number: +num, resulted: count })),
      coldNumbers: sorted
        .slice(-5)
        .map(([num, count]) => ({ number: +num, resulted: count })),
    };
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  private adjustRounds(rounds: number): number {
    const rounded = Math.round(rounds / 25) * 25; // redondear al múltiplo de 25
    return this.clamp(rounded, 50, 500); // ajustar al rango permitido
  }
}
