<template>
  <div>
    <loading :active.sync="StatusApi"></loading>
    <a-row type="flex" justify="center">
      <a-col :xs="24" :md="20">
        <v-card outlined>
            <v-data-table
            :headers="headers"
            :items="props"
            @page-count="pageCount = $event"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            :search="search"
            hide-default-footer
          >
          <template v-slot:[`item.edit3`]="{ item }">
                <a-button @click="detail(item)">รายละเอียด</a-button>
          </template>
          </v-data-table>
        </v-card>
        <div class="text-center pt-2 pb-3">
          <v-pagination  light v-model="page" :total-visible="7" :length="pageCount"></v-pagination>
        </div>
      </a-col>
    </a-row>
    <Modal :props="PropModal" />
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import Modal from '@/components/ModalUser'
export default {
  components: {
    Modal,
    Loading
  },
  props: ['props', 'StatusApi'],
  data () {
    return {
      PropModal: '',
      pageCount: 10,
      page: 1,
      itemsPerPage: 10,
      search: '',
      headers: [
        { text: 'ลำดับ', sortable: false, value: 'num', align: 'center' },
        { text: 'ชื่อ', sortable: false, value: 'name', align: 'center' },
        { text: 'สถานที่ปฏิบัติงาน', sortable: false, value: 'adminCompanyName', align: 'center' },
        { text: 'หมายเลขโทรศัพท์', sortable: false, value: 'tel', align: 'center' },
        { text: 'เขต', sortable: false, value: 'adminDistrict', align: 'center' },
        { text: 'รายละเอียด', sortable: false, value: 'edit3', align: 'center' }
      ]
    }
  },
  created () {
    console.log('this.props', this.props)
  },
  watch: {
    props (val) {
      console.log('object', val)
    }
  },
  methods: {
    async detail (val) {
      this.PropModal = val
      await this.$store.commit('SetModal')
    }
  }
}
</script>
