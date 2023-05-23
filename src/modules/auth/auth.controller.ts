import { Request, Response } from "express";
import { Get as tsoaGet, Route } from "tsoa";
import Controller from "../../utils/controller.decorator";
import { getErrorMessage } from "../../utils/error.handle";
import { Post } from "../../utils/handlers.decorator";
import { AuthService } from "./auth.service";

@Route("auth")
@Controller("/auth")
export class AuthController {
  private _service: AuthService;

  constructor() {
    this._service = new AuthService();
  }

  @tsoaGet("/")
  @Post("/login")
  async login({ body }: Request, res: Response) {
    try {
      const user = await this._service.login(body);
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(400)
        .json({ statuscode: 400, message: getErrorMessage(error) });
    }
  }
}