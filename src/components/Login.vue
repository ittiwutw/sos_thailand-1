<template>
  <v-container grid-list-xs>
    <a-row type="flex" justify="center" align="middle" style="height:96vh">
      <a-col :span='10'>
        <a-card>
          <a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit">
          <a-row type="flex" justify="center">
            <a-col :span="24">
              <img width="100%" src="@/assets/logo_sos.png" />
            </a-col>
            <a-col :span="20">
              <a-row type="flex" class="margin_pic">
                <a-col :span='6' class="margin_text"><span>ชื่อผู้ใช้งาน : </span></a-col>
                <a-col :span='18'>
                  <a-form-item>
                    <a-input v-decorator="['username', { rules: [{ required: true, message: 'กรุณากรอกชื่อผู้ใช้งาน' }] }]" placeholder="ชื่อผู้ใช้งาน">
                      <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                    </a-input>
                  </a-form-item>
                </a-col>
                <a-col :span='6' class="margin_text"><span>รหัสผ่าน : </span></a-col>
                <a-col :span='18' class="margin_input">
                  <a-form-item>
                    <a-input-password v-decorator="['password', { rules: [{ required: true, message: 'กรุณากรอกรหัสผ่าน' }] }]" placeholder="รหัสผ่าน">
                      <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                    </a-input-password>
                  </a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-row type="flex" justify="end">
                    <a-button type="primary" html-type="submit" class="login-form-button">เข้าสู่ระบบ</a-button>
                  </a-row>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </v-container>
</template>
<script>
import { Encode } from '@/services'
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },

  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.Login(values)
        }
      })
    },
    async Login (val) {
      var data = {
        email: val.username,
        password: val.password
      }
      await this.$store.dispatch('Login', data)
      var ResultLogin = await this.$store.state.ModuleApi.DataLogin
      // console.log('ResultLogin', ResultLogin)
      if (ResultLogin.response_description === 'SUCCESS') {
        var user = ResultLogin.data
        localStorage.setItem('user', Encode.encode(user))
        this.$swal({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
          showConfirmButton: false,
          timer: 2000
        })
        this.$router.push({ path: '/' }).catch(() => {})
      } else {
        this.$swal({
          icon: 'error',
          title: 'username password ผิด',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  }
}
</script>
<style scoped>
.margin_pic {
  margin-top: 20px;
}
.margin_text {
  margin-top: 8px;
  /* float: right; */
  /* margin-top: 120px;
  padding-top: 100px; */
}
.margin_input {
  margin-bottom: 15px;
}

</style>
