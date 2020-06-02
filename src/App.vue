<template id="app">
  <div style="height:100%">
    <router-view/>
    <transition name="el-fade-in">
      <div
        class="loading-modal"
        v-show="loading"
      />
    </transition>
    <transition name="el-fade-in">
      <div
        class="gloadingbar"
        v-show="loading"
      >
        <div class="loader">
          <div class="loader__bar"></div>
          <div class="loader__bar"></div>
          <div class="loader__bar"></div>
          <div class="loader__bar"></div>
          <div class="loader__bar"></div>
          <div class="loader__ball"></div>
        </div>
      </div>
    </transition>
    <div
      @click="setZzcShow"
      class="szzc"
      v-show="$store.state.global.globalZzcShow"
    ></div>
  </div>
</template>

<script>
/* global $ */
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      zzcShow: false,
      keydownEvent: null
    }
  },
  computed: {
    ...mapGetters(['loading']),
    globalZzcShow: function () {
      return this.$store.state.global.globalZzcShow
    }
  },
  watch: {
    globalZzcShow: function () {
      if (this.globalZzcShow) {
        $('body').css('overflow-y', 'hidden')
      } else {
        $('body').css('overflow-y', 'auto')
      }
    }
  },
  async created () {
    this.getSystemConfig()
  },
  mounted () {
    this.keydownEvent = e => {
      if (
        e.keyCode === 70 &&
        e.ctrlKey &&
        this.$store.state.global.ctrlFTarget != null
      ) {
        this.$store.state.global.ctrlFTarget.show = !this.$store.state.global
          .ctrlFTarget.show
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', this.keydownEvent, false)
  },
  beforeDestroy: function () {
    window.removeEventListener('keydown', this.keydownEvent)
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.commit('setCtrlFTarget', null)
    next()
  },
  methods: {
    ...mapActions([
      'getSystemConfig'
    ]),
    setZzcShow: function () {
      this.$store.commit(
        'showGlobalZzc',
        !this.$store.state.global.globalZzcShow
      )
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
@import '~@galaplat/utils/src/styles/var.less';
.el-popper[x-placement^="right"] .popper__arrow {
  left: -8px;
}
.el-popper[x-placement^="right"] .popper__arrow::after {
  border-right-color: #010101;
  border-width: 8px 8px 8px 0;
  bottom: -8px;
}
.el-popover {
  min-width: 70px;
}
.el-popover--plain {
  padding: 10px 10px;
}
.custom-tree-node {
  width: 100%;
  position: relative;
  img {
    margin-right: 2px;
  }
  .userIcon {
    vertical-align: -2px;
  }
  .statusoff {
    cursor: pointer;
    span {
      color: @color-aux-font;
      padding-left: 5px;
      display: inline-block;
    }
  }
  .joinStatus {
    position: absolute;
    right: 0;
    color: @color-aux-font;
    margin-right: 10px;
    font-size: @size-font-ees;
  }
  .joined {
    color: @color-aux-impot;
  }
  .userRole {
    position: absolute;
    left: -45px;
    top: 5px;
    color: @color-fd3;
    background: @color-aux-impot;
    border-radius: 2px;
    width: 40px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: @size-font-ees;
  }
  .superAdmin {
    background: @color-aux-waring;
  }
  .joinOrNot {
    display: none;
    position: absolute;
    right: 5px;
    top: 5px;
    color: @color-fd3;
    background: @color-aux-impot;
    border-radius: 2px;
    width: 44px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: @size-font-ees;
  }
}
.custom-tree-node:hover .joinOrNot {
  display: block;
}
.el-tree-node__content.choose > .custom-tree-node > .utools {
  display: block !important;
}
</style>
