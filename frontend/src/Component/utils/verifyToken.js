const axios = require("axios")

const verifyToken = () => {
    const token = localStorage.getItem("token")

    if (token) {
        axios.get(window.myApi + '/userData', {
            headers: { "x-access-token": token }
        })
            .then((response) => {
                console.log(response.data);
                return response.data
            })
            .catch((error) => {
                console.log(error);
            })
    } else {
        console.log("token not found");
    }
}

export default verifyToken 