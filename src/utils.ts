import { Request } from "express"
import { Response } from "express-serve-static-core/index"
import { Pool, QueryResult } from "pg"

export { QueryResult, Request, Response }

const pool = new Pool()

export function make_sure_all_env_vars_are_set() {
  const env_vars: string[] = [
    "SERVER_PORT"
  ]
  let error_occured = false
  for (const env_var of env_vars) {
    if (process.env[env_var] === undefined) {
      process.stderr.write(`Environment variable ${env_var} is not set\n`)
      error_occured = true
    }
  }
  if (error_occured) process.exit(1)
}

async function fetch_data(table: string, search_key: string, search_value: string, return_key: string) {
  const query_response = await pool.query(
    `SELECT ${return_key} FROM ${table} \
     WHERE ${search_key} = $1;`, [search_value])
  return query_response
}

export namespace fetch {
  export async function user_data(search_key: string, search_value: any, return_key: string) {
    return fetch_data("users", search_key, search_value, return_key)
  }

  export async function product_data(search_key: string, search_value: any, return_key: string) {
    return fetch_data("products", search_key, search_value, return_key)
  }

  export async function purchase_data(search_key: string, search_value: any, return_key: string) {
    return fetch_data("purchases", search_key, search_value, return_key)
  }
}

async function update_data(table: string,
  search_key: string, search_value: any,
  update_key: string, update_value: any) {
  const query_response = await pool.query(
    `UPDATE ${table} \
     SET ${update_key} = $1 \
     WHERE ${search_key} = $2;`, [update_value, search_value])
  return query_response
}

export namespace update {
  export async function user_data(
    search_key: string, search_value: any,
    update_key: string, update_value: any) {
    return update_data("users",
      search_key, search_value, update_key, update_value)
  }

  export async function purchase_data(
    search_key: string, search_value: any,
    update_key: string, update_value: any) {
    return update_data("purchases",
      search_key, search_value, update_key, update_value)
  }
}
