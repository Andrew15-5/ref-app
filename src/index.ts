import express from "express"

import user_data from "./user_data"
import * as utils from "./utils"

utils.make_sure_all_env_vars_are_set()

const app = express()
const SERVER_PORT = process.env.SERVER_PORT as string

app.use(express.urlencoded({ extended: true }))

app.get("/user-referral-id/:username", user_data.get_referral_id_by_username)

app.get("/user-reward-balance/:username", user_data.get_reward_balance_by_username)

app.listen(SERVER_PORT, () => {
  console.log(`Server started on port ${SERVER_PORT}`)
})
