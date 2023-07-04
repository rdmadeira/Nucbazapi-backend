import {
  MercadoPagoResponse,
  MercadoPagoPaymentRequest,
} from '../dto/mercadopago.js';

export default interface PaymentRepository {
  createPreference(
    data: MercadoPagoPaymentRequest
  ): Promise<MercadoPagoResponse>;
}
