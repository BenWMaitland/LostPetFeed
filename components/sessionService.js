import CryptoJS from "crypto-js";
import SecureStorage from "secure-web-storage";

var SECRET_KEY = "192837465qpwoeiruty";

var secureStorage = new SecureStorage(
    typeof window !== "undefined" && sessionStorage,
    {
        hash: function hash(key) {
            key = CryptoJS.SHA256(key, SECRET_KEY);

            return key.toString();
        },
        encrypt: function encrypt(data) {
            data = CryptoJS.AES.encrypt(data, SECRET_KEY);

            data = data.toString();

            return data;
        },
        decrypt: function decrypt(data) {
            data = CryptoJS.AES.decrypt(data, SECRET_KEY);

            data = data.toString(CryptoJS.enc.Utf8);

            return data;
        },
    }
);

class LocalStore {
    getToken = () => {
        if (typeof window !== "undefined") {
            const token = secureStorage.getItem("AuthToken") || "";
            return token;
        }
        return "";
    };
    setToken = (token) => {
        if (typeof window !== "undefined") {
            secureStorage.setItem("AuthToken", token);
        }
    };
    
    getUser = () => {
        if (typeof window !== "undefined") {
            const user = secureStorage.getItem("User") || "";
            return user;
        }
        return "";
    };
    setUser = (user) => {
        if (typeof window !== "undefined") {
            secureStorage.setItem("User", user);
        }
    };

    clear = () => {
        sessionStorage.clear();
    };
}

const LocalStoreClass = new LocalStore();
export default LocalStoreClass;
