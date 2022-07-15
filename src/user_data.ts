import * as utils from "./utils"
import { Request, Response } from "./utils"

namespace user_data {
  export async function get_referral_id_by_username(request: Request, response: Response) {
    const { username } = request.params
    const key = "referral_id"
    try {
      const query = await utils.fetch.user_data("username", username, key)
      if (query.rowCount) {
        response.status(200).json(query.rows[0])
      }
      else {
        response.status(404).end(`username "${username}" was not found`)
      }
    }
    catch (error) {
      response.status(500).end()
      throw error
    }
  }

  export async function get_reward_balance_by_username(request: Request, response: Response) {
    const { username } = request.params
    const key = "reward_balance"
    try {
      const query = await utils.fetch.user_data("username", username, key)
      if (query.rowCount) {
        response.status(200).json(query.rows[0])
      }
      else {
        response.status(404).end(`username "${username}" was not found`)
      }
    }
    catch (error) {
      response.status(500).end()
      throw error
    }
  }
}

export default user_data
