<template>
  <div>
    <v-dialog v-model="Modal" width="45%" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2">{{type}}</v-card-title>
        <v-card-text>
          <a-row type="flex" class="ma-5">
            <a-col :span='18'>
              <v-text-field v-model="data.serviceTypeName" name="name" placeholder="ประเภทการให้บริการ" outlined dense hide-details></v-text-field>
            </a-col>
            <!-- <a-col :span='4'> -->
              <a-button size="large" class="ml-3" @click="CreateListService">ตกลง</a-button>
              <a-button size="large" class="ml-3"  @click="CloseModal">ยกเลิก</a-button>
            <!-- </a-col> -->
            <!-- <a-col :span='4'> -->
            <!-- </a-col> -->
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
    Modal () {
      return this.$store.state.ModuleApi.ModalListService
    }
  },
  methods: {
    CloseModal () {
      this.$EventBus.$emit('GetService')
      this.$store.commit('SetModalListService')
    },
    async CreateListService () {
      if (this.type === 'เพิ่มประเภทให้บริการ') {
        var data = {
          serviceTypeName: this.data.serviceTypeName
        }
        await this.$store.dispatch('CreateListService', data)
        this.CloseModal()
      } else {
        data = {
          serviceTypeName: this.data.serviceTypeName,
          serviceTypeId: this.data.serviceTypeId
        }
        await this.$store.dispatch('EditListService', data)
        this.CloseModal()
      }
    }
  }
}
</script>
