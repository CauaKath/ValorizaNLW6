import { ListUserSendComplimetsService } from "../service/ListUserSendComplimetsService";
import { Request, Response } from "express";

class ListUserSendComplimentsController {

  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUserSendComplimetsService = new ListUserSendComplimetsService();

    const compliments = await listUserSendComplimetsService.execute(user_id);

    return response.json(compliments);
  }
}

export { ListUserSendComplimentsController };