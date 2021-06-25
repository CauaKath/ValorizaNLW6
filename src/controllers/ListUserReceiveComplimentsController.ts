import { ListUserReceiveComplimetsService } from "../service/ListUserReceiveComplimetsService";
import { Request, Response } from "express";

class ListUserReceiveComplimentsController {

  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUserReceiveComplimetsService = new ListUserReceiveComplimetsService();

    const compliments = await listUserReceiveComplimetsService.execute(user_id);

    return response.json(compliments);
  }
}

export { ListUserReceiveComplimentsController };