
import app from "./src/int/int-app";



let port = 7000

app.get("/", (req, res) => {
    res.send("Get Start App")
})



export default app