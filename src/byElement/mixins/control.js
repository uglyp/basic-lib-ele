const filterList = val => {
  if (val && typeof val === "object" && typeof val.length !== "undefined") {
    return val
      .filter(r => {
        return JSON.stringify(r) !== "{}";
      })
      .slice();
  } else {
    return val;
  }
};
export default {
  data() {
    return {
      val: null,
      rowData: null
    };
  },
  props: {
    value: [Object, String, Number, Array, Function, Boolean],
    el: Object,
    config: Object,
    form: Object,
    dataKey: String,
    readOnly: Boolean
  },
  watch: {
    val: {
      deep: true,
      handler(val, old) {
        let v = filterList(val);
        let o = filterList(old);
        // $c.log('watch', val)
        // $c.log((val && typeof val !== 'object') || (typeof val === 'object' && !!val.length))
        if ((val && typeof val !== "object") || (val && typeof val === "object" && !!val.length)) {
          // $c.log('watch1', val)
          this.$nextTick(() => {
            this.form && this.form.valiDates(this.dataKey);
          });
        }
        this.$emit("update:value", val);
        this.$emit("change", v, o, this.rowData);
      }
    },
    value(val) {
      this.val = val;
    }
  },
  methods: {
    clear() {
      this.val = "";
    },
    getValue() {
      return this.returnValue;
    },
    setValue(val) {
      // $c.log(2, val)
      this.val = val;
    }
  }
};
