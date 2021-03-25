<template>
  <div>
    <v-dialog v-model="Modal" width="45%" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2">รายละเอียดผู้ให้บริการ</v-card-title>
        <v-card-text>
          <a-row type="flex">
            <a-col :span='12'>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>ชื่อ :</span>
                <span>{{props.name}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>อาชีพ :</span>
                <span>{{props.job}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>หมายเลขโทรศัพท์ :</span>
                <span>{{props.tel}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>อีเมล์ :</span>
                <span>{{props.email}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>พื้นที่ให้บริการ :</span>
                <span>{{props.serviceSubDistrict}}</span>
                <!-- <span v-if="props.adminAreaType === 'PROVINCE'">{{props.adminProvince}}</span>
                <span v-else-if="props.adminAreaType === 'DISTRICT'">{{props.adminDistrict}}</span>
                <span v-else>{{props.adminSubDistrict}}</span> -->
              </a-row>
              <a-row type="flex" class="ma-5" justify="end">
                <span>{{props.serviceDistrict}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="end">
                <span>{{props.serviceProvince}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>คะเเนน :</span>
                <span>{{rating}}</span>
              </a-row>
            </a-col>
            <a-col :span='12'>
              <a-row type="flex" justify="center" class="mt-3">
              <span>รูปภาพโปรไฟล์</span>
              </a-row>
              <a-card class="mt-2" v-if="(props.logoImg !== null || props.logoImg !== '')">
                <v-img height="300px" :src="props.profileImgUrl" />
              </a-card>
              <a-card class="mt-2" v-else>
                <img width="100%" src="@/assets/logo_sos.png" />
              </a-card>
            </a-col>
            <a-col :span='8' class="mt-10">
              <a-row type="flex" justify="center">
              <span>รูปภาพบัตรประชาชน</span>
              </a-row>
              <a-card class="mt-2" v-if="(props.idCardImg !== null || props.idCardImg !== '')">
                <a-row type="flex" justify="center">
                <v-img height="150" width="150" :src="props.idCardImg" />
                </a-row>
              </a-card>
              <a-card class="mt-2" v-else>
                <img width="100%" src="@/assets/logo_sos.png" />
              </a-card>
            </a-col>
            <a-col :span='8' class="mt-10">
              <a-row type="flex" justify="center">
              <span>รูปภาพใบขับขี่</span>
              </a-row>
              <a-card class="mt-2" v-if="(props.driverLicenseImg !== null || props.driverLicenseImg !== '')">
                <a-row type="flex" justify="center">
                <v-img height="150" width="150" :src="props.driverLicenseImg" />
                </a-row>
              </a-card>
              <a-card class="mt-2" v-else>
                <img width="100%" src="@/assets/logo_sos.png" />
              </a-card>
            </a-col>
            <a-col :span='8' class="mt-10">
              <a-row type="flex" justify="center">
              <span>รูปภาพใบประกอบวิชาชีพ</span>
              </a-row>
              <a-card class="mt-2" v-if="(props.licenseImg !== null || props.licenseImg !== '')">
                <a-row type="flex" justify="center">
                <v-img height="150" width="150" :src="props.licenseImg" />
                </a-row>
              </a-card>
              <a-card class="mt-2" v-else>
                <img width="100%" src="@/assets/logo_sos.png" />
              </a-card>
            </a-col>
            <a-col :span="24" class="mt-5">
              <a-row type="flex" justify="end">
                <a-button type="primary" @click="CloseModal">ปิด</a-button>
              </a-row>
            </a-col>
          </a-row>
         </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ['props'],
  data () {
    return {
      route: '',
      rating: 0
    }
  },
  computed: {
    Modal () {
      return this.$store.state.ModuleApi.Modal
    }
  },
  watch: {
    props (val) {
      console.log('prop user', val)
      this.GetRating(val)
      if (this.$router.currentRoute.name === 'ManageService') {
        this.route = 'ManageService'
        this.props.adminDistrict = val.serviceDistrict
      }
    }
  },
  methods: {
    CloseModal () {
      this.$store.commit('SetModal')
    },
    async GetRating (val) {
      this.rating = 0
      var data = await this.axios.get(`${process.env.VUE_APP_API}/getRatingByUserId?userId=${val.userId}`)
      // var data = await this.axios.get(`${process.env.VUE_APP_API}/getRatingByUserId?userId=132`)
      for (let i = 0; i < data.data.data.length; i++) {
        this.rating += data.data.data[i].ratingPoint
      }
      if (data.data.rating !== null) {
        this.rating = this.rating / data.data.rating
      }
    }
  }
}
</script>
