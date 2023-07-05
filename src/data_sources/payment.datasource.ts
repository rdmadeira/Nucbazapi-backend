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
        success: process.env.SUCCESS_BACK_URL!,
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
  public async getPaymentFromOrderId(
    orderId: string
  ): Promise<ResultPromiseResponse<MercadoPagoPaymentsResponseDto>> {
    try {
      const paymentsResult: any = await fetch(
        `https://api.mercadopago.com/v1/merchant_orders/search?external_reference=${orderId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN_MP}`,
          },
        }
      ).then((res) => res.json());

      /*       const payment = (await paymentsResult).results[0];
       */
      return {
        result: {
          results: paymentsResult.results,
          paging: paymentsResult.paging,
        },
        success: true,
      };
    } catch (error) {
      const err = new ServerError('Error interno en servicio');
      return { err, success: false };
    }
  }
}

function configMercadoPagoSDK() {
  mercadopago.configure({ access_token: process.env.ACCESS_TOKEN_MP! });
}
