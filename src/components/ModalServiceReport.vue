<template>
  <div>
    <v-dialog v-model="Modal" width="85%" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2">รายละเอียดการเรียกใช้บริการ</v-card-title>
        <v-card-text>
          <a-row type="flex">
            <a-col :span='12'>
              <a-row type="flex" class="ma-5" justify="space-between" style="padding-top: 20px;">
                <span><b>หมายเลขการเรียกใช้บริการ</b></span>
                 <span><b>{{props.requestNumber}}</b></span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between" style="padding-top: 20px;">
                <span><b>ผู้เรียกใช้บริการ</b></span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>ชื่อผู้เรียกใช้บริการ :</span>
                <span>{{props.userReqName}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>หมายเลขโทรศัพท์ :</span>
                <span>{{props.userReqTel}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>อีเมล์ :</span>
                <span>{{props.userReqEail}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between" style="padding-top: 20px;">
                <span><b>เจ้าหน้าที่รับบริการ</b></span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>ชื่อผู้ให้บริการ :</span>
                <span>{{props.servicerName}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>เบอร์โทรศัพท์ผู้ให้บริการ :</span>
                <span>{{props.servicerTel}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>คะเเนน :</span>
                <span>{{ratingPoint || '-'}}</span>
              </a-row>
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
