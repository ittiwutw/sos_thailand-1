<template>
  <div>
    <loading :active.sync="StatusApi"></loading>
    <a-row type="flex" justify="center">
      <a-col :xs="24" :md="20" class="mb-3">
        <a-button type="primary" @click="Add">เพิ่มประเภทการให้บริการ</a-button>
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
          <template v-slot:[`item.edit`]="{ item }">
                <a-button @click="edit(item)">เเก้ไข</a-button>
                <a-button class="ml-3" @click="Delete(item)">ลบ</a-button>
          </template>
          </v-data-table>
        </v-card>
        <div class="text-center pt-2 pb-3">
          <v-pagination  light v-model="page" :total-visible="7" :length="pageCount"></v-pagination>
        </div>
      </a-col>
    </a-row>
    <Modal :type="TypeStatus" :data="dataEdit" />
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import Modal from '@/components/ModalService'
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
        { text: 'ชื่อ service', sortable: false, value: 'serviceTypeName' },
        { text: 'เเก้ไขข้อมูล', sortable: false, value: 'edit', align: 'center' }
      ],
      Status: false,
      TypeStatus: 'เพิ่มประเภทให้บริการ',
      dataEdit: {
        serviceTypeName: '',
        serviceTypeId: ''
      }
    }
  },
  methods: {
    Add () {
      this.dataEdit = {
        serviceTypeName: '',
        serviceTypeId: ''
      }
      this.TypeStatus = 'เพิ่มประเภทให้บริการ'
      this.$store.commit('SetModalListService')
    },
    edit (val) {
      this.dataEdit = val
      this.TypeStatus = 'เเก้ไขประเภทให้บริการ'
      this.$store.commit('SetModalListService')
    },
    async Delete (val) {
      var data = {
        serviceTypeId: val.serviceTypeId
      }
      this.$store.dispatch('DeleteListService', data)
      var res = this.$store.state.ModuleApi.DeleteListService
      if (res.response_description === 'SUCCESS') {
        this.$swal({
          icon: 'success',
          text: 'ลบประเภทให้บริการสำเร็จ',
          showConfirmButton: false,
          timer: 2000
        })
        this.$EventBus.$emit('GetService')
      } else {
        this.$swal({
          icon: 'error',
          text: 'ลบประเภทให้บริการไม่สำเร็จ',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  }
}
</script>
