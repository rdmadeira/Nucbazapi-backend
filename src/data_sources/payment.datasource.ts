import /* configure, preferences */ mercadopago from 'mercadopago';
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model.js';
import { PreferenceCreateResponse } from 'mercadopago/resources/preferences.js';
import process from 'process';
import prisma from '../config/db.js';
import {
  MercadoPagoPaymentRequest,
  MercadoPagoResponse,
} from '../core/dto/mercadopago.js';
import PaymentRepository from '../core/repositories/payment.repository.js';

export default class PaymentDataSource implements PaymentRepository {
  public async createPreference(
    data: MercadoPagoPaymentRequest
  ): Promise<MercadoPagoResponse> {
    configMercadoPagoSDK();

    const preferenceData: CreatePreferencePayload = {
      /* CreatePreferencePayload es un tipado de mercadopago */
      ...data,

      // shipments.cost Es una prop del tipo CreatePreferencePayload, para agregarnos precio de envío,
      shipments: {
        cost: data.shipments?.cost,
      },
      back_urls: {
        pending: process.env.PENDING_BACK_URL!,
        success: process.env.SUCCESS_BACK_URL!,
        failure: process.env.FAILURE_BACK_URL!,
      },
    };

    // Crea la preferencia:
    try {
      const preference = await mercadopago.preferences.create(preferenceData);
      return {
        preferenceId: preference.body.id,
        init_point: preference.body.init_point,
        sandbox_init_point: preference.body.sandbox_init_point,
      };
    } catch (error) {
      console.log('error', error);

      return {
        preferenceId: 'null',
        init_point: 'null',
        sandbox_init_point: 'preference.body.sandbox_init_point',
      };
    }

    // Retorna el objeto tipo MercadoPagoResponse:
  }
}

function configMercadoPagoSDK() {
  mercadopago.configure({ access_token: process.env.ACCESS_TOKEN_MP! });
}
