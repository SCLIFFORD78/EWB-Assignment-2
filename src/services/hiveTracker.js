
import axios from "axios";
import {user} from "../stores";

export class HiveTracker {
  hiveList = [];
  baseUrl = "";

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    if (localStorage.hive) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.hive);
    }
  }

  async login(email, password) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email, password});
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      if (response.data.success) {
        user.set({
          email: email,
          token: response.data.token
        });
        localStorage.hive = JSON.stringify(response.data.token);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async logout() {
    user.set({
      email: "",
      token: ""
    });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.hive = null;
  }

  async signup(firstName, lastName, email, password) {
    try {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      const response = await axios.post(this.baseUrl + "/api/users", userDetails);
      const newUser = await response.data;
      user.set(newUser);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + "/api/users");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    try {
      const response = await axios.post(this.baseUrl + "/api/users", newUser);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllUsers() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/users");
      return response.data;
    } catch (e) {
      return e;
    }
  }

  async deleteOneUser(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getHives() {
    try {
      const response = await axios.get(this.baseUrl + "/api/hives");
      this.hiveList = response.data;
      return this.hiveList;
    } catch (error) {
      return [];
    }
  }

  async getHive(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/hives/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createHive(newHive) {
    try {
      const response = await axios.post(this.baseUrl + "/api/hives", newHive);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllHives() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/hives");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneHive(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/hives/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async addHiveComment(id) {
    try {
      const response = await axios.post(this.baseUrl + "/api/hives/addComment/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteHiveComment(hive_id, comment_id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/hives/deleteComment/" + hive_id + "/" + comment_id);
      return response.data;
    } catch (e) {
      return null;
    }
  }


  async authenticate(user) {
    try {
      const response = await axios.post(this.baseUrl + "/api/users/authenticate", user);
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async clearAuth(user) {
    axios.defaults.headers.common["Authorization"] = "";
  }
}

module.exports = HiveTracker;
