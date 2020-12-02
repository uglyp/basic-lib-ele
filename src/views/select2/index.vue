<template>
  <div>
   <com-form :form="config" ref="configForm"></com-form>
  </div>
</template>
<script>
import {conSelect2,comForm} from '../../../element/'
export default {
  components:{
    conSelect2,
    comForm
  },
  data(){
    return {
      config:{
        USER:{
          el:conSelect2
        }
      }
    }
  },
  mounted(){
    this.$refs.configForm.setDatas({
      USER:{0:'第一个',4:'第二个'}
    })
  }
}
</script>