<template>
  <sequential-entrance delay="1000">
    <Homepage />
  </sequential-entrance>
</template>
<script>
import Homepage from '@/components/Homepage'
export default {
  components: {
    Homepage
  },
  created () {
    if (localStorage.getItem('user') === null) {
      this.$router.push('/Login')
    }
  }
}
</script>
