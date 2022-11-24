const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
const public = path.join(__dirname,"../public")

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use(express.static(public))

app.set("port", process.env.PORT || 3001 )
const port = app.get("port")

const indexRouter = require("./routes/index.routes")
app.use("/", indexRouter)

const server = app.listen(port,()=>{
    console.log("server listen in port :",port);
})

module.exports = server