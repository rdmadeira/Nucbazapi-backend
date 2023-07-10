import { MercadoPagoPayment } from 'mercadopago/resources/payment.js';
import {
  MercadoPagoResponse,
  MercadoPagoPaymentRequest,
  MercadoPagoPaymentsResponseDto,
} from '../dto/mercadopago.js';
import { ResultPromiseResponse } from '../responseTypes/response.js';

export default interface PaymentRepository {
  createPreference(
    data: MercadoPagoPaymentRequest
  ): Promise<ResultPromiseResponse<MercadoPagoResponse>>;
  getPaymentFromPreferenceId(
    preferenceId: string
  ): Promise<ResultPromiseResponse<MercadoPagoResponse>>;
}
