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
              <v-text-field outlined dense v-model="tel" maxlength="10" placeholder="เบอร์โทรศัพท์" :rules="Rules.tel"></v-text-field>
            </a-col>
          </a-row>
          <a-row type="flex" v-if="userType === 'SUPERADMIN'">
            <a-col :md="4" :xs="8" class="mt-2">
              <span>หน่วยงานปฎิบัติงาน : </span>
            </a-col>
            <a-col :md='14' :xs="16">
              <v-text-field outlined dense v-model="location" placeholder="หน่วยงานปฎิบัติงาน" :rules="Rules.location"></v-text-field>
            </a-col>
          </a-row>
          <a-row type="flex" v-else>
            <a-col :md="4" :xs="8" class="mt-2">
              <span>หน่วยงานปฎิบัติงาน : </span>
            </a-col>
            <a-col :md='14' :xs="16">
              <v-text-field outlined dense v-model="location" placeholder="หน่วยงานปฎิบัติงาน" :rules="Rules.location" disabled></v-text-field>
            </a-col>
          </a-row>
          <a-row type="flex" v-if="userType === 'SUPERADMIN'">
            <a-col :md="4" :xs="8" class="mt-2">
              <span>รับผิดชอบตาม : </span>
            </a-col>
            <a-col :md='14' :xs="16">
              <v-autocomplete outlined dense :items="Listarea" v-model="SelectArea" item-text="name" item-value="name" placeholder="พื้นที่รับผิดชอบตาม" :rules="Rules.location"></v-autocomplete>
            </a-col>
          </a-row>
          <a-row type="flex" v-else>
            <a-col :md="4" :xs="8" class="mt-2">
              <span>รับผิดชอบตาม : </span>
            </a-col>
            <a-col :md='14' :xs="16">
              <v-autocomplete outlined dense :items="Listarea" v-model="SelectArea" item-text="name" item-value="name" placeholder="พื้นที่รับผิดชอบตาม" disabled :rules="Rules.location"></v-autocomplete>
            </a-col>
          </a-row>
          <a-row type="flex" class="mb-0" v-if="userType === 'SUPERADMIN'">
            <a-col :md="4" :xs="8" class="mt-2" v-if="(SelectArea === 'เขต/อำเภอ' || SelectArea === 'เเขวง/ตำบล' || SelectArea === 'จังหวัด') ">
              <span>เขตพื้นที่รับผิดชอบ : </span>
            </a-col>
            <a-col :md='14' :xs="16">
              <a-row type="flex" :gutter="[16,0]">
                <a-col :span='24'>
                  <v-autocomplete v-if="(SelectArea === 'เขต/อำเภอ' || SelectArea === 'เเขวง/ตำบล' || SelectArea === 'จังหวัด') " outlined dense :items="ListProvince" v-model="province" item-text="name_th" item-value="name_th" placeholder="จังหวัด" :rules="Rules.province"></v-autocomplete>
                </a-col>
                <a-col :span='24'>
                  <v-autocomplete v-if="(SelectArea === 'เขต/อำเภอ' || SelectArea === 'เเขวง/ตำบล') " outlined dense :items="ListDistrict" v-model="district" item-text="name_th" item-value="name_th" placeholder="เขต/อำเภอ" :rules="Rules.district"></v-autocomplete>
                </a-col>
                <a-col :span='24'>
                  <v-autocomplete v-if="SelectArea === 'เเขวง/ตำบล'" outlined dense :items="ListSubDistrict" v-model="subdistrict" item-text="name_th" item-value="name_th" placeholder="เเขวง/ตำบล" :rules="Rules.subdistrict"></v-autocomplete>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row type="flex" class="mb-0" v-else>
            <!-- <a-col :md="4" :xs="8" class="mt-2">
              <span>เขตพื้นที่รับผิดชอบ : </span>
            </a-col>
            <a-col :md='14' :xs="16">
              <a-row type="flex" :gutter="[16,0]">
                <a-col :span='24'>
                  <v-text-field outlined dense  v-model="province" placeholder="จังหวัด" disabled></v-text-field>
                </a-col>
                <a-col :span='24'>
                  <v-text-field outlined dense v-model="district" item-value="name_th" placeholder="เขต/อำเภอ"  disabled></v-text-field>
                </a-col>
                <a-col :span='24'>
                  <v-text-field outlined dense v-model="subdistrict"  placeholder="เเขวง/ตำบล" disabled></v-text-field>
                </a-col>
              </a-row>
            </a-col> -->
          </a-row>
          <a-row type="flex" class="mb-5">
            <a-col :md="4" :xs="4" class="mt-5">
              <span>ลักษณะงาน : </span>
            </a-col>
            <a-col :md='20' :xs="20">
            <a-row type="flex" :gutter="[-10,-10]">
              <a-col :span="24" :md="6" class="pa-0" v-for="(item,index) in items" :key="index">
                <a-row type="flex" justify="start">
                  <v-checkbox v-model="selected" :label="item.name" :value="item.name"></v-checkbox>
                </a-row>
              </a-col>
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
                  accept=".png"
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
      selected: ['John'],
      items: [
        { name: 'จี้ปล้น' },
        { name: 'อุบัติเหตุ' },
        { name: 'คุกคามทางเพศ' },
        { name: 'toursim service' }
      ],
      userType: 'SUPERADMIN',
      show: false,
      lazy: false,
      DataImage: [],
      ImageBase64: '',
      clickConfirm: false,
      Imageurl: '',
      SelectArea: '',
      Listarea: [
        { name: 'เเขวง/ตำบล', key: '1' },
        { name: 'เขต/อำเภอ', key: '2' },
        { name: 'จังหวัด', key: '3' },
        { name: 'ระดับประเทศ', key: '4' }
      ],
      ListProvince: [],
      ListDistrict: [],
      ListSubDistrict: [],
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
        province: [(v) => !!v || 'กรุณาเลือกจังหวัด'],
        district: [(v) => !!v || 'กรุณาเลือก เขต/อำเภอ'],
        subdistrict: [(v) => !!v || 'กรุณาเลือก เเขวง/ตำบล'],
        location: [(v) => !!v || 'กรุณาระบุหน่วยงานที่ปฎิบัติงาน'],
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
          (v) => (v.length >= 10) || 'กรุณาระบุตัวเลข 10 ตัวอักษร'
          // (v) => (v.length >= 9) || 'รหัสผ่านต้องมีอย่างน้อย 9 ตัวอักษร'
        ]
      }
    }
  },
  watch: {
    SelectArea (val) {
      // console.log('val = ', val)
      this.subdistrict = ''
      this.district = ''
      this.province = ''
    },
    province (val) {
      if (this.ListProvince.length !== 0) {
        if (this.StateCreate !== 'OFFICER') {
          const result = this.ListProvince.filter((data) => {
            return data.name_th === val
          })
          this.GetDistrict(result[0].id)
        }
      }
    },
    district (val) {
      if (this.ListDistrict.length !== 0) {
        if (this.StateCreate !== 'OFFICER') {
          const result = this.ListDistrict.filter((data) => {
            return data.name_th === val
          })
          this.GetSubDistrict(result[0].id)
        }
      }
    }
  },
  created () {
    this.$EventBus.$emit('StatusHeader', this.Header)
    var user = JSON.parse(Decode.decode(localStorage.getItem('user')))
    this.userType = user.userType
    // console.log('User Tbnoung', user)
    if (this.Header === 'เเก้ไขผู้ใช้งาน') {
      if (user.adminAreaType === 'SUBDISTRICT') {
        this.SelectArea = 'เเขวง/ตำบล'
        this.subdistrict = user.adminResponsibilityArea
      } else if (user.adminAreaType === 'DISTRICT') {
        this.SelectArea = 'เขต/อำเภอ'
        this.district = user.adminResponsibilityArea
      } else if (user.adminAreaType === 'PROVINCE') {
        this.SelectArea = 'จังหวัด'
        this.province = user.adminResponsibilityArea
      } else if (user.adminAreaType === 'ALL') {
        this.SelectArea = 'ระดับประเทศ'
      }
      this.email = user.email
      this.name = user.name
      this.password = user.password
      this.job = user.job
      this.location = user.adminCompanyName
      this.subdistrict = user.adminSubDistrict
      this.district = user.adminDistrict
      this.province = user.adminProvince
      this.selected = user.serviceTypeList || []
      if (user.logoImg !== 'null') {
        this.Imageurl = user.logoImg
      }
      // console.log('Imageurl', this.Imageurl)
      // this.area = user.area
      this.tel = user.tel
      this.GetListProvince()
    } else {
      if (user.userType === 'ADMIN') {
        this.userType = user.userType
        this.email = ''
        this.password = ''
        this.job = ''
        this.area = ''
        this.tel = ''
        this.location = user.adminCompanyName
        this.subdistrict = user.adminSubDistrict
        this.district = user.adminDistrict
        this.province = user.adminProvince
        this.selected = user.serviceTypeList || []
        if (user.adminAreaType === 'SUBDISTRICT') {
          this.SelectArea = 'เเขวง/ตำบล'
          this.subdistrict = user.adminSubDistrict
        } else if (user.adminAreaType === 'DISTRICT') {
          this.SelectArea = 'เขต/อำเภอ'
          this.district = user.adminDistrict
        } else {
          this.SelectArea = 'จังหวัด'
          this.province = user.adminProvince
        }
      } else {
        // console.log('เข้า else', user)
        this.userType = user.userType
        this.email = ''
        this.password = ''
        this.job = ''
        this.area = ''
        this.tel = ''
        // this.location = user.adminCompanyName
        // if (user.adminAreaType === 'SUBDISTRICT') {
        //   this.SelectArea = 'เเขวง'
        //   this.subdistrict = user.adminSubDistrict
        // } else if (user.adminAreaType === 'DISTRICT') {
        //   this.SelectArea = 'เขต'
        //   this.district = user.adminDistrict
        // } else {
        //   this.SelectArea = 'จังหวัด'
        //   this.province = user.adminProvince
        // }
        this.GetListProvince()
      }
    }
  },
  methods: {
    async GetDistrict (val) {
      await this.$store.dispatch('GetListDistrict', val)
      this.ListDistrict = this.$store.state.ModuleApi.GetListDistrict.data
    },
    async GetSubDistrict (val) {
      await this.$store.dispatch('GetListSubDistrict', val)
      this.ListSubDistrict = this.$store.state.ModuleApi.GetListSubDistrict.data
    },
    async GetListProvince () {
      await this.$store.dispatch('GetListProvince')
      this.ListProvince = this.$store.state.ModuleApi.GetListProvince.data
    },
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
      var user = JSON.parse(Decode.decode(localStorage.getItem('user')))
      if (this.$refs.FormCreate.validate(true)) {
        if (this.Header === 'สร้างผู้ใช้งาน') {
          this.clickConfirm = true
          if (user.userType === 'SUPERADMIN') {
            this.CreateUser()
          } else {
            this.CreateOfficer()
          }
        } else {
          this.clickConfirm = true
          this.EditUser()
        }
      }
    },
    async CreateOfficer () {
      var user = JSON.parse(Decode.decode(localStorage.getItem('user')))
      var data = {
        email: this.email,
        password: this.password,
        name: this.name,
        tel: this.tel,
        activeFlag: 1,
        adminAreaType: user.adminAreaType,
        logoImg: this.ImageBase64,
        userType: this.StateCreate,
        adminProvince: user.adminProvince,
        adminDistrict: user.adminDistrict,
        adminSubDistrict: user.adminSubDistrict,
        adminCompanyName: user.adminCompanyName,
        serviceTypeList: this.selected
      }
      console.log('ก่อนยิง data', data)
      await this.$store.dispatch('CreateUser', data)
      var res = this.$store.state.ModuleApi.CreateUser
      if (res.response_code === 'SUCCESS') {
        this.$swal({
          icon: 'success',
          text: res.response_description,
          showConfirmButton: false,
          timer: 2000
        })
        this.ResetForm()
        if (this.StateCreate === 'ADMIN') {
          this.$router.push({ path: '/ManageAdmin' }).catch(() => {})
        } else if (this.StateCreate === 'SERVICE') {
          this.$router.push({ path: '/ManageService' }).catch(() => {})
        } else if (this.StateCreate === 'OFFICER') {
          this.$router.push({ path: '/' }).catch(() => {})
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
    async CreateUser () {
      var adminAreaType = ''
      var CheckArea = ''
      if (this.SelectArea === 'เเขวง/ตำบล') {
        adminAreaType = 'SUBDISTRICT'
        CheckArea = this.subdistrict
      } else if (this.SelectArea === 'เขต/อำเภอ') {
        adminAreaType = 'DISTRICT'
        CheckArea = this.district
      } else if (this.SelectArea === 'จังหวัด') {
        adminAreaType = 'PROVINCE'
        CheckArea = this.province
      } else if (this.SelectArea === 'ระดับประเทศ') {
        adminAreaType = 'ALL'
        CheckArea = ''
      }
      var data = {
        email: this.email,
        password: this.password,
        name: this.name,
        tel: this.tel,
        activeFlag: 1,
        adminAreaType: adminAreaType,
        adminResponsibilityArea: CheckArea,
        logoImg: this.ImageBase64,
        userType: this.StateCreate,
        adminProvince: this.province,
        adminDistrict: this.district,
        adminSubDistrict: this.subdistrict,
        adminCompanyName: this.location,
        serviceTypeList: this.selected
      }
      console.log('data ก่อนสร้าง user', data)
      await this.$store.dispatch('CreateUser', data)
      var res = this.$store.state.ModuleApi.CreateUser
      // console.log('ข้อมูลหลังสร้าง user', res)
      if (res.response_code === 'SUCCESS') {
        this.$swal({
          icon: 'success',
          text: res.response_description,
          showConfirmButton: false,
          timer: 2000
        })
        this.ResetForm()
        if (this.StateCreate === 'ADMIN') {
          this.$router.push({ path: '/ManageAdmin' }).catch(() => {})
        } else if (this.StateCreate === 'SERVICE') {
          this.$router.push({ path: '/ManageService' }).catch(() => {})
        } else if (this.StateCreate === 'OFFICER') {
          this.$router.push({ path: '/' }).catch(() => {})
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
      if (this.SelectArea === 'เเขวง/ตำบล') {
        adminAreaType = 'SUBDISTRICT'
        CheckArea = this.subdistrict
      } else if (this.SelectArea === 'เขต/อำเภอ') {
        adminAreaType = 'DISTRICT'
        CheckArea = this.district
      } else if (this.SelectArea === 'จังหวัด') {
        adminAreaType = 'PROVINCE'
        CheckArea = this.province
      } else if (this.SelectArea === 'ระดับประเทศ') {
        adminAreaType = 'ALL'
        CheckArea = ''
      }
      if (user.userType === 'SUPERADMIN') {
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
      user.serviceTypeList = this.selected
      console.log('user', user)
      await this.$store.dispatch('EditUser', user)
      var res = this.$store.state.ModuleApi.EditUser
      // // console.log('res หลังยิง', res)
      if (res.response_code === '0000') {
        this.$swal({
          icon: 'success',
          text: 'เเก้ไขข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 2000
        })
        localStorage.removeItem('user')
        localStorage.setItem('user', Encode.encode(res.data))
        // window.location.reload()
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
