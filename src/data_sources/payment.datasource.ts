import { configure, preferences } from 'mercadopago';
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model.js';
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
      items: [],
      back_urls: {},
    };

    // Crea la preferencia:
    const preference = await preferences.create(preferenceData);
  }
}

function configMercadoPagoSDK() {
  configure({ access_token: process.env.ACCESS_TOKEN_MP! });
}
