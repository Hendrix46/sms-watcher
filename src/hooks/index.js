import axios from "axios";

export const checkTemplate = (text) => {
    axios.post(`https://kennedy-oval-luxembourg-wax.trycloudflare.com/api/v1/templates/check`, {
        text
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error
    })
}