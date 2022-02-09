import { getItem } from "../helpers/localstorage";



const BASEURL = "http://localhost:3001/grizzlyphp/api/";


export class AuthService {
    static async createUser(user) {
        const url = BASEURL + "create_user.php";
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(user)
        });
        return response;
    }
    static async loginUser(user) {
        const url = BASEURL + "login.php";
        const response = await fetch(url, {
            method: "POST", 
            body: JSON.stringify(user)
        });
        return response;
    }
    static async getUserInfo(user_id){
        const url = BASEURL + "get_user.php";
        const response = await fetch(url,{
            method: "POST", 
            body: JSON.stringify(user_id)
        });
        return response.json();
    }
    static async validateToken(){
        const url = BASEURL + "validate_token.php";
        const response = await fetch(url,{
            method: "POST", 
            body: JSON.stringify({
                jwt: getItem("PHPTOKEN")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response;
    }
};

