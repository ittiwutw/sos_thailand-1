const axios = require('axios')
const ModuleApi = {
  state: {
    DataLogin: '',
    DataUserOfficer: '',
    DataUserService: '',
    DataUserAdmin: '',
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
    SetDataUserAdmin (state, data) {
      state.DataUserAdmin = data
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
    async GetUserAdmin (context) {
      var res = await axios.get(`${process.env.VUE_APP_API}/getAllUserByUserType?userType=ADMIN`)
      context.commit('SetDataUserAdmin', res.data)
    },
    async GetUserService (context) {
      var res = await axios.get(`${process.env.VUE_APP_API}/getAllUserByUserType?userType=SERVICE`)
      context.commit('SetDataUserService', res.data)
    },
    async GetReport (context, val) {
      var data = {
        where: `WHERE req.status = 'WAITING' AND req.requestProvince LIKE '%${val}%'`
      }
      var res = await axios.post(`${process.env.VUE_APP_API}getAllSOSRequest`, data)
      context.commit('SetDataReport', res.data)
    },
    async GetHistory (context, val) {
      var data = {
        where: `WHERE req.status = 'FINISHED' AND req.requestProvince LIKE '%${val}%'`
      }
      var res = await axios.post(`${process.env.VUE_APP_API}getAllSOSRequest`, data)
      context.commit('SetDataHistory', res.data)
    },
    async CreateUser (context, data) {
      console.log('ก่อนยิง api')
      var res = await axios.post(`${process.env.VUE_APP_API}createUsers`, data)
      console.log('หลังยิง')
      await context.commit('SetCreateUser', res.data)
    },
    async EditUser (context, data) {
      var res = await axios.post(`${process.env.VUE_APP_API}updateUser`, data)
      await context.commit('SetEditUser', res.data)
    }
  }
}
export default ModuleApi
