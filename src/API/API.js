import axios from "axios";

export default axios.create({
  baseURL: "https://elben85-task-manager-backend.herokuapp.com/api"
});
