import axios from 'axios'
import {API_HOST_NAME} from '../../Constants'

export const SESSION_ATTR_USERNAME = "authenticatedUser"

class AuthenticationService {

    // authenticateUser(username, password) {
    //     return axios.get(`${API_HOST_NAME}/basicauth`, 
    //         {headers: {authorization: this.createBasicAuthToken(username, password)}})
    // }

    // registerSuccessfulLogin(username, password) { 
    //     sessionStorage.setItem(SESSION_ATTR_USERNAME, username);
    //     this.setupAxiosInteceptor(this.createBasicAuthToken(username, password))
    // }

    // createBasicAuthToken(username, password) {
    //     return 'Basic ' + window.btoa(username + ":" + password)
    // }

    authenticateUser(username, password) {
        return axios.post(`${API_HOST_NAME}/authenticate`, {
            username,
            password
        })
    }
    
    registerSuccessfulLogin(username, token) {
        // console.log('username: ' + username + '; token: ' + token)
        sessionStorage.setItem(SESSION_ATTR_USERNAME, username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }

    invalidateSession() {
        sessionStorage.removeItem(SESSION_ATTR_USERNAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(SESSION_ATTR_USERNAME)
        if (user === null) return false;
        return true;
    }

    getUsername() {
        let user = sessionStorage.getItem(SESSION_ATTR_USERNAME)
        console.log(user)
        if (user === null) return "T"
        return user
    }
    
    setupAxiosInterceptors(token) {
        console.log('setupAxiosInterceptors ' + token)

        const instance = axios.create({
            baseURL: 'http://localhost:8080',
            timeout: 10000,
            params: {} // do not remove this, its added to add params later in the config
        });

        instance.interceptors.request.use(function (config) {
                console.log('this.isUserLoggedIn() ' + config);
                if (this.isUserLoggedIn()) {
                    console.log('this.isUserLoggedIn ' )

                    config.headers.authorization = token
                }
                return config
            }
        )
    }
    
}

export default new AuthenticationService()