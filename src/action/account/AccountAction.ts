import { JwtTokenAction } from "../token/JwtTokenAction";
import { Login } from "./Login";
import { Register } from "./Register";
import { Validate } from "./Validate";

export class AccountAction {
    register = new Register(this)
    login = new Login(this)
    validate = new Validate(this)

    jwtTokenAction = new JwtTokenAction()
}