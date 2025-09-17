import { Injectable } from '@nestjs/common';
import { OperatorConfigUseCases } from 'src/operators/application/operator-config.use-cases';
import { LaunchDto } from '../infraestructure/dto/launch.dto';
import { CommunicationWalletPort } from 'src/comunication-ms/domain/ports/communication-wallet.port';
import { CommunicationOperatorPort } from 'src/comunication-ms/domain/ports/communication-operator.port';
// import { CommunicationCurrencyPort } from 'src/comunication-ms/domain/ports/communiaction-currency.port';
import { RouletteUseCases } from 'src/roulette/application/roulette.use-cases';
import { RouletteEntity } from 'src/roulette/domain/entites/roulette.entity';
import { OperatorConfigEntity } from 'src/operators/domain/entites/operator-config.entity';
import { OperatorLimitsUseCases } from 'src/operators/application/operator-limits.use-cases';
import { OperatorLimitsEntity } from 'src/operators/domain/entites/operator-limits.entity';
import { RoundUseCases } from 'src/rounds/application';
import { CommunicationChipsPort } from 'src/comunication-ms/domain/ports/communication-chips.port';
import { LoggerPort } from 'src/logging/domain/logger.port';

@Injectable()
export class LaunchUseCases {
  constructor(
    private readonly operatorConfig: OperatorConfigUseCases,
    private readonly operatorLimitsUseCases: OperatorLimitsUseCases,
    private readonly rouletteUseCases: RouletteUseCases,
    private readonly roundUseCases: RoundUseCases,
    private readonly communicationWallet: CommunicationWalletPort,
    private readonly communicationOperator: CommunicationOperatorPort,
    private readonly communicationChips: CommunicationChipsPort,
    // private readonly communicationCurrency: CommunicationCurrencyPort,
    private readonly loggerPort: LoggerPort,
  ) {}

  async run(launchData: LaunchDto) {
    try {
      const operator = await this.communicationOperator.findById(
        launchData.operatorId,
      );
      if (!operator)
        return { ok: false, status: 404, message: 'Operator not found' };
      if (!operator.status)
        return { ok: false, status: 401, message: 'Operator disabled' };

      const playerAuth = await this.communicationWallet.auth(
        launchData.operatorId,
        launchData.token,
      );
      if (!playerAuth)
        return { ok: false, status: 401, message: 'Error auth player' };

      // const currency = await this.communicationCurrency.findByISOCode(playerAuth.currency.short);
      // if(!currency) return { ok: false, status: 404, message: 'Currency not found' }

      const roulette = await this.rouletteUseCases.findByUuid(
        launchData.casinoId,
      );
      if (!roulette)
        return { ok: false, status: 404, message: 'Roulette not found' };

      const operatorConfig = await this.operatorConfig.findByOperator(
        launchData.operatorId,
      );
      if (!operatorConfig)
        return {
          ok: false,
          status: 400,
          message: 'Operator dont have config in this roulette',
        };

      if (!operatorConfig.currencies.includes(playerAuth.currency.short))
        return {
          ok: false,
          status: 400,
          message: 'Currency not available by operator in this roulette',
        };

      const limits = await this.operatorLimitsUseCases.findOneBy({
        operator: launchData.operatorId,
        currency: playerAuth.currency.short,
      });
      if (!limits)
        return {
          ok: false,
          status: 400,
          message: 'Limits by currency in operator not found',
        };

      const latestResults = await this.roundUseCases.getLatestResults(33);
      const chips = await this.communicationChips.findByOperatorAndCurrency(
        launchData.operatorId,
        playerAuth.currency.id,
      );

      return {
        ok: true,
        status: 200,
        message: 'Player success',
        player: playerAuth,
        casinoData: this.buildCasinoData(roulette, operatorConfig, limits),
        minBet: limits.minBet,
        maxBet: limits.maxBet,
        latestResults,
        liveVideo: roulette.urlTransmision,
        casinoChips: chips,
        buttons: {
          lobby: operator.buttonLobby,
          support: operator.buttonSupport,
        },
      };
    } catch (error) {
      this.loggerPort.error('Error in LaunchUseCases.run', error);
      throw error;
    }
  }

  private buildCasinoData(
    roulette: RouletteEntity,
    operatorConfig: OperatorConfigEntity,
    limits: OperatorLimitsEntity,
  ) {
    return {
      // _id: roulette._id
      id: roulette.uuid,
      doubleZero: roulette.doubleZero,
      name: roulette.name,
      roundDuration: roulette.roundDuration,
      providerId: roulette.providerId,
      urlTransmision: roulette.timeToReleaseJack,
      layout: operatorConfig.layout,
      template: operatorConfig.template,
      active: roulette.active,
      openingTime: roulette.openingTime,
      closingTime: roulette.closingTime,
      imgBackground: roulette.imgBackground,
      manualDisable: roulette.manualDisable,
      maxPlenosBet: roulette.maxPlenosBet,
      ...this.buildLimits(limits, operatorConfig),
      // language
      // lastJackpot
    };
  }

  private buildLimits(
    limits: OperatorLimitsEntity,
    config: OperatorConfigEntity,
  ) {
    return {
      pleno: {
        ...limits.pleno,
        pay: config.pleno,
      },
      semipleno: {
        ...limits.semipleno,
        pay: config.semiPleno,
      },
      cuadro: {
        ...limits.cuadro,
        pay: config.cuadro,
      },
      calle: {
        ...limits.calle,
        pay: config.calle,
      },
      linea: {
        ...limits.linea,
        pay: config.linea,
      },
      columna: {
        ...limits.columna,
        pay: config.column,
      },
      docena: {
        ...limits.docena,
        pay: config.dozens,
      },
      chanceSimple: {
        ...limits.chanceSimple,
        pay: config.chanceSimple,
      },
      colorBet: {
        ...limits.color,
        pay: config.chanceSimple,
      },
      even_odd: {
        ...limits.even_odd,
        pay: config.chanceSimple,
      },
      cubre: {
        ...limits.cubre,
        pay: config.cubre,
      },
      specialCalle: {
        ...limits.specialCalle,
        pay: config.specialCalle,
      },
      minBet: limits.minBet,
      maxBet: limits.maxBet,
      maxBetPosition: limits.maxBetPosition,
    };
  }
}
