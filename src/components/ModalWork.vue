<template>
  <div>
    <v-dialog v-model="Modal" width="45%" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2">{{Type}}</v-card-title>
        <v-card-text>
          <a-row type="flex">
            <a-col :span='12'>
              <a-row type="flex" class="mt-5">
                <span >รายละเอียดผู้เเจ้ง</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>ชื่อผู้เเจ้งเหตุ :</span>
                <span>{{ Username }}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>อีเมล์ :</span>
                <span>{{ UserEmail }}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>หมายเลขโทรศัพท์ :</span>
                <span>{{ UserPhone }}</span>
              </a-row>
              <a-row type="flex" class="mt-5">
                <span >รายละเอียดผู้รับเเจ้งเหตุ</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>ผู้รับเเจ้ง :</span>
                <span>{{ Officername }}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>อีเมล์ :</span>
                <span>{{ OfficerEmail }}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>หมายเลขโทรศัพท์ :</span>
                <span>{{ Officerphone }}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>สถานะการดำเนินการ :</span>
                <span>{{ Status }}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>รายละเอียด :</span>
                <span>{{ discription }}</span>
              </a-row>
            </a-col>
            <a-col :span='12'>
              <a-card class="mt-2">
                <img width="100%" :src="Img" />
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
      Img: 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png',
      Username: '-',
      UserEmail: '-',
      UserPhone: '-',
      Officername: '-',
      OfficerEmail: '-',
      Officerphone: '-',
      Status: '-',
      Type: '-',
      discription: '-'
    }
  },
  computed: {
    Modal () {
      return this.$store.state.ModuleApi.Modal
    }
  },
  watch: {
    props (val) {
      // console.log('Open-------->>>', val)
      if (val.sosImgs !== 'undefined') {
        this.Img = JSON.parse(val.sosImgs)[0]
      }
      this.Username = val.userReqName
      // this.UserEmail = val.userProfile[0].email
      // this.UserPhone = val.userProfile[0].tel
      // if (val.officerProfile.length !== 0) {
      this.Officername = val.officerName
      // this.OfficerEmail = val.officerProfile[0].email
      this.Officerphone = val.officerTel
      // }
      this.discription = val.description
      this.Type = val.typeName
      this.Status = val.status
    }
  },
  methods: {
    CloseModal () {
      this.$store.commit('SetModal')
    }
  }
}
</script>
