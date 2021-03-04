<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col :xs="24" :md="20" class="mt-5 mb-5">
        <span class="headline">ประเภทการให้บริการ</span>
      </a-col>
      <a-col :xs="24" :md="20" class="mb-3">
        <a-row type="flex">
          <!-- <a-button type="primary" @click="CreateService">สร้างผู้ให้บริการ</a-button> -->
        </a-row>
      </a-col>
      <a-col :span='24'>
        <Table :props="DataTable"  :StatusApi="StatusApi" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import Table from '@/components/TableListService'
export default {
  components: {
    Table
  },
  data () {
    return {
      StatusApi: true,
      DataTable: []
    }
  },
  mounted () {
    this.$EventBus.$on('GetService', this.getListService)
    this.$on('hook:beforeDestroy', () => {
      this.$EventBus.$off('GetService')
    })
  },
  created () {
    this.$EventBus.$emit('StatusHeader', 'ประเภทการให้บริการ')
    // this.$EventBus.$on('GetService', this.getListService)
    this.getListService()
  },
  methods: {
    async getListService () {
      this.DataTable = []
      await this.$store.dispatch('GetListService')
      var data = this.$store.state.ModuleApi.GetListService
      data.data.forEach((element, index) => {
        element.num = index + 1
        this.DataTable.push(element)
      })
      this.StatusApi = false
    }
  }
}
</script>
