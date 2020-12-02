export default {
  data() {
    return {
      val: null,
      rowData: null
    };
  },
  props: {
    value: [String, Number, Array, Function, Date],
    config: Object,
    form: Object,
    scope: Object,
    dataKey: String,
    readOnly: Boolean
  },
  watch: {
    val: {
      deep: true,
      handler(val, old) {
        this.$emit('update:value', val);
        this.$emit('change', val, old, this.rowData);
        // this.value = val;
      }
    },
    value(val) {
      if (['undefined'].includes(typeof val)) {
        this.val = null;
      } else {
        this.val = val;
      }
    }
  },
  methods: {
    clear() {
      this.val = '';
    },
    getValue() {
      return this.returnValue;
    },
    setValue(val) {
      this.val = val;
    }
  }
};
