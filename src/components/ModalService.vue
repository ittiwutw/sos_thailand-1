<template>
  <div>
    <v-dialog v-model="OpenModal" width="45%" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2">{{type}}</v-card-title>
        <v-card-text>
          <a-row type="flex">
            <a-col :span='6'>
              <a-row type="flex" class="mt-13" justify="center">
                <span>ประเภทให้บริการ</span>
              </a-row>
            </a-col>
            <a-col :span="16" class="mt-10">
              <v-text-field outlined dense v-model="data.serviceTypeName" placeholder="ชื่อประเภทให้บริการ"></v-text-field>
            </a-col>
            <a-col :span="24" class="mt-5">
              <a-row type="flex" justify="end">
                <a-button @click="Close">ปิด</a-button>
                <a-button type="primary" class="ml-5" @click="Create">บันทึก</a-button>
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
  props: ['type', 'data'],
  computed: {
    OpenModal () {
      return this.$store.state.ModuleApi.ModalListService
    }
  },
  methods: {
    Close () {
      this.$store.commit('SetModalListService')
      this.$EventBus.$emit('GetService')
    },
    Create () {
      if (this.type === 'เพิ่มประเภทให้บริการ') {
        this.CreateListService()
      } else if (this.type === 'เเก้ไขประเภทให้บริการ') {
        this.EditListService()
      }
    },
    async CreateListService () {
      var data = {
        serviceTypeName: this.data.serviceTypeName
      }
      await this.$store.dispatch('CreateListService', data)
      var res = this.$store.state.ModuleApi.CreateListService
      console.log('res CreateList Service', res)
      if (res.response_description === 'SUCCESS') {
        this.$swal({
          icon: 'success',
          text: 'เเก้ไขประเภทให้บริการสำเร็จ',
          showConfirmButton: false,
          timer: 2000
        })
        this.$store.commit('SetModalListService')
        this.$EventBus.$emit('GetService')
      } else {
        this.$swal({
          icon: 'erroe',
          text: 'เเก้ไขประเภทให้บริการไม่สำเร็จ',
          showConfirmButton: false,
          timer: 2000
        })
      }
    },
    async EditListService () {
      var data = {
        serviceTypeId: this.data.serviceTypeId,
        serviceTypeName: this.data.serviceTypeName
      }
      await this.$store.dispatch('EditListService', data)
      var res = this.$store.state.ModuleApi.EditListService
      console.log('res CreateList Service', res)
      if (res.response_description === 'SUCCESS') {
        this.$swal({
          icon: 'success',
          text: 'สร้างประเภทให้บริการสำเร็จ',
          showConfirmButton: false,
          timer: 2000
        })
        this.$store.commit('SetModalListService')
        this.$EventBus.$emit('GetService')
      } else {
        this.$swal({
          icon: 'error',
          text: 'สร้างประเภทให้บริการไม่สำเร็จ',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  }
}
</script>
