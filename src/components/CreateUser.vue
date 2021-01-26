<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col :xs="24" :md="20">
        <a-card>
          {{Header}}
        </a-card>
      </a-col>
      <a-col :xs="24" :md="20">
        <a-card>
          <a-row type="flex" class="mb-5">
            <a-col :md="4" :xs="8">
              <span>อีเมล์ : </span>
            </a-col>
            <a-col  :md='14' :xs="16">
              <a-input v-model="email" placeholder="" />
            </a-col>
          </a-row>
          <a-row type="flex" class="mb-5" v-if="Header === 'สร้างผู้ใช้งาน'">
            <a-col :md="4" :xs="8">
              <span>รหัสผ่าน : </span>
            </a-col>
            <a-col  :md='14' :xs="16">
              <a-input v-model="password" placeholder="" />
            </a-col>
          </a-row>
          <a-row type="flex" class="mb-5">
            <a-col :md="4" :xs="8">
              <span>ชื่อผู้ใช้งาน : </span>
            </a-col>
            <a-col  :md='14' :xs="16">
              <a-input v-model="name" placeholder="" />
            </a-col>
          </a-row>
          <a-row type="flex" class="mb-5">
            <a-col :md="4" :xs="8">
              <span>โทรศัพท์ : </span>
            </a-col>
            <a-col :md='14' :xs="16">
              <a-input v-model="tel" placeholder="" />
            </a-col>
          </a-row>
          <a-row type="flex" class="mb-5">
            <a-col :md="4" :xs="8">
              <span>สถานที่ปฏิบัติงาน : </span>
            </a-col>
            <a-col :md='14' :xs="16">
              <a-input v-model="location" placeholder="" />
            </a-col>
          </a-row>
          <a-row type="flex" class="mb-5">
            <a-col :md="4" :xs="8">
              <span>รับผิดชอบตาม : </span>
            </a-col>
            <a-col :md='14' :xs="16">
              <a-select :default-value="SelectArea" style="width: 100%" @change="handleChange">
                <a-select-option v-for="item in Listarea" :key="item.key" :value="item.key">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-col>
          </a-row>
          <a-row type="flex" class="mb-5">
            <a-col :md="4" :xs="8">
              <span>เขตพื้นที่รับผิดชอบ : </span>
            </a-col>
            <a-col :md='14' :xs="16">
              <a-row type="flex" :gutter="[16,0]">
                <a-col :span='12'><addressinput-subdistrict label="" placeholder="ตำบล/เเขวง"  v-model="subdistrict" /></a-col>
                <a-col :span='12'><addressinput-district label="" placeholder="อำเภอ/เขต"  v-model="district" /></a-col>
                <a-col :span='12' class="mt-5"><addressinput-province label="" placeholder="จังหวัด"  v-model="province" /></a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row type="flex" class="mb-5">
            <a-col :md="4" :xs="8">
              <span>โลโก้หน่วยงาน : </span>
            </a-col>
            <a-col :md='4' :xs="16">
                <a-card>
                  <a-row type="flex" justify="center">
                    <v-avatar size="120">
                    <img src="@/assets/addimg.jpg" />
                    </v-avatar>
                  </a-row>
              </a-card>
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
              <a-row type="flex" justify="space-between">
                <a-button type="danger">ยกเลิก</a-button>
                <a-button type="primary" @click="Check">ยืนยัน</a-button>
              </a-row>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { Decode, Encode } from '@/services'
export default {
  props: ['Header'],
  data () {
    return {
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
      StateCreate: this.$router.currentRoute.query.State
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
    handleChange (value) {
      this.SelectArea = value
    },
    Check () {
      if (this.Header === 'สร้างผู้ใช้งาน') {
        this.CreateUser()
      } else {
        this.EditUser()
      }
    },
    async CreateUser () {
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
        logoImg: '',
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
      user.adminAreaType = adminAreaType
      user.adminResponsibilityArea = CheckArea
      user.email = this.email
      user.name = this.name
      user.tel = this.tel
      console.log('ก่อนยิง api edit', user)
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
