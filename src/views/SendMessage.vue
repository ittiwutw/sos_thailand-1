<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col :xs="24" :md="20" class="mt-5 mb-5">
        <span class="headline">เเจ้งเหตุ</span>
      </a-col>
      <a-col :xs="16">
        <v-text-field outlined dense placeholder="ข้อความเเจ้งเหตุ" v-model="message" @keyup.enter="confirm"></v-text-field>
      </a-col>
      <a-col :xs="2" class="mt-1 ml-3">
        <a-button block type="primary" @click="confirm">ยืนยัน</a-button>
      </a-col>
      </a-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async confirm () {
      var data = {
        msg: this.message
      }
      var response = await this.axios.post(`${process.env.VUE_APP_API}/sendNotificationToAll`, data)
      if (response.data.response_description === 'SUCCESS') {
        this.$swal({
          icon: 'success',
          text: 'ส่งข้อความสู่ผู้ใช้งานเรียบร้อย',
          showConfirmButton: false,
          timer: 2000
        })
        this.message = ''
      } else {
        this.$swal({
          icon: 'error',
          text: 'เกิดข้อผิดพลาดจากระบบ',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  }
}
</script>

<style>

</style>
