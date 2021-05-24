import axios from "axios";
//API
const instance= axios.create({
    baseURL: 'http://localhost:5001/clone-9db4b/us-central1/api'  //the API(cloud function) URL

});

export default instance;
