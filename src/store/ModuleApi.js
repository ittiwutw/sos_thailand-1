const axios = require('axios')
const ModuleApi = {
  state: {
    DataLogin: '',
    DataUserOfficer: '',
    DataUserService: '',
    Modal: false,
    DataReport: '',
    DataHistory: '',
    CreateUser: '',
    EditUser: ''
  },
  mutations: {
    SetDataLogin (state, data) {
      state.DataLogin = data
    },
    SetDataUserOfficer (state, data) {
      state.DataUserOfficer = data
    },
    SetDataUserService (state, data) {
      state.DataUserService = data
    },
    SetModal (state) {
      state.Modal = !state.Modal
    },
    SetDataReport (state, data) {
      state.DataReport = data
    },
    SetDataHistory (state, data) {
      state.DataHistory = data
    },
    SetCreateUser (state, data) {
      state.CreateUser = data
    },
    SetEditUser (state, data) {
      state.EditUser = data
    }
  },
  actions: {
    async Login (context, val) {
      var res = await axios.post(`${process.env.VUE_APP_API}login`, val)
      context.commit('SetDataLogin', res.data)
    },
    async GetUserOfficer (context) {
      var res = await axios.get(`${process.env.VUE_APP_API}/getAllUserByUserType?userType=OFFICER`)
      context.commit('SetDataUserOfficer', res.data)
    },
    async GetUserService (context) {
      var res = await axios.get(`${process.env.VUE_APP_API}/getAllUserByUserType?userType=SERVICE`)
      context.commit('SetDataUserService', res.data)
    },
    async GetReport (context) {
      var data = {
        where: ''
      }
      var res = await axios.post(`${process.env.VUE_APP_API}getAllSOSRequest`, data)
      context.commit('SetDataReport', res.data)
    },
    async GetHistory (context) {
      var data = {
        where: "WHERE req.status = 'FINISHED'"
      }
      var res = await axios.post(`${process.env.VUE_APP_API}getAllSOSRequest`, data)
      context.commit('SetDataHistory', res.data)
    },
    async CreateUser (context, data) {
      var res = await axios.post(`${process.env.VUE_APP_API}createUsers`, data)
      await context.commit('SetCreateUser', res.data)
    },
    async EditUser (context, data) {
      var res = await axios.post(`${process.env.VUE_APP_API}updateUser`, data)
      await context.commit('SetEditUser', res.data)
    }
  }
}
export default ModuleApi
