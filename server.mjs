import Koa from "koa"
import _ from "koa-route"
import serve from "koa-static"
import mount from "koa-mount"

import {readdir, readdirCsv} from "./fileManager"

const app = new Koa()

console.log(serve("web/"))

/*
app.use(_.get("/json", async(ctx) => {
  let list = readdir(".")
  ctx.body = list
}))
*/
app.use(_.get("/json/:path*", async(ctx, path) => {
  let list = path ? readdir(path) : readdir(".")
  ctx.body = list
}))

app.use(_.get("/csv/:path*", async(ctx, path) => {
  let csvStr = path ? readdirCsv(path) : readdirCsv(".")
  ctx.body = await csvStr
}))

app.use(mount("/ui", serve("web")))
app.use(_.get("/bbb", async ctx => ctx.body = "bbbb"))
app.use(mount("/", serve("node_modules")))

app.listen(8080)
