<template>
  <div>
    <v-form ref="FormCreate" :lazy-validation="lazy">
    <a-row type="flex" justify="center">
      <a-col :xs="24" :md="20">
        <a-card>
          {{Header}}
        </a-card>
      </a-col>
      <a-col :xs="24" :md="20">
        <a-card>
          <a-row type="flex">
            <a-col :md="4" :xs="8" class="mt-2">
              <span>อีเมล์ : </span>
            </a-col>
            <a-col  :md='14' :xs="16">
              <v-text-field outlined dense v-model="email" placeholder="อีเมล์" :rules="Rules.email"></v-text-field>
            </a-col>
          </a-row>
          <a-row type="flex" v-if="Header === 'สร้างผู้ใช้งาน'" >
            <a-col :md="4" :xs="8" class="mt-2">
              <span>รหัสผ่าน : </span>
            </a-col>
            <a-col  :md='14' :xs="16">
              <v-text-field outlined dense
              @click:append="show = !show"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              v-model="password"
              placeholder="รหัสผ่าน"
              :rules="Rules.password"></v-text-field>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :md="4" :xs="8" class="mt-2">
              <span>ชื่อผู้ใช้งาน : </span>
            </a-col>
            <a-col  :md='14' :xs="16">
              <v-text-field outlined dense v-model="name" placeholder="ชื่อผู้ใช้งาน" :rules="Rules.name"></v-text-field>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :md="4" :xs="8" class="mt-2">
              <span>โทรศัพท์ : </span>
            </a-col>
            <a-col :md='14' :xs="16">
              <v-text-field outlined dense v-model="tel" placeholder="เบอร์โทรศัพท์" :rules="Rules.tel"></v-text-field>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :md="4" :xs="8" class="mt-2">
              <span>สถานที่ปฏิบัติงาน : </span>
            </a-col>
            <a-col :md='14' :xs="16">
              <v-text-field outlined dense v-model="location" placeholder="สถานที่ปฏิบัติงาน" :rules="Rules.location"></v-text-field>
            </a-col>
          </a-row>
          <a-row type="flex">
            <a-col :md="4" :xs="8" class="mt-2">
              <span>รับผิดชอบตาม : </span>
            </a-col>
            <a-col :md='14' :xs="16">
              <v-autocomplete outlined dense :items="Listarea" v-model="SelectArea" item-text="name" item-value="name" placeholder="พื้นที่รับผิดชอบตาม" :rules="Rules.location"></v-autocomplete>
            </a-col>
          </a-row>
          <a-row type="flex" class="mb-5">
            <a-col :md="4" :xs="8" class="mt-2">
              <span>เขตพื้นที่รับผิดชอบ : </span>
            </a-col>
            <a-col :md='14' :xs="16">
              <a-row type="flex" :gutter="[16,0]">
                <a-col :span='24'><addressinput-subdistrict label="" placeholder="ตำบล/เเขวง"  v-model="subdistrict" /></a-col>
                <a-col :span='24' class="mt-5"><addressinput-district label="" placeholder="อำเภอ/เขต"  v-model="district" /></a-col>
                <a-col :span='24' class="mt-5"><addressinput-province label="" placeholder="จังหวัด"  v-model="province" /></a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row type="flex" class="mb-5">
            <a-col :md="4" :xs="8" >
              <span>โลโก้หน่วยงาน : </span>
            </a-col>
            <a-col :md='4' :xs="16" @click="onPickFile()">
              <a-row type="flex" justify="center" align="middle">
                <v-file-input
                  v-model="DataImage"
                  @change="UploadImage()"
                  id="file_input"
                  style="display:none"></v-file-input>
                  <a-card class="ml-15" v-if="Imageurl === ''">
                    <v-img max-width="150" src='@/assets/addimg.jpg'></v-img>
                  </a-card>
                  <a-card class="ml-15" v-else>
                    <v-img max-width="150" :src="Imageurl"></v-img>
                  </a-card>
              </a-row>
            </a-col>
          </a-row>
          <!-- <a-row type="flex" class="mb-5">
            <a-col :md="4" :xs="8">
              <span>สถานะการใช้งาน : </span>
            </a-col>
            <a-col :span='16'>
              <a-radio-group v-model="value">
                <a-radio :value="1">
                  ใช่งาน
                </a-radio>
                <a-radio :value="2">
                  ยังไม่ใช้งาน
                </a-radio>
              </a-radio-group>
            </a-col>
          </a-row> -->
          <a-row type="flex" class="mb-5">
            <a-col :md="18" :xs="24">
              <a-row type="flex" justify="end">
                <!-- <a-button type="danger">ยกเลิก</a-button> -->
                <a-button type="primary" v-if="clickConfirm===true" disabled>ยืนยัน</a-button>
                <a-button type="primary" @click="Check" v-else>ยืนยัน</a-button>
              </a-row>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    </v-form>
  </div>
