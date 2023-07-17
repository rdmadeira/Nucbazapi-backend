import /* configure, preferences */ mercadopago from 'mercadopago';
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model.js';

import process from 'process';
import prisma from '../config/db.js';
import {
  MercadoPagoPaymentRequest,
  MercadoPagoResponse,
  MercadoPagoPaymentsResponseDto,
} from '../core/dto/mercadopago.js';
import { ResultPromiseResponse } from '../core/responseTypes/response.js';

import PaymentRepository from '../core/repositories/payment.repository.js';
import { ServerError } from '../errors/server_error.js';

export default class PaymentDataSource implements PaymentRepository {
  public async createPreference(
    data: MercadoPagoPaymentRequest
  ): Promise<ResultPromiseResponse<MercadoPagoResponse>> {
    configMercadoPagoSDK();

    const preferenceData: CreatePreferencePayload = {
      /* CreatePreferencePayload es un tipado de mercadopago */
      ...data,
      external_reference: data.external_reference,
      // shipments.cost Es una prop del tipo CreatePreferencePayload, para agregarnos precio de envío,
      shipments: {
        cost: data.shipments?.cost,
      },
      back_urls: {
        pending: process.env.PENDING_BACK_URL!,
        success: `${process.env.SUCCESS_BACK_URL!}/${data.external_reference}`, // Es el preferenceId que es la referencia a MP
        failure: process.env.FAILURE_BACK_URL!,
      },
    };

    // Crea la preferencia:
    try {
      const preference = await mercadopago.preferences.create(preferenceData);
      await prisma.orders.update({
        where: { id: data.external_reference },
        data: { paymentId: preference.body.id },
      });

      return {
        result: {
          preferenceId: preference.body.id,
          init_point: preference.body.init_point,
          sandbox_init_point: preference.body.sandbox_init_point,
        },
        success: true,
      };
    } catch (error) {
      console.log('error', error);
      const err = new ServerError('Error interno en servicio');
      return {
        err,
        success: false,
      };
    }

    // Retorna el objeto tipo MercadoPagoResponse:
  }
  // No está en la videoaula:
  public async getPaymentFromPreferenceId(
    preferenceId: string
  ): Promise<ResultPromiseResponse<MercadoPagoResponse>> {
    console.log('preferenceId', preferenceId);

    try {
      const createPreferenceResult: any = await fetch(
        `https://api.mercadopago.com/checkout/preferences/${preferenceId}`,

        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN_MP}`,
          },
        }
      ).then((res) => res.json());

      console.log('paymentData', createPreferenceResult);

      return {
        result: {
          preferenceId: createPreferenceResult.id,
          init_point: createPreferenceResult.init_point,
          sandbox_init_point: createPreferenceResult.sandbox_init_point,
        },
        success: true,
      };
    } catch (error) {
      const err = new ServerError('Error interno en servicio');
      console.log('error', error);

      return { err, success: false };
    }
  }
}

function configMercadoPagoSDK() {
  mercadopago.configure({ access_token: process.env.ACCESS_TOKEN_MP! });
}
