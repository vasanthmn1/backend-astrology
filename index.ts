
import app from "./src/int/int-app";
import PublicRouter from "./src/router/public/PublicRouter";
import UserRouter from "./src/router/user/UserRouter";
import CommonRouter from "./src/router/common/CommonRouter";
import { AuthMiddleWare } from "./src/middleware/AuthMiddleWare";

app.get("/", (req, res) => {
    res.send("Get Start App")
})
let authMiddleWare = new AuthMiddleWare()

//completed
app.use('/user', UserRouter)
app.use('/cm', CommonRouter)

app.use("/pb", authMiddleWare.publicAccessMiddleware, PublicRouter)


export default app