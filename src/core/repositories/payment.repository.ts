import { MercadoPagoPayment } from 'mercadopago/resources/payment.js';
import {
  MercadoPagoResponse,
  MercadoPagoPaymentRequest,
  MercadoPagoPaymentResponseDto,
} from '../dto/mercadopago.js';

export default interface PaymentRepository {
  createPreference(
    data: MercadoPagoPaymentRequest
  ): Promise<MercadoPagoResponse>;
  getPaymentFromOrderId(
    orderId: string
  ): Promise<MercadoPagoPaymentResponseDto>;
}
