import "dotenv/config"
import express from "express"

import user_data from "./user_data"
import referral_data from "./referral_data"
import utils from "./utils"

process.on("SIGINT", utils.SIG_handler)
process.on("SIGTERM", utils.SIG_handler)

utils.make_sure_all_env_vars_are_set()

const app = express()
const SERVER_PORT = process.env.SERVER_PORT as string

app.use(express.urlencoded({ extended: true }))

app.post("/process-purchase", referral_data.process_purchase)

app.get("/user-referral-id/:username", user_data.get_referral_id_by_username)

app.get("/user-reward-balance/:username", user_data.get_reward_balance_by_username)

app.get("/user-referral-info/:username", user_data.get_referral_info)

app.listen(SERVER_PORT, () => {
  console.log(`Server started on port ${SERVER_PORT}`)
})
