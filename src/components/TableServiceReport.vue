<template>
  <div>
    <loading :active.sync="StatusApi"></loading>
    <a-row type="flex" justify="center">
      <a-col :span="24" class="mb-5">
        <a-row type="flex">
          <a-col :span="7" offset="15">
            <v-text-field dense hide-details v-model="search" outlined placeholder="ค้นหา"></v-text-field>
          </a-col>
        </a-row>
      </a-col>
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
          <template v-slot:[`item.lat`]="{ item }">
                <a-button @click="GoogleMap(item)">เปิด Map</a-button>
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
import Modal from '@/components/ModalServiceReport'
export default {
  props: ['props', 'StatusApi'],
  components: {
    Loading,
    Modal
  },
  data () {
    return {
      PropModal: '',
      pageCount: 10,
      page: 1,
      itemsPerPage: 10,
      search: '',
      headers: [
        { text: 'ลำดับ', sortable: false, value: 'num', align: 'center' },
        { text: 'หมายเลขการเรียกใช้บริการ', sortable: false, value: 'requestNumber', align: 'center' },
        { text: 'ประเภท', sortable: false, value: 'serviceTypeName', align: 'center' },
        { text: 'เเสดงตำเเหน่ง', sortable: false, value: 'lat', align: 'center' },
        { text: 'สถานะ', sortable: false, value: 'status', align: 'center' },
        { text: 'รายละเอียด', sortable: false, value: 'edit3', align: 'center' }
      ]
    }
  },
  created () {
    // // console.log('---->', this.props)
  },
  methods: {
    async detail (val) {
      this.PropModal = val
      await this.$store.commit('SetModal')
    },
    GoogleMap (val) {
      var url = `http://google.com/maps/place/${val.lat},${val.lng}`
      window.open(url, '_blank')
    }
  }
}
</script>
