<template>
  <el-cascader
    class="cascader-organ"
    v-model="val"
    :options="options"
    :props="props"
    @active-item-change="handleChange"
  >
     </el-cascader>
</template>
<script>
import control from "../mixins/control";
export default {
  mixins: [control],
  async created() {
     await this.getProvince();
    if (this.value === null || typeof this.value === "undefined") {
      this.val = "";
    } else {
      if(this.value.length){
        this.returnShow(this.value);
      }else{
        this.val = this.value;
      }
    }
  },
  data(){
    return {
      options: [],
      props:{
        label:'regionName',
        value:'regionCode'
      }
    }
  },
  computed: {
    returnValue() {
      return this.val;
    },
    lastConfig() {
      const config = this.config || {};
      return {
        disabled: config.disabled || false,
        placeholder: config.placeholder || "选择日期"
      };
    },
  },
  methods:{
    setValue(val) {
      this.returnShow(val);
      this.val = val;
    },
     getProvince(){
       this.config.dataSource()({pCode:''}).then(res=>{
         res.forEach(item=>{
          this.$set(item, "children", []);
         })
          this.options = res;
        })
     },
     getCityData(pCode){
        this.config.dataSource()({pCode}).then(res=>{
          res.forEach(city=>{
          this.$set(city, "children", []);
         })
          this.options.map((item) => {
        if (item.regionCode === pCode) {
          this.$set(item, "children", res);
        }
     })
    })
    },
     getAreaData (pId,pCode){
         this.config.dataSource()({pCode}).then(res=>{
          $c.log(pCode,res,'res,pCode')
          this.options.map((item) => {
            if (item.regionCode === pId) {
                item.children.map((city) => {
                  if(city.regionCode===pCode){
                     this.$set(city, "children", res);
                  }
            });
            }
        })
      })
     },
     handleChange(val) {
      if (val.length === 1) {
        this.getCityData(val[0]);
      } else if (val.length === 2) {
        this.getAreaData(val[0], val[1]);
      }
    },
    returnShow(val){
      this.config.dataSource()({pCode:''}).then(res=>{
         res.forEach(item=>{
          this.$set(item, "children", []);
         })
          this.options = res;
           this.config.dataSource()({pCode:val[0]}).then(res2=>{
              res2.forEach(city2=>{
                this.$set(city2, "children", []);
              })
            this.options.map((item2) => {
            if (item2.regionCode === val[0]) {
              this.$set(item2, "children", res2);
            }
           })
           this.config.dataSource()({pCode:val[1]}).then(res3=>{
              this.options.map((item3) => {
                if (item3.regionCode === val[0]) {
                    item3.children.map((city) => {
                      if(city.regionCode===val[1]){
                        this.$set(city, "children", res3);
                      }
                });
                }
            })
            this.$set(this,'val',val);
          })
      })
    })
  }
  }
};
</script>
