import express from "express"

import user_data from "./user_data"
import referral_data from "./referral_data"
import * as utils from "./utils"

utils.make_sure_all_env_vars_are_set()

const app = express()
const SERVER_PORT = process.env.SERVER_PORT as string

app.use(express.urlencoded({ extended: true }))

app.post("/calculate-and-accrue-points", referral_data.calculate_and_accrue_points)

app.post("/link-owner-user-uuid", referral_data.set_link_owner_uuid_by_referral_id)

app.get("/user-referral-id/:username", user_data.get_referral_id_by_username)

app.get("/user-reward-balance/:username", user_data.get_reward_balance_by_username)

app.listen(SERVER_PORT, () => {
  console.log(`Server started on port ${SERVER_PORT}`)
})