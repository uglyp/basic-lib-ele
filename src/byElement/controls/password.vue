<template>
  <div>
    <el-input
      v-model="returnValue"
      :disabled="disabled"
      :placeholder="config.placeholder || '请输入'"
      ref="input"
      @focus="focus"
      :type="config.type"
      v-show="false"
    ></el-input>
    <el-form ref="pwdform" :label-width="labelWidth" :model="ruleForm" :rules="rules">
      <el-form-item label="新密码" prop="pwd1" >
        <el-input 
        placeholder="请输入新密码" 
        type="password" 
        class="newPwd" 
        :disabled="disabled" 
        v-model="ruleForm.pwd1" 
        autocomplete="off" 
        maxlength="50"
        size="small"></el-input>
        <div class="pwdMsg">
          <p v-for="(item,index) in pwdMsg" :key="index" :class="isActive == index ? 'lightHeigh': ''||falseAll?'lightHeigh':''">
            {{index+1}}.{{item.txt}}
          </p>
        </div>
      </el-form-item>
      <el-form-item label="确认密码" prop="pwd2" >
        <el-input 
        placeholder="请确认密码"  
        type="password" 
        :disabled="disabled" 
        v-model="ruleForm.pwd2" 
        autocomplete="off"
        maxlength="50"
        size="small"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {pwdValidator,cpwdValidator} from '../../../element/rules'
import { Input,Form, FormItem } from "element-ui";
import control from "../mixins/control";
export default {
  mixins: [control],
  components: {
    elInput: Input,
    elForm: Form,
    elFormItem: FormItem
  },data(){
    return {
      isActive:[],
      falseAll:true,
      pwdMsg: [
        {txt:'不得包含空格'},
        {txt:'不得与账号一致'},
        {txt:'长度不得低于10位'},
        {txt:'至少包含大小写字母，数字，符号'}
      ],
      ruleForm:{
        pwd1:'',
        pwd2:''
      },
      rules:{
        pwd1: {
          required: true,
          validator: (rule, val, callback) => pwdValidator(rule, val,callback,this.testFun,this.config.org),
          trigger: 'blur'
        },
        pwd2: {
          required: true,
          validator: (rule, val, callback) => cpwdValidator(rule, val, callback, this.ruleForm.pwd1,this.changeFlag),
          trigger: 'blur'
        }
      },
      flag:false,
      pwdVal:''
    }
  },
  props:{
    config:{
      type:Object
    }
  },
  created() {
    // $c.log('password',this.pwdconfig,:class="isActive == index ? 'lightHetght' : '')
    let ruleConfig = this.config.test
    if(ruleConfig != null || typeof ruleConfig != "undefined" ){
      this.pwdMsg = ruleConfig.pwdMsg
      this.rules.pwd1 = {
          required: true,
          validator: (rule, val, callback) => pwdValidator(rule, val,callback,ruleConfig.pwd1,this.config.org),
          trigger: 'blur'
        }
    }
    if (this.value === null || typeof this.value === "undefined") {
      this.val = "";
    } else {
      this.val = this.ruleForm.pwd1;
    }
    window.$pwd = this
  },
  computed: {
    returnValue() {
      if(this.isActive == 5 && this.flag){
        this.val = this.ruleForm.pwd1
        return this.ruleForm.pwd1;
      }else{
        return ''
      }
    },
    disabled() {
      return this.config.disabled;
    },
    labelWidth(){
      if (this.config.labelWidth === null || typeof this.config.labelWidth === "undefined") {
        return "100px"
      } else {
        return this.config.labelWidth
      }
    }
  },
  methods: {
    checkAc(i){
      if(this.isActive.length != 0){
        for(let y of this.isActive){
          if(y == i){
            return "lightHeigh"
          }
        }
      }
    },
    changeActive(type){
      this.isActive = type
    },
    changeFlag(res){
      this.flag = res
    },
    focus() {
      let input = this.$refs.input.$el.getElementsByTagName("INPUT");
      input[0] && input[0].select();
    },
    testFun(val, callback,acc){
      let realArr = []
      if (!val) {
        callback()
        realArr.push(0,1,2,3)
        this.changeActive(realArr)
      }else{
        if(val == acc) {
          realArr.push(1)
        }
        if (val.length < 10) {
          realArr.push(2)
        } 
        if (val.indexOf(" ") > -1) {
          realArr.push(0)
        }
        let lv = 0;
        if (val.match(/[A-Za-z]/g)) {
          lv++;
        }
        if (val.match(/[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]/g)) {
          lv++;
        }
        if (val.match(/[0-9]/g)) {
          lv++;
        }
        if (lv < 2) {
          realArr.push(3)
        }
        callback();
        this.changeActive(realArr)
      }
      
    }
  }
};
</script>
