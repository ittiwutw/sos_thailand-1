<template>
  <div>
    <v-dialog v-model="Modal" width="45%" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2">รายละเอียดเจ้าหน้าที่</v-card-title>
        <v-card-text>
          <a-row type="flex">
            <a-col :span='12'>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>ชื่อ :</span>
                <span>{{props.name}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>หน่วยงาน :</span>
                <span>{{props.job}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>หมายเลขโทรศัพท์ :</span>
                <span>{{props.tel}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>เขตรับผิดชอบ :</span>
                <span>{{props.area}}</span>
              </a-row>
              <a-row type="flex" class="ma-5" justify="space-between">
                <span>อีเมล์ :</span>
                <span>{{props.email}}</span>
              </a-row>
            </a-col>
            <a-col :span='12'>
              <a-card class="mt-2">
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
  computed: {
    Modal () {
      return this.$store.state.ModuleApi.Modal
    }
  },
  methods: {
    CloseModal () {
      this.$store.commit('SetModal')
    }
  }
}
</script>