</template>
<script>
import { Decode, Encode } from '@/services'
export default {
  props: ['Header'],
  data () {
    return {
      show: false,
      lazy: false,
      DataImage: [],
      ImageBase64: '',
      clickConfirm: false,
      Imageurl: '',
      SelectArea: '',
      Listarea: [
        { name: 'เเขวง', key: '1' },
        { name: 'เขต', key: '2' },
        { name: 'จังหวัด', key: '3' }
      ],
      name: '',
      email: '',
      password: '',
      job: '',
      area: '',
      tel: '',
      subdistrict: '',
      district: '',
      province: '',
      location: '',
      StateCreate: this.$router.currentRoute.query.State,
      Rules: {
        name: [(v) => !!v || 'กรุณาระบุชื่อผู้ใช้งาน'],
        location: [(v) => !!v || 'กรุณาระบุสถานที่ปฏิบัติงาน'],
        email: [
          (v) => !!v || 'กรุณากรอกข้อมูล',
          (v) => /.+@.+\..+/.test(v) || 'รูปแบบของ email ไม่ถูกต้อง'
        ],
        password: [
          (v) => !!v || 'กรุณากรอกข้อมูล',
          (v) => (v.length >= 8) || 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'
        ],
        tel: [
          (v) => !!v || 'กรุณากรอกข้อมูล',
          (v) => /^([0-9])+$/.test(v) || 'กรุณาระบุตัวเลข',
          (v) => (v.length >= 9) || 'รหัสผ่านต้องมีอย่างน้อย 9 ตัวอักษร'
        ]
      }
    }
  },
  created () {
    if (this.Header === 'เเก้ไขผู้ใช้งาน') {
      var user = JSON.parse(Decode.decode(localStorage.getItem('user')))
      if (user.adminAreaType === 'SUBDISTRICT') {
        this.SelectArea = 'เเขวง'
        this.subdistrict = user.adminResponsibilityArea
      } else if (user.adminAreaType === 'DISTRICT') {
        this.SelectArea = 'เขต'
        this.district = user.adminResponsibilityArea
      } else {
        this.SelectArea = 'จังหวัด'
        this.province = user.adminResponsibilityArea
      }
      console.log('User', user)
      this.email = user.email
      this.name = user.name
      this.password = user.password
      this.job = user.job
      this.location = user.adminCompanyName
      this.subdistrict = user.adminSubDistrict
      this.district = user.adminDistrict
      this.province = user.adminProvince
      if (user.logoImg !== '' || user.logoImg !== null) {
        this.Imageurl = user.logoImg
      }
      // this.area = user.area
      this.tel = user.tel
    } else {
      this.email = ''
      this.password = ''
      this.job = ''
      this.area = ''
      this.tel = ''
    }
  },
  methods: {
    onPickFile () {
      document.getElementById('file_input').click()
    },
    UploadImage () {
      const element = this.DataImage
      const reader = new FileReader()
      reader.readAsDataURL(element)
      reader.onload = () => {
        var resultReader = reader.result
        var url = URL.createObjectURL(element)
        this.ImageBase64 = resultReader
        this.Imageurl = url
      }
    },
    Check () {
      if (this.$refs.FormCreate.validate(true)) {
        if (this.Header === 'สร้างผู้ใช้งาน') {
          this.clickConfirm = true
          this.CreateUser()
        } else {
          this.clickConfirm = true
          this.EditUser()
        }
      }
    },
    async CreateUser () {
      console.log('fileList', this.fileList)
      var adminAreaType = ''
      var CheckArea = ''
      if (this.SelectArea === '1') {
        adminAreaType = 'SUBDISTRICT'
        CheckArea = this.subdistrict
      } else if (this.SelectArea === '2') {
        adminAreaType = 'DISTRICT'
        CheckArea = this.district
      } else {
        adminAreaType = 'PROVINCE'
        CheckArea = this.province
      }
      var data = {
        email: this.email,
        password: this.password,
        name: this.name,
        tel: this.tel,
        adminAreaType: adminAreaType,
        adminResponsibilityArea: CheckArea,
        logoImg: this.ImageBase64,
        userType: this.StateCreate,
        adminProvince: this.province,
        adminDistrict: this.district,
        adminSubDistrict: this.subdistrict,
        adminCompanyName: this.location
      }
      console.log('data', data)
      await this.$store.dispatch('CreateUser', data)
      var res = this.$store.state.ModuleApi.CreateUser
      console.log('ข้อมูลหลังสร้าง user', res)
      if (res.response_code === 'SUCCESS') {
        this.$swal({
          icon: 'success',
          text: res.response_description,
          showConfirmButton: false,
          timer: 2000
        })
        this.ResetForm()
        if (this.StateCreate === 'ADMIN') {
          this.$router.push({ path: '/ManageAdmin' })
        } else if (this.StateCreate === 'SERVICE') {
          this.$router.push({ path: '/ManageService' })
        } else if (this.StateCreate === 'OFFICER') {
          this.$router.push({ path: '/' })
        }
      } else {
        this.$swal({
          icon: 'error',
          text: res.response_description,
          showConfirmButton: false,
          timer: 2000
        })
      }
    },
    async EditUser () {
      var user = JSON.parse(Decode.decode(localStorage.getItem('user')))
      var adminAreaType = ''
      var CheckArea = ''
      if (this.SelectArea === '1') {
        adminAreaType = 'SUBDISTRICT'
        CheckArea = this.subdistrict
      } else if (this.SelectArea === '2') {
        adminAreaType = 'DISTRICT'
        CheckArea = this.district
      } else {
        adminAreaType = 'PROVINCE'
        CheckArea = this.province
      }
      if (user.userType === 'ADMIN') {
        user.adminProvince = this.province
        user.adminDistrict = this.district
        user.adminSubDistrict = this.subdistrict
      } else {
        user.serviceProvince = this.province
        user.serviceDistrict = this.district
        user.serviceSubDistrict = this.subdistrict
      }
      user.adminAreaType = adminAreaType
      user.adminResponsibilityArea = CheckArea
      user.email = this.email
      user.name = this.name
      user.tel = this.tel
      user.adminCompanyName = this.location
      if (this.ImageBase64 !== '') {
        user.logoImg = this.ImageBase64
      }
      await this.$store.dispatch('EditUser', user)
      var res = this.$store.state.ModuleApi.EditUser
      console.log('res หลังยิง', res)
      if (res.response_code === '0000') {
        this.$swal({
          icon: 'success',
          text: 'เเก้ไขข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 2000
        })
        localStorage.removeItem('user')
        localStorage.setItem('user', Encode.encode(res.data))
        window.location.reload()
      } else {
        this.$swal({
          icon: 'error',
          text: res.response_description,
          showConfirmButton: false,
          timer: 2000
        })
      }
    },
    ResetForm () {
      this.name = ''
      this.email = ''
      this.password = ''
      this.job = ''
      this.area = ''
      this.tel = ''
      this.subdistrict = ''
      this.district = ''
      this.province = ''
      this.SelectArea = ''
    }
  }
}
</script>
