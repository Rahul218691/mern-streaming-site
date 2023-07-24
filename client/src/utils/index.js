import CryptoJS from 'crypto-js';

export const randomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000)
}

export const dateFormat = (date) => {
    if (!date) return '-'
    const newDate = new Date(date)
    const formatted = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    }).format(newDate)
    return formatted
}

export const encryptData =(name,data)=> {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_CRYPTO_SECRET).toString();
    localStorage.setItem(name, encrypted);
}

export const decryptData = (name) => {
    const encrypted = localStorage.getItem(name);
    const decrypted = CryptoJS.AES.decrypt(encrypted, process.env.REACT_APP_CRYPTO_SECRET).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
}