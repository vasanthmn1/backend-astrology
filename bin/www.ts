import app from "../index";
import _config from "../src/config/config";


let port = _config.port


app.listen(port, () => {
    console.log("Listion Port", port);
})