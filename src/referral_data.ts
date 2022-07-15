import * as utils from "./utils"
import { QueryResult, Request, Response } from "./utils"

namespace referral_data {
  export async function set_link_owner_uuid_by_referral_id(request: Request, response: Response) {
    const { purchase_uuid, referral_id } = request.body
    let query: QueryResult<any>

    if (typeof purchase_uuid !== "string" ||
      typeof referral_id !== "string") {
      return response.status(400).send("purchase_uuid and referral_id is needed")
    }

    try {
      query = await utils.fetch.user_data("referral_id", referral_id, "uuid")
      if (query.rowCount === 0) {
        response.status(404).end(`referral_id "${referral_id}" was not found`)
      }
      const link_owner_user_uuid = query.rows[0].uuid

      query = await utils.fetch.purchase_data("uuid", purchase_uuid, "user_uuid")
      const user_uuid = query.rows[0].user_uuid

      if (link_owner_user_uuid === user_uuid) {
        return response.status(400).send(
          "user_uuid can't be equal to link_owner_user_uuid, " +
          "because user can't earn points from his own referral link")
      }

      await utils.update.purchase_data(
        "uuid", purchase_uuid, "link_owner_user_uuid", link_owner_user_uuid)
    }
    catch (error) {
      response.status(500).end()
      throw error
    }
    response.status(200).end()
  }

  export async function calculate_and_accrue_points(request: Request, response: Response) {
    const { purchase_uuid } = request.body
    let query: QueryResult<any>

    if (typeof purchase_uuid !== "string") {
      return response.status(400).send("purchase_uuid is needed")
    }

    try {
      query = await utils.fetch.purchase_data("uuid", purchase_uuid, "product_uuid")
      const product_uuid = query.rows[0].product_uuid

      query = await utils.fetch.product_data("uuid", product_uuid, "price")
      const product_price = query.rows[0].price

      const percent = 0.1
      const points = Math.round(product_price * percent * 100) / 100

      await utils.update.purchase_data("uuid", purchase_uuid, "earned_points", points)
    }
    catch (error) {
      response.status(500).end()
      throw error
    }

    response.status(200).end()
  }
}

export default referral_data
