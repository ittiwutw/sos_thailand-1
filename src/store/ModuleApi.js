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
    EditUser: '',
    GetListProvince: '',
    GetListDistrict: '',
    GetListSubDistrict: '',
    GetListService: '',
    CreateListService: '',
    ModalListService: false,
    EditListService: '',
    DeleteListService: ''
  },
  mutations: {
    SetModalListService (state) {
      state.ModalListService = !state.ModalListService
    },
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
    },
    SetGetListProvince (state, data) {
      state.GetListProvince = data
    },
    SetGetListDistrict (state, data) {
      state.GetListDistrict = data
    },
    SetGetListSubDistrict (state, data) {
      state.GetListSubDistrict = data
    },
    SetGetListService (state, data) {
      state.GetListService = data
    },
    SetCreateListService (state, data) {
      state.CreateListService = data
    },
    SetEditListService (state, data) {
      state.EditListService = data
    },
    SetDeleteListService (state, data) {
      state.DeleteListService = data
    }
  },
  actions: {
    async Login (context, val) {
      // // console.log('ข้อมูลที่ยิง api login', val)
      var res = await axios.post(`${process.env.VUE_APP_API}/login`, val)
      // // console.log('ข้อมูลหลังยิง api login', res)
      context.commit('SetDataLogin', res.data)
    },
    async GetUserOfficer (context, val) {
      // // console.log('ก่อนยิง api path =', `${process.env.VUE_APP_API}/getAllUserByCompanyName?adminCompanyName=${val}`)
      var res = await axios.get(`${process.env.VUE_APP_API}/getAllUserByCompanyName?adminCompanyName=${val}`)
      // // console.log('adminCompanyName', res)
      context.commit('SetDataUserOfficer', res.data)
    },
    async GetListService (context) {
      var data = {
        table: 'serviceType'
      }
      var res = await axios.post(`${process.env.VUE_APP_API}/getMasterByTable`, data)
      // // console.log('GetListService ==', res)
      context.commit('SetGetListService', res.data)
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
      var data = ''
      if (val.type === 'ALL') {
        data = {
          where: "WHERE (req.status = 'WAITING' OR req.status = 'PROCESSING')"
        }
      } else {
        data = {
          where: `WHERE (req.status = 'WAITING' OR req.status = 'PROCESSING') AND req.request${val.type} LIKE '%${val.area}%'`
        }
      }
      var res = await axios.post(`${process.env.VUE_APP_API}/getAllSOSRequest`, data)
      context.commit('SetDataReport', res.data)
    },
    async GetHistory (context, val) {
      var data = ''
      if (val.type === 'ALL') {
        data = {
          where: "WHERE (req.status = 'FINISHED' OR req.status = 'CANCEL')"
        }
      } else {
        data = {
          where: `WHERE (req.status = 'FINISHED' OR req.status = 'CANCEL') AND req.request${val.type} LIKE '%${val.area}%'`
        }
      }
      var res = await axios.post(`${process.env.VUE_APP_API}/getAllSOSRequest`, data)
      context.commit('SetDataHistory', res.data)
    },
    async CreateUser (context, data) {
      console.log('ก่อนยิงสร้าง user api', data)
      var res = await axios.post(`${process.env.VUE_APP_API}/createUsers`, data)
      console.log('ข้อมูลหลังยิง', res)
      await context.commit('SetCreateUser', res.data)
    },
    async EditUser (context, data) {
      // // console.log('ก่อนยิง api Edit', data)
      var res = await axios.post(`${process.env.VUE_APP_API}/updateUser`, data)
      await context.commit('SetEditUser', res.data)
    },
    async GetListProvince (context) {
      var data = {
        table: 'provinces'
      }
      // // console.log('ก่อนยิง จังหวัด', data)
      var res = await axios.post(`${process.env.VUE_APP_API}/getMasterBytable`, data)
      // // console.log('หลังยิงจังหวัด', res)
      context.commit('SetGetListProvince', res.data)
    },
    async GetListDistrict (context, val) {
      var data = {
        table: `amphures WHERE province_id = ${val}`
      }
      var res = await axios.post(`${process.env.VUE_APP_API}/getMasterBytable`, data)
      context.commit('SetGetListDistrict', res.data)
    },
    async GetListSubDistrict (context, val) {
      var data = {
        table: `districts WHERE amphure_id = ${val}`
      }
      var res = await axios.post(`${process.env.VUE_APP_API}/getMasterBytable`, data)
      context.commit('SetGetListSubDistrict', res.data)
    },
    async CreateListService (context, val) {
      var res = await axios.post(`${process.env.VUE_APP_API}/addServiceType`, val)
      context.commit('SetCreateListService', res.data)
    },
    async EditListService (context, val) {
      var res = await axios.post(`${process.env.VUE_APP_API}/editServiceType`, val)
      context.commit('SetEditListService', res.data)
    },
    async DeleteListService (context, val) {
      // console.log('ก่อนยิง api delete', val)
      var res = await axios.post(`${process.env.VUE_APP_API}/deleteMaster`, val)
      console.log('delete ===', res)
      context.commit('SetDeleteListService', res.data)
    }
  }
}
export default ModuleApi
