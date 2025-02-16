
import app from "./src/int/int-app";
import PublicRouter from "./src/router/PublicRouter";
import UserRouter from "./src/router/UserRouter";
import CommonRouter from "./src/router/CommonRouter";
import { AuthMiddleWare } from "./src/middleware/AuthMiddleWare";
import AccountRouter from "./src/router/AccountRouter";
import AdminRouter from "./src/router/AdminRouter";



let authMiddleWare = new AuthMiddleWare()

//completed

app.use('/user', UserRouter)
app.use('/cm', CommonRouter)
app.use('/acc', AccountRouter)
app.use('/admin', AdminRouter)


app.use("/pb", PublicRouter) //authMiddleWare.publicAccessMiddleware,

app.get("/", (req, res) => {
    res.send("Server is running!");
});

export default app