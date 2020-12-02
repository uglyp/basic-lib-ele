<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-if="config && (error || list.length)"
      class="com-list"
      v-model="load"
      :finished="finished"
      :error.sync="error"
      @load="getData"
      :finished-text="conf.finished || '加载完毕'"
      error-text="加载失败, 请下拉顶部区域刷新"
    >
      <van-cell v-for="(t, i) in list" :key="i">
        <slot :row="t"></slot>
      </van-cell>
    </van-list>
    <van-empty v-else-if="finished && list.length < 1" image="search" description="没有数据" />
    <strong v-else-if="!config">请传入config</strong>
  </van-pull-refresh>
</template>
<script>
export default {
  props: {
    config: Object
  },
  data() {
    return {
      list: [],
      load: false,
      finished: false,
      error: false,
      refreshing: false,
      navi: { _anyline_page: 0 }
    };
  },
  computed: {
    conf() {
      return this.$store.getters.list;
    },
    count() {
      if (this.$el && this.config.height) {
        let count = Math.ceil(this.$el.offsetHeight / this.config.height);
        return count || 10;
      } else {
        return 10;
      }
    }
  },
  mounted() {
    if (!this.list.length) {
      this.getData();
    }
  },
  methods: {
    onRefresh() {
      this.getData(true);
    },
    getData(newPage) {
      const self = this;
      if (newPage) {
        this.navi._anyline_page = 0;
        this.list = [];
        this.finished = false;
      }
      if (this.config.dao) {
        this.load = true;
        this.navi._anyline_page_rows = this.count;
        this.navi._anyline_page += 1;
        this.refreshing = false;
        // setTimeout(()=>{
        //   this.list.push(1,2,3,4,5,6,7,8,9,10);
        //   this.load = false;
        // },2000)
        this.$root.listStats = true;
        Object.assign(this.navi, this.config.params);
        this.config
          .dao(this.navi)
          .then(r => {
            $c.log(123, r);
            if (r.row) {
              this.list.push(...r.row);
            }
            this.load = false;
            this.$root.listStats = false;
            if (!r.navi) {
              $c.warn("navi对象获取失败,无法分页");
              this.finished = false;
              return;
            }
            if (r.navi.totalPage == this.navi._anyline_page) {
              this.finished = true;
            }
            this.$emit("loaded");
          })
          .catch(err => {
            $c.log(err);
            this.navi._anyline_page -= 1;
            this.load = false;
            this.error = true;
            this.finished = false;
            this.$emit("loaded");
          });
      } else {
        this.$notify("config.dao不存在");
      }
    }
  }
};
</script>
