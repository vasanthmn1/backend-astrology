
import app from "./src/int/int-app";


app.get("/", (req, res) => {
    res.send("Get Start App")
})



export default app