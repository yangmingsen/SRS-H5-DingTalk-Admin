<template>
  <div class="root">
    <el-container>
      <el-aside class="slide">
        <div class="floor">
          <div class="floor-msg">
            <el-row>
              <el-col :span="1">
                <div class="grid-content"></div>
              </el-col>
              <el-col :span="23">
                <div class="grid-content ">10B第五层</div>
              </el-col>
            </el-row>
          </div>
          <div class="floor-msg">
            <el-row>
              <el-col :span="1">
                <div class="grid-content active-bg"></div>
              </el-col>
              <el-col :span="23">
                <div class="grid-content active-bg2">10B第六层</div>
              </el-col>
            </el-row>
          </div>
          <div class="floor-msg">
            <el-row>
              <el-col :span="1">
                <div class="grid-content "></div>
              </el-col>
              <el-col :span="23">
                <div class="grid-content ">10B第七层</div>
              </el-col>
            </el-row>
          </div>
          <div class="floor-msg">
            <el-row>
              <el-col :span="1">
                <div class="grid-content "></div>
              </el-col>
              <el-col :span="23">
                <div class="grid-content ">13B第五层</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-aside>
      <el-container>
        <el-main class="body">
          <div class="header">
            <el-row>
              <el-col :span="8">
                <div class="header-left">
                  <el-row>
                    <el-col :span="5">
                      <div class="header-left-datemsg">选择日期</div>
                    </el-col>
                    <el-col :span="8">
                      <div class="header-left-date">
                        <el-date-picker
                          v-model="filterDate"
                          type="date"
                          class="header-left-date-sty"
                          :editable=false
                          :clearable=false
                          placeholder="选择日期">
                        </el-date-picker>
                      </div>
                    </el-col>
                    <el-col :span="11">
                    </el-col>
                  </el-row>
                </div>
              </el-col>

              <el-col :span="12">
                &nbsp;
              </el-col>

              <el-col :span="4">
                <div class="header-right">
                  <el-row>
                    <el-col :span="10"><div class="header-right-bt">取消编辑</div></el-col>
                    <el-col :span="4"><div class="">&nbsp;</div></el-col>
                    <el-col :span="10"><div class="header-right-bt">更改</div></el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import cache from '@galaplat/utils/lib/mixins/cache'
export default {
  name: 'booking-seat',
  mixins: [cache],
  data() {
    return {
      filterDate: ""
    }
  }
}
</script>

<style lang="less" scoped>
  .root {
    background-color: #F8F8F8;

    .slide {
      width: 20%;
      margin-right: 5px;
      border-radius: 2px;
      background-color: #fff;

      .floor {
        text-align: center;
        .floor-msg {
          height: 4rem;
          font-size: 1rem;
          color: #8E8E8E;

          .grid-content {
            height: 4rem;
            box-sizing: border-box;
            padding-top: 8%;
          }

        }
      }
    }

    .body {
      text-align: center;
      background-color: #fff;
      height: 1000px;
      .header {
        font-size: 1.1rem;
        margin: 0 5px;
        height: 60px;
        box-sizing: border-box;
        padding-top: 9px;

        .header-left {
          .header-left-datemsg {
            margin-left: 17%;
            margin-top: 5%;
            color: #00AFAA;
          }
          .header-left-date {
            margin-left: 1%;

            .header-left-date-sty /deep/ .el-input__inner {
              border: 1px solid #C3EFF4;
              /*border-radius: 10px;*/
              color: #00afa5;
              padding-left: 5%;
              font-size: 1.1rem;
            }
            .header-left-date-sty /deep/ .el-input__prefix {
              color: #00afa5;
              font-size: 1.2rem;
              margin-left: 84%;
            }

          }

        }
        .header-right {
          margin-right: 7%;
          .header-right-bt {
            height: 40px;
            box-sizing: border-box;
            background-color: #00AFAA;
            color: #ffffff;
            padding-top: 7%;
            border-radius: 9px;
          }

        }

        border-bottom: 1px solid #00afa5;

      }
    }
  }

  .active-bg2 {
    background-color: #9BE8EC;

    /*background-color:rgba(55,210,218,0.7);*/
    height: 4rem;
  }
  .active-bg {
    height: 4rem;
    width: 40px;
    height: 4rem;
    background-color: #00AFAA;
  }



</style>
