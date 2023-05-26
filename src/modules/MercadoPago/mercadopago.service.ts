import { Request } from "express";
import * as mercado from "mercadopago";
import variables from "../../configuration/dotenv";

const { MERCADO_ACC_TOK } = variables;

export class MercadoPagoService {
  private mercadopago: typeof mercado;

  constructor() {
    this.mercadopago = mercado;
    this.mercadopago.configure({
      access_token: MERCADO_ACC_TOK,
    });
  }

  createPayment({ body }: Request): Promise<any> {
    console.log(body);

    const { description, price, quantity } = body;

    return this.mercadopago.preferences.create({
      items: [
        {
          title: description,
          quantity: Number(price),
          unit_price: Number(quantity),
        },
      ],
      back_urls: {
        success: "http://localhost:8080/payemnt/mercadopago/sucess",
        failure: "http://localhost:8080/payemnt/mercadopago/failure",
        pending: "http://localhost:8080/payemnt/mercadopago/pending",
      },
      auto_return: "approved",
    });
  }
}
