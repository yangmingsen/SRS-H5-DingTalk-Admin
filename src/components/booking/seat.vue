<template>
  <div class="root">
    <el-container>
      <el-aside class="slide">
        <div class="floor">
          <a>
            <div v-for="item in floorListData" class="floor-msg" :class="getSilderSty(item.code)" @click="whenUserClickTheFloorButton(item.code)">
             {{item.name}}
            </div>
          </a>
        </div>
      </el-aside>
      <el-container>
        <el-main class="body">
          <div class="header">
            <div class="header-left">
              选择日期
              <el-date-picker
              v-model="filterDateShow"
              type="date"
              class="header-left-date-sty"
              :editable=false
              :clearable=false
              >
            </el-date-picker>
            </div>

            <div class="header-right">
              <a class="header-right-bt" @click="whenUserClickTheEditButton()">{{editSeatHintMsg}}</a>
              <a class="header-right-bt" @click="whenUserClickTheUpdateButton()">更改</a>
            </div>

            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="20%"
              class="my-dialog-sty"
              :modal=true
              :close-on-click-modal=false
            >
                <span>
                 <div class="choosesty" >
                   <span style="color: red">*</span>更改座位类别
                  <el-select class="choosesty-opt"  v-model="curSelectSeats.typeCode" placeholder="请选择座位类别">
                      <el-option
                        v-for="item in seatCategoryInfos"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>
                 </div>
                  <span v-if="dialogHint.ctge" class="my-dialog-hit">请选择座位类别</span>

                  <div class="clear choosesty" >
                   <span style="color: red">*</span>更改所属部门
                  <el-select  class="choosesty-opt" :disabled="disableTheSelectDept"  v-model="curSelectSeats.departmentCode" :placeholder="disableTheSelectDeptShowMsg">
                      <el-option
                        v-for="item in deptInfos"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"

                      >
                      </el-option>
                  </el-select>
                 </div>
                  <span v-if="dialogHint.dept" class="my-dialog-hit clear">请选择所属部门</span>


                </span>
                <span slot="footer" class="dialog-footer" >
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="whenUserClickTheDialogSaveButton()">确 定</el-button>
                </span>
            </el-dialog>

          </div>
          <div class="body-content">
            <div class="body-content-left">

              <div class="hint-1">
                <div class="body-content-left-seatctf seatctf1">固定座位</div>
                <div class="body-content-left-seatctf seatctf2">灵活座位</div>
                <div class="body-content-left-seatctf seatctf3">公共座位</div>
              </div>

              <div class="hint-2">
                <div class="body-content-left-seatdept" v-for="item in deptInfos" :style="getDeptSty(item.code)" >{{item.name}}</div>
              </div>

            </div>
            <div class="body-content-right">
              <div class="chooseseat">
                <div v-if="floorSelect == 1" class="chooseseat-floor choosearea-10B5">
                  <div :id="item.code" v-for="item in seatBaseInfo10b5" :index="item.code" class="user-seat" :class="getRateSty(item)" :style="getSeatSty(item)"
                       @click="whenUserClickTheSeat(item)" >
                    <el-popover
                      v-if="editSeat == false"
                      :placement= "getTheHitPostion(item.class)"
                      width="40"
                      trigger="click"
                      class="my-popover"
                      :append-to-body=false
                      >
                      <ul class="tips-content" v-if="haveTheReservedPersonInfo == true">
                        <li class="tip-hint-sty">{{reservedPersonInfo.userName}}-{{reservedPersonInfo.no}}</li>
                        <li class="tip-hint-sty">{{reservedPersonInfo.departmentName}}</li>
                      </ul>
                      <ul class="tips-content" v-if="haveTheReservedPersonInfo == false">
                        <li class="tip-hint-sty">{{item.code}}号-无数据</li>
                      </ul>
                      <div  style="width:100%;height:100%; " slot="reference">&nbsp;</div>
                    </el-popover>
                  </div>
                </div>

                <div v-if="floorSelect == 2" class="chooseseat-floor choosearea-10B6">
                  <div v-for="item in seatBaseInfo10b6" :index="item.code" class="user-seat" :class="getRateSty(item)" :style="getSeatSty(item)" @click="whenUserClickTheSeat(item)">
                    <el-popover
                      v-if="editSeat == false"
                      :placement= "getTheHitPostion(item.class)"
                      width="40"
                      trigger="click"
                      class="my-popover"
                      :append-to-body=false
                    >
                      <ul class="tips-content" v-if="haveTheReservedPersonInfo == true">
                        <li class="tip-hint-sty">{{reservedPersonInfo.userName}}-{{reservedPersonInfo.no}}</li>
                        <li class="tip-hint-sty">{{reservedPersonInfo.departmentName}}</li>
                      </ul>
                      <ul class="tips-content" v-if="haveTheReservedPersonInfo == false">
                        <li class="tip-hint-sty">{{item.code}}号-无数据</li>
                      </ul>
                      <div  style="width:100%;height:100%; " slot="reference">&nbsp;</div>
                    </el-popover>
                  </div>
                </div>

                <div v-if="floorSelect == 3" class="chooseseat-floor choosearea-10B7">
                  <div v-for="item in seatBaseInfo10b7" :index="item.code" class="user-seat" :class="getRateSty(item)" :style="getSeatSty(item)" @click="whenUserClickTheSeat(item)">
                    <el-popover
                      v-if="editSeat == false"
                      :placement= "getTheHitPostion(item.class)"
                      width="40"
                      trigger="click"
                      class="my-popover"
                      :append-to-body=false
                    >
                      <ul class="tips-content" v-if="haveTheReservedPersonInfo == true">
                        <li class="tip-hint-sty">{{reservedPersonInfo.userName}}-{{reservedPersonInfo.no}}</li>
                        <li class="tip-hint-sty">{{reservedPersonInfo.departmentName}}</li>
                      </ul>
                      <ul class="tips-content" v-if="haveTheReservedPersonInfo == false">
                        <li class="tip-hint-sty">{{item.code}}号-无数据</li>
                      </ul>
                      <div  style="width:100%;height:100%; " slot="reference">&nbsp;</div>
                    </el-popover>
                  </div>
                </div>

                <div v-if="floorSelect == 4" class="chooseseat-floor choosearea-13B5">
                  <div v-for="item in seatBaseInfo13b5" :index="item.code" class="user-seat" :class="getRateSty(item)" :style="getSeatSty(item)" @click="whenUserClickTheSeat(item)">
                    <el-popover
                      v-if="editSeat == false"
                      :placement= "getTheHitPostion(item.class)"
                      width="40"
                      trigger="click"
                      class="my-popover"
                      :append-to-body=false
                    >
                      <ul class="tips-content" v-if="haveTheReservedPersonInfo == true">
                        <li class="tip-hint-sty">{{reservedPersonInfo.userName}}-{{reservedPersonInfo.no}}</li>
                        <li class="tip-hint-sty">{{reservedPersonInfo.departmentName}}</li>
                      </ul>
                      <ul class="tips-content" v-if="haveTheReservedPersonInfo == false">
                        <li class="tip-hint-sty">{{item.code}}号-无数据</li>
                      </ul>
                      <div  style="width:100%;height:100%; " slot="reference">&nbsp;</div>
                    </el-popover>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
import cache from '@galaplat/utils/lib/mixins/cache'
import http from '@galaplat/utils/lib/common/service'
import {ymsUtil} from '../../api/yUtils'
import {eleMessage} from '../../api/eleMessage'
import {pcApi} from '../../api/pcApi'
export default {
  name: 'booking-seat',
  mixins: [cache],
  data() {

    return {
      filterDateShow: ymsUtil.fmtDate(new Date),
      filterDate: ymsUtil.fmtDate(new Date),
      floorSelect:"1", //1=5, 2=6, 3=7 4=13b5
      deptInfos: [
      ],
      seatCategoryInfos:[
        {
          value: '0',
          label: '灵活座位'
        }, {
          value: '1',
          label: '固定座位'
        }, {
          value: '2',
          label: '公共座位'
        }
      ],
      floorListData: [
        {"code": "001", "name": "10B第五层"},
        {"code": "002", "name": "10B第六层"},
        {"code": "003", "name": "10B第七层"},
        {"code": "004", "name": "13B第五层"},
      ], //所有楼层数
      floorData: [
        {"code":"001", "no":"A001", "typeCode":0,"departmentCode":"312586851"},
        {"code":"002", "no":"A002", "typeCode":2,"departmentCode":"312586851"},
        {"code":"003", "no":"A003", "typeCode":2,"departmentCode":"312586851"},
        {"code":"004", "no":"A004", "typeCode":0,"departmentCode":"312586851"},
        {"code":"005", "no":"A005", "typeCode":2,"departmentCode":"312586851"},
        {"code":"006", "no":"A006", "typeCode":0,"departmentCode":"312586851"},
        {"code":"007", "no":"A007", "typeCode":1,"departmentCode":"312586851"},
        {"code":"008", "no":"A008", "typeCode":0,"departmentCode":"312586851"},
        {"code":"009", "no":"A009", "typeCode":1,"departmentCode":"312586851"},
        {"code":"010", "no":"A010", "typeCode":2,"departmentCode":"212788513"},
        {"code":"011", "no":"A011", "typeCode":2,"departmentCode":"212788513"},
        {"code":"012", "no":"A012", "typeCode":0,"departmentCode":"212788513"},
        {"code":"013", "no":"A013", "typeCode":2,"departmentCode":"212788513"},
        {"code":"014", "no":"A014", "typeCode":2,"departmentCode":"212788513"},
        {"code":"015", "no":"A015", "typeCode":0,"departmentCode":"212788513"},
        {"code":"016", "no":"A016", "typeCode":0,"departmentCode":"212788513"},
        {"code":"017", "no":"A017", "typeCode":0,"departmentCode":"212788513"},
        {"code":"018", "no":"A018", "typeCode":0,"departmentCode":"212788513"},
        {"code":"019", "no":"A019", "typeCode":1,"departmentCode":"212788513"},
        {"code":"020", "no":"A020", "typeCode":1,"departmentCode":"58476173"},
        {"code":"021", "no":"A021", "typeCode":1,"departmentCode":"58476173"},
        {"code":"022", "no":"A022", "typeCode":0,"departmentCode":"58476173"},
        {"code":"023", "no":"A023", "typeCode":0,"departmentCode":"58476173"},
        {"code":"024", "no":"A024", "typeCode":2,"departmentCode":"58476173"},
        {"code":"025", "no":"A025", "typeCode":1,"departmentCode":"58476173"},
        {"code":"026", "no":"A026", "typeCode":1,"departmentCode":"58476173"},
        {"code":"027", "no":"A027", "typeCode":2,"departmentCode":"58476173"},
        {"code":"028", "no":"A028", "typeCode":0,"departmentCode":"58476173"},
        {"code":"029", "no":"A029", "typeCode":2,"departmentCode":"58476173"},
        {"code":"030", "no":"A030", "typeCode":2,"departmentCode":"58476171"},
        {"code":"031", "no":"A031", "typeCode":1,"departmentCode":"58476171"},
        {"code":"032", "no":"A032", "typeCode":2,"departmentCode":"58476171"},
        {"code":"033", "no":"A033", "typeCode":0,"departmentCode":"58476171"},
        {"code":"034", "no":"A034", "typeCode":1,"departmentCode":"58476171"},
        {"code":"035", "no":"A035", "typeCode":0,"departmentCode":"58476171"},
        {"code":"036", "no":"A036", "typeCode":1,"departmentCode":"58476171"},
        {"code":"037", "no":"A037", "typeCode":0,"departmentCode":"58476171"},
        {"code":"038", "no":"A038", "typeCode":0,"departmentCode":"58476171"},
        {"code":"039", "no":"A039", "typeCode":0,"departmentCode":"58476171"},
        {"code":"040", "no":"A040", "typeCode":1,"departmentCode":"58476167"},
        {"code":"041", "no":"A041", "typeCode":2,"departmentCode":"58476167"},
        {"code":"042", "no":"A042", "typeCode":0,"departmentCode":"58476167"},
        {"code":"043", "no":"A043", "typeCode":1,"departmentCode":"58476167"},
        {"code":"044", "no":"A044", "typeCode":0,"departmentCode":"58476167"},
        {"code":"045", "no":"A045", "typeCode":2,"departmentCode":"58476167"},
        {"code":"046", "no":"A046", "typeCode":1,"departmentCode":"58476167"},
        {"code":"047", "no":"A047", "typeCode":1,"departmentCode":"58476167"},
        {"code":"048", "no":"A048", "typeCode":1,"departmentCode":"58476167"},
        {"code":"049", "no":"A049", "typeCode":2,"departmentCode":"58476167"},
        {"code":"050", "no":"A050", "typeCode":0,"departmentCode":"355909505"},
        {"code":"051", "no":"A051", "typeCode":2,"departmentCode":"355909505"},
        {"code":"052", "no":"A052", "typeCode":1,"departmentCode":"355909505"},
        {"code":"053", "no":"A053", "typeCode":1,"departmentCode":"355909505"},
        {"code":"054", "no":"A054", "typeCode":2,"departmentCode":"355909505"},
        {"code":"055", "no":"A055", "typeCode":0,"departmentCode":"355909505"},
        {"code":"056", "no":"A056", "typeCode":2,"departmentCode":"355909505"},
        {"code":"057", "no":"A057", "typeCode":0,"departmentCode":"355909505"},
        {"code":"058", "no":"A058", "typeCode":2,"departmentCode":"355909505"},
        {"code":"059", "no":"A059", "typeCode":2,"departmentCode":"355909505"},
        {"code":"060", "no":"A060", "typeCode":0,"departmentCode":"139691268"},
        {"code":"061", "no":"A061", "typeCode":1,"departmentCode":"139691268"},
        {"code":"062", "no":"A062", "typeCode":0,"departmentCode":"139691268"},
        {"code":"063", "no":"A063", "typeCode":0,"departmentCode":"139691268"},
        {"code":"064", "no":"A064", "typeCode":1,"departmentCode":"139691268"},
        {"code":"065", "no":"A065", "typeCode":2,"departmentCode":"139691268"},
        {"code":"066", "no":"A066", "typeCode":0,"departmentCode":"139691268"},
        {"code":"067", "no":"A067", "typeCode":1,"departmentCode":"139691268"},
        {"code":"068", "no":"A068", "typeCode":2,"departmentCode":"139691268"},
        {"code":"069", "no":"A069", "typeCode":0,"departmentCode":"139691268"},
        {"code":"070", "no":"A070", "typeCode":2,"departmentCode":"58476172"},
        {"code":"071", "no":"A071", "typeCode":0,"departmentCode":"58476172"},
        {"code":"072", "no":"A072", "typeCode":2,"departmentCode":"58476172"},
        {"code":"073", "no":"A073", "typeCode":0,"departmentCode":"58476172"},
        {"code":"074", "no":"A074", "typeCode":0,"departmentCode":"58476172"},
        {"code":"075", "no":"A075", "typeCode":1,"departmentCode":"58476172"},
        {"code":"076", "no":"A076", "typeCode":1,"departmentCode":"58476172"},
        {"code":"077", "no":"A077", "typeCode":2,"departmentCode":"58476172"},
        {"code":"078", "no":"A078", "typeCode":2,"departmentCode":"58476172"},
        {"code":"079", "no":"A079", "typeCode":2,"departmentCode":"58476172"},
        {"code":"080", "no":"A080", "typeCode":1,"departmentCode":"58476174"},
        {"code":"081", "no":"A081", "typeCode":1,"departmentCode":"58476174"},
        {"code":"082", "no":"A082", "typeCode":0,"departmentCode":"58476174"},
        {"code":"083", "no":"A083", "typeCode":2,"departmentCode":"58476174"},
        {"code":"084", "no":"A084", "typeCode":2,"departmentCode":"58476174"},
        {"code":"085", "no":"A085", "typeCode":1,"departmentCode":"58476174"},
        {"code":"086", "no":"A086", "typeCode":0,"departmentCode":"58476174"},
        {"code":"087", "no":"A087", "typeCode":2,"departmentCode":"58476174"},
        {"code":"088", "no":"A088", "typeCode":0,"departmentCode":"58476174"},
        {"code":"089", "no":"A089", "typeCode":2,"departmentCode":"58476174"},
        {"code":"090", "no":"A090", "typeCode":2,"departmentCode":"58476170"},
        {"code":"091", "no":"A091", "typeCode":1,"departmentCode":"58476170"},
        {"code":"092", "no":"A092", "typeCode":1,"departmentCode":"58476170"},
        {"code":"093", "no":"A093", "typeCode":2,"departmentCode":"58476170"},
        {"code":"094", "no":"A094", "typeCode":2,"departmentCode":"58476170"},
        {"code":"095", "no":"A095", "typeCode":1,"departmentCode":"58476170"},
        {"code":"096", "no":"A096", "typeCode":0,"departmentCode":"58476170"},
        {"code":"097", "no":"A097", "typeCode":1,"departmentCode":"58476170"},
        {"code":"098", "no":"A098", "typeCode":1,"departmentCode":"58476170"},
        {"code":"099", "no":"A099", "typeCode":1,"departmentCode":"58476170"},
        {"code":"100", "no":"A100", "typeCode":0,"departmentCode":"69891083"},
        {"code":"101", "no":"A101", "typeCode":2,"departmentCode":"69891083"},
        {"code":"102", "no":"A102", "typeCode":0,"departmentCode":"69891083"},
        {"code":"103", "no":"A103", "typeCode":2,"departmentCode":"69891083"},
        {"code":"104", "no":"A104", "typeCode":2,"departmentCode":"69891083"},
        {"code":"105", "no":"A105", "typeCode":1,"departmentCode":"69891083"},
        {"code":"106", "no":"A106", "typeCode":2,"departmentCode":"69891083"},
        {"code":"107", "no":"A107", "typeCode":1,"departmentCode":"69891083"},
        {"code":"108", "no":"A108", "typeCode":0,"departmentCode":"69891083"},
        {"code":"109", "no":"A109", "typeCode":1,"departmentCode":"69891083"},
        {"code":"110", "no":"A110", "typeCode":0,"departmentCode":"69891083"},
        {"code":"111", "no":"A111", "typeCode":1,"departmentCode":"69891083"},
        {"code":"112", "no":"A112", "typeCode":1,"departmentCode":"69891083"},
        {"code":"113", "no":"A113", "typeCode":0,"departmentCode":"69891083"},
        {"code":"114", "no":"A114", "typeCode":1,"departmentCode":"69891083"},
        {"code":"115", "no":"A115", "typeCode":1,"departmentCode":"69891083"},
        {"code":"116", "no":"A116", "typeCode":1,"departmentCode":"69891083"},
        {"code":"117", "no":"A117", "typeCode":1,"departmentCode":"69891083"},
        {"code":"118", "no":"A118", "typeCode":0,"departmentCode":"69891083"},
        {"code":"119", "no":"A119", "typeCode":1,"departmentCode":"69891083"},
        {"code":"120", "no":"A120", "typeCode":1,"departmentCode":"69891083"},
        {"code":"121", "no":"A121", "typeCode":2,"departmentCode":"69891083"},
        {"code":"122", "no":"A122", "typeCode":1,"departmentCode":"69891083"},
        {"code":"123", "no":"A123", "typeCode":0,"departmentCode":"69891083"},
        {"code":"124", "no":"A124", "typeCode":2,"departmentCode":"69891083"},
        {"code":"125", "no":"A125", "typeCode":2,"departmentCode":"69891083"},
        {"code":"126", "no":"A126", "typeCode":0,"departmentCode":"69891083"},
        {"code":"127", "no":"A127", "typeCode":1,"departmentCode":"69891083"},
        {"code":"128", "no":"A128", "typeCode":2,"departmentCode":"69891083"},
        {"code":"129", "no":"A129", "typeCode":2,"departmentCode":"69891083"},
        {"code":"130", "no":"A130", "typeCode":2,"departmentCode":"69891083"},
        {"code":"131", "no":"A131", "typeCode":1,"departmentCode":"69891083"},
        {"code":"132", "no":"A132", "typeCode":0,"departmentCode":"69891083"},
        {"code":"133", "no":"A133", "typeCode":1,"departmentCode":"69891083"},
        {"code":"134", "no":"A134", "typeCode":1,"departmentCode":"69891083"},
        {"code":"135", "no":"A135", "typeCode":2,"departmentCode":"69891083"}
      ], //某个楼层具体数据
      editSeat: false, //是否开始编辑
      editSeatHintMsg: "开始编辑",
      seatReservedHintInfo:"无数据",
      dialogVisible: false,
      disableTheSelectDept: false,
      disableTheSelectDeptShowMsg: "请选择座位类别",

      curSelectSeats: { //提交data
        codes:[],
        typeCode: "",
        departmentCode: ""
      },
      dialogHint: {
        ctge: false,
        dept: false
      },
      haveTheReservedPersonInfo: false,
      reservedPersonInfo: {
        no: "",
        userName: "",
        departmentName: ""
      },

      //10b5楼座位样式数据 static
      seatBaseInfo10b5: [
        //第一层
        {code: '041', class: 'rotate90', top: '1%', left: '3%'},
        {code: '042', class: 'rotate90', top: '6.6%', left: '3%'},
        {code: '043', class: 'rotate90', top: '12.2%', left: '3%'},
        {code: '035', class: 'rotate270', top: '1%', left: '12%'},
        {code: '036', class: 'rotate270', top: '6.6%', left: '12%'},
        {code: '037', class: 'rotate270', top: '12.2%', left: '12%'},

        {code: '029', class: 'rotate90', top: '1%', left: '22%'},
        {code: '030', class: 'rotate90', top: '6.6%', left: '22%'},
        {code: '031', class: 'rotate90', top: '12.2%', left: '22%'},
        {code: '023', class: 'rotate270', top: '1%', left: '30%'},
        {code: '024', class: 'rotate270', top: '6.6%', left: '30%'},
        {code: '025', class: 'rotate270', top: '12.2%', left: '30%'},

        {code: '018', class: 'rotate90', top: '6.6%', left: '40%'},
        {code: '019', class: 'rotate90', top: '12.2%', left: '40%'},
        {code: '013', class: 'rotate270', top: '6.6%', left: '48.4%'},
        {code: '014', class: 'rotate270', top: '12.2%', left: '48.4%'},

        {code: '007', class: 'rotate90', top: '1%', left: '58.5%'},
        {code: '008', class: 'rotate90', top: '6.6%', left: '58.5%'},
        {code: '009', class: 'rotate90', top: '12.2%', left: '58.5%'},
        {code: '001', class: 'rotate270', top: '1%', left: '66.8%'},
        {code: '002', class: 'rotate270', top: '6.6%', left: '66.8%'},
        {code: '003', class: 'rotate270', top: '12.2%', left: '66.8%'},


        //第二层
        {code: '044', class: 'rotate90', top: '21.5%', left: '3%'},
        {code: '045', class: 'rotate90', top: '27.1%', left: '3%'},
        {code: '046', class: 'rotate90', top: '32.7%', left: '3%'},
        {code: '038', class: 'rotate270', top: '21.5%', left: '12%'},
        {code: '039', class: 'rotate270', top: '27.1%', left: '12%'},
        {code: '040', class: 'rotate270', top: '32.7%', left: '12%'},

        {code: '032', class: 'rotate90', top: '21.5%', left: '22%'},
        {code: '033', class: 'rotate90', top: '27.1%', left: '22%'},
        {code: '034', class: 'rotate90', top: '32.7%', left: '22%'},
        {code: '026', class: 'rotate270', top: '21.5%', left: '30%'},
        {code: '027', class: 'rotate270', top: '27.1%', left: '30%'},
        {code: '028', class: 'rotate270', top: '32.7%', left: '30%'},

        {code: '020', class: 'rotate90', top: '21.5%', left: '40%'},
        {code: '021', class: 'rotate90', top: '27.1%', left: '40%'},
        {code: '022', class: 'rotate90', top: '32.7%', left: '40%'},
        {code: '015', class: 'rotate270', top: '21.5%', left: '48.4%'},
        {code: '016', class: 'rotate270', top: '27.1%', left: '48.4%'},
        {code: '017', class: 'rotate270', top: '32.7%', left: '48.4%'},

        {code: '010', class: 'rotate90', top: '21.5%', left: '58.5%'},
        {code: '011', class: 'rotate90', top: '27.1%', left: '58.5%'},
        {code: '012', class: 'rotate90', top: '32.7%', left: '58.5%'},
        {code: '004', class: 'rotate270', top: '21.5%', left: '66.8%'},
        {code: '005', class: 'rotate270', top: '27.1%', left: '66.8%'},
        {code: '006', class: 'rotate270', top: '32.7%', left: '66.8%'},


        //第三层
        {code: '049', class: 'rotate90', top: '41.2%', left: '3%'},
        {code: '050', class: 'rotate90', top: '46.2%', left: '3%'},
        {code: '047', class: 'rotate90', top: '41.2%', left: '10%'},
        {code: '048', class: 'rotate90', top: '46.2%', left: '10%'},


        //第四层
        {code: '129', class: '', top: '73.5%', left: '3.5%'},
        {code: '128', class: '', top: '73.5%', left: '11.5%'},

        {code: '131', class: 'rotate180', top: '77.9%', left: '3.5%'},
        {code: '130', class: 'rotate180', top: '77.9%', left: '11.5%'},
        {code: '133', class: '', top: '84.6%', left: '3.5%'},
        {code: '132', class: '', top: '84.6%', left: '11.5%'},

        {code: '135', class: 'rotate180', top: '88.8%', left: '3.5%'},
        {code: '134', class: 'rotate180', top: '88.8%', left: '11.5%'},

        //第五层1
        {code: '057', class: '', top: '41%', left: '23.3%'},
        {code: '056', class: '', top: '41%', left: '30.3%'},
        {code: '055', class: '', top: '41%', left: '37.3%'},
        {code: '054', class: '', top: '41%', left: '44.3%'},
        {code: '053', class: '', top: '41%', left: '51.3%'},
        {code: '052', class: '', top: '41%', left: '58.3%'},
        {code: '051', class: '', top: '41%', left: '65.3%'},

        //第五层2
        {code: '064', class: 'rotate180', top: '46.5%', left: '23.3%'},
        {code: '063', class: 'rotate180', top: '46.5%', left: '30.3%'},
        {code: '062', class: 'rotate180', top: '46.5%', left: '37.3%'},
        {code: '061', class: 'rotate180', top: '46.5%', left: '44.3%'},
        {code: '060', class: 'rotate180', top: '46.5%', left: '51.3%'},
        {code: '059', class: 'rotate180', top: '46.5%', left: '58.3%'},
        {code: '058', class: 'rotate180', top: '46.5%', left: '65.3%'},

        {code: '071', class: '', top: '52.9%', left: '23.3%'},
        {code: '070', class: '', top: '52.9%', left: '30.3%'},
        {code: '069', class: '', top: '52.9%', left: '37.3%'},
        {code: '068', class: '', top: '52.9%', left: '44.3%'},
        {code: '067', class: '', top: '52.9%', left: '51.3%'},
        {code: '066', class: '', top: '52.9%', left: '58.3%'},
        {code: '065', class: '', top: '52.9%', left: '65.3%'},

        //第五层3
        {code: '078', class: 'rotate180', top: '56.8%', left: '23.3%'},
        {code: '077', class: 'rotate180', top: '56.8%', left: '30.3%'},
        {code: '076', class: 'rotate180', top: '56.8%', left: '37.3%'},
        {code: '075', class: 'rotate180', top: '56.8%', left: '44.3%'},
        {code: '074', class: 'rotate180', top: '56.8%', left: '51.3%'},
        {code: '073', class: 'rotate180', top: '56.8%', left: '58.3%'},
        {code: '072', class: 'rotate180', top: '56.8%', left: '65.3%'},

        {code: '085', class: '', top: '62.9%', left: '23.3%'},
        {code: '084', class: '', top: '62.9%', left: '30.3%'},
        {code: '083', class: '', top: '62.9%', left: '37.3%'},
        {code: '082', class: '', top: '62.9%', left: '44.3%'},
        {code: '081', class: '', top: '62.9%', left: '51.3%'},
        {code: '080', class: '', top: '62.9%', left: '58.3%'},
        {code: '079', class: '', top: '62.9%', left: '65.3%'},

        //第五层4
        {code: '092', class: 'rotate180', top: '67%', left: '23.3%'},
        {code: '091', class: 'rotate180', top: '67%', left: '30.3%'},
        {code: '090', class: 'rotate180', top: '67%', left: '37.3%'},
        {code: '089', class: 'rotate180', top: '67%', left: '44.3%'},
        {code: '088', class: 'rotate180', top: '67%', left: '51.3%'},
        {code: '087', class: 'rotate180', top: '67%', left: '58.3%'},
        {code: '086', class: 'rotate180', top: '67%', left: '65.3%'},

        {code: '099', class: '', top: '73.2%', left: '23.3%'},
        {code: '098', class: '', top: '73.2%', left: '30.3%'},
        {code: '097', class: '', top: '73.2%', left: '37.3%'},
        {code: '096', class: '', top: '73.2%', left: '44.3%'},
        {code: '095', class: '', top: '73.2%', left: '51.3%'},
        {code: '094', class: '', top: '73.2%', left: '58.3%'},
        {code: '093', class: '', top: '73.2%', left: '65.3%'},

        //第五层5
        {code: '106', class: 'rotate180', top: '77.3%', left: '23.3%'},
        {code: '105', class: 'rotate180', top: '77.3%', left: '30.3%'},
        {code: '104', class: 'rotate180', top: '77.3%', left: '37.3%'},
        {code: '103', class: 'rotate180', top: '77.3%', left: '44.3%'},
        {code: '102', class: 'rotate180', top: '77.3%', left: '51.3%'},
        {code: '101', class: 'rotate180', top: '77.3%', left: '58.3%'},
        {code: '100', class: 'rotate180', top: '77.3%', left: '65.3%'},

        {code: '113', class: '', top: '83.2%', left: '23.3%'},
        {code: '112', class: '', top: '83.2%', left: '30.3%'},
        {code: '111', class: '', top: '83.2%', left: '37.3%'},
        {code: '110', class: '', top: '83.2%', left: '44.3%'},
        {code: '109', class: '', top: '83.2%', left: '51.3%'},
        {code: '108', class: '', top: '83.2%', left: '58.3%'},
        {code: '107', class: '', top: '83.2%', left: '65.3%'},

        //第五层6
        {code: '120', class: 'rotate180', top: '87.5%', left: '23.3%'},
        {code: '119', class: 'rotate180', top: '87.5%', left: '30.3%'},
        {code: '118', class: 'rotate180', top: '87.5%', left: '37.3%'},
        {code: '117', class: 'rotate180', top: '87.5%', left: '44.3%'},
        {code: '116', class: 'rotate180', top: '87.5%', left: '51.3%'},
        {code: '115', class: 'rotate180', top: '87.5%', left: '58.3%'},
        {code: '114', class: 'rotate180', top: '87.5%', left: '65.3%'},

        {code: '127', class: '', top: '93.6%', left: '23.3%'},
        {code: '126', class: '', top: '93.6%', left: '30.3%'},
        {code: '125', class: '', top: '93.6%', left: '37.3%'},
        {code: '124', class: '', top: '93.6%', left: '44.3%'},
        {code: '123', class: '', top: '93.6%', left: '51.3%'},
        {code: '122', class: '', top: '93.6%', left: '58.3%'},
        {code: '121', class: '', top: '93.6%', left: '65.3%'},

      ],
      //10b6楼座位样式数据 static
      seatBaseInfo10b6:[
        //第一层
        {code: '149', class: '', top: '24%', left: '2.0%'},
        {code: '148', class: '', top: '24%', left: '10.3%'},
        {code: '147', class: '', top: '24%', left: '18.6%'},
        {code: '146', class: '', top: '24%', left: '26.9%'},
        {code: '145', class: '', top: '24%', left: '35.1%'},
        {code: '144', class: '', top: '24%', left: '43.4%'},
        {code: '143', class: '', top: '24%', left: '51.7%'},


        //第二层
        {code: '160', class: 'rotate180', top: '30.2%', left: '2.0%'},
        {code: '159', class: 'rotate180', top: '30.2%', left: '8.7%'},
        {code: '158', class: 'rotate180', top: '30.2%', left: '15.5%'},
        {code: '157', class: 'rotate180', top: '30.2%', left: '22.2%'},
        {code: '156', class: 'rotate180', top: '30.2%', left: '28.9%'},
        {code: '155', class: 'rotate180', top: '30.2%', left: '35.6%'},
        {code: '154', class: 'rotate180', top: '30.2%', left: '42.4%'},
        {code: '153', class: 'rotate180', top: '30.2%', left: '49.1%'},
        {code: '152', class: 'rotate180', top: '30.2%', left: '55.8%'},
        {code: '151', class: 'rotate180', top: '30.2%', left: '62.5%'},
        {code: '150', class: 'rotate180', top: '30.2%', left: '69.3%'},
        {code: '171', class: '', top: '36.7%', left: '2.0%'},
        {code: '170', class: '', top: '36.7%', left: '8.7%'},
        {code: '169', class: '', top: '36.7%', left: '15.5%'},
        {code: '168', class: '', top: '36.7%', left: '22.2%'},
        {code: '167', class: '', top: '36.7%', left: '28.9%'},
        {code: '166', class: '', top: '36.7%', left: '35.6%'},
        {code: '165', class: '', top: '36.7%', left: '42.4%'},
        {code: '164', class: '', top: '36.7%', left: '49.1%'},
        {code: '163', class: '', top: '36.7%', left: '55.8%'},
        {code: '162', class: '', top: '36.7%', left: '62.5%'},
        {code: '161', class: '', top: '36.7%', left: '69.3%'},


        {code: '182', class: 'rotate180', top: '41%', left: '2.0%'},
        {code: '181', class: 'rotate180', top: '41%', left: '8.7%'},
        {code: '180', class: 'rotate180', top: '41%', left: '15.5%'},
        {code: '179', class: 'rotate180', top: '41%', left: '22.2%'},
        {code: '178', class: 'rotate180', top: '41%', left: '28.9%'},
        {code: '177', class: 'rotate180', top: '41%', left: '35.6%'},
        {code: '176', class: 'rotate180', top: '41%', left: '42.4%'},
        {code: '175', class: 'rotate180', top: '41%', left: '49.1%'},
        {code: '174', class: 'rotate180', top: '41%', left: '55.8%'},
        {code: '173', class: 'rotate180', top: '41%', left: '62.5%'},
        {code: '172', class: 'rotate180', top: '41%', left: '69.3%'},
        {code: '193', class: '', top: '47.5%', left: '2.0%'},
        {code: '192', class: '', top: '47.5%', left: '8.7%'},
        {code: '191', class: '', top: '47.5%', left: '15.5%'},
        {code: '190', class: '', top: '47.5%', left: '22.2%'},
        {code: '189', class: '', top: '47.5%', left: '28.9%'},
        {code: '188', class: '', top: '47.5%', left: '35.6%'},
        {code: '187', class: '', top: '47.5%', left: '42.4%'},
        {code: '186', class: '', top: '47.5%', left: '49.1%'},
        {code: '185', class: '', top: '47.5%', left: '55.8%'},
        {code: '184', class: '', top: '47.5%', left: '62.5%'},
        {code: '183', class: '', top: '47.5%', left: '69.3%'},


        {code: '204', class: 'rotate180', top: '52.1%', left: '2.0%'},
        {code: '203', class: 'rotate180', top: '52.1%', left: '8.7%'},
        {code: '202', class: 'rotate180', top: '52.1%', left: '15.5%'},
        {code: '201', class: 'rotate180', top: '52.1%', left: '22.2%'},
        {code: '200', class: 'rotate180', top: '52.1%', left: '28.9%'},
        {code: '199', class: 'rotate180', top: '52.1%', left: '35.6%'},
        {code: '198', class: 'rotate180', top: '52.1%', left: '42.4%'},
        {code: '197', class: 'rotate180', top: '52.1%', left: '49.1%'},
        {code: '196', class: 'rotate180', top: '52.1%', left: '55.8%'},
        {code: '195', class: 'rotate180', top: '52.1%', left: '62.5%'},
        {code: '194', class: 'rotate180', top: '52.1%', left: '69.3%'},
        {code: '215', class: '', top: '58.5%', left: '2.0%'},
        {code: '214', class: '', top: '58.5%', left: '8.7%'},
        {code: '213', class: '', top: '58.5%', left: '15.5%'},
        {code: '212', class: '', top: '58.5%', left: '22.2%'},
        {code: '211', class: '', top: '58.5%', left: '28.9%'},
        {code: '210', class: '', top: '58.5%', left: '35.6%'},
        {code: '209', class: '', top: '58.5%', left: '42.4%'},
        {code: '208', class: '', top: '58.5%', left: '49.1%'},
        {code: '207', class: '', top: '58.5%', left: '55.8%'},
        {code: '206', class: '', top: '58.5%', left: '62.5%'},
        {code: '205', class: '', top: '58.5%', left: '69.3%'},



        //第三层
        {code: '222', class: 'rotate180', top: '64.6%', left: '25.7%'},
        {code: '221', class: 'rotate180', top: '64.6%', left: '33.0%'},
        {code: '220', class: 'rotate180', top: '64.6%', left: '40.3%'},
        {code: '219', class: 'rotate180', top: '64.6%', left: '47.6%'},
        {code: '218', class: 'rotate180', top: '64.6%', left: '54.8%'},
        {code: '217', class: 'rotate180', top: '64.6%', left: '62.1%'},
        {code: '216', class: 'rotate180', top: '64.6%', left: '69.4%'},
        {code: '229', class: '', top: '71.2%', left: '25.7%'},
        {code: '228', class: '', top: '71.2%', left: '33.0%'},
        {code: '227', class: '', top: '71.2%', left: '40.3%'},
        {code: '226', class: '', top: '71.2%', left: '47.6%'},
        {code: '225', class: '', top: '71.2%', left: '54.8%'},
        {code: '224', class: '', top: '71.2%', left: '62.1%'},
        {code: '223', class: '', top: '71.2%', left: '69.4%'},
        {code: '236', class: 'rotate180', top: '75%', left: '25.7%'},
        {code: '235', class: 'rotate180', top: '75%', left: '33.0%'},
        {code: '234', class: 'rotate180', top: '75%', left: '40.3%'},
        {code: '233', class: 'rotate180', top: '75%', left: '47.6%'},
        {code: '232', class: 'rotate180', top: '75%', left: '54.8%'},
        {code: '231', class: 'rotate180', top: '75%', left: '62.1%'},
        {code: '230', class: 'rotate180', top: '75%', left: '69.4%'},
        {code: '243', class: '', top: '81.6%', left: '25.7%'},
        {code: '242', class: '', top: '81.6%', left: '33.0%'},
        {code: '241', class: '', top: '81.6%', left: '40.3%'},
        {code: '240', class: '', top: '81.6%', left: '47.6%'},
        {code: '239', class: '', top: '81.6%', left: '54.8%'},
        {code: '238', class: '', top: '81.6%', left: '62.1%'},
        {code: '237', class: '', top: '81.6%', left: '69.4%'},
        {code: '250', class: 'rotate180', top: '86.1%', left: '25.7%'},
        {code: '249', class: 'rotate180', top: '86.1%', left: '33.0%'},
        {code: '248', class: 'rotate180', top: '86.1%', left: '40.3%'},
        {code: '247', class: 'rotate180', top: '86.1%', left: '47.6%'},
        {code: '246', class: 'rotate180', top: '86.1%', left: '54.8%'},
        {code: '245', class: 'rotate180', top: '86.1%', left: '62.1%'},
        {code: '244', class: 'rotate180', top: '86.1%', left: '69.4%'},
        {code: '257', class: '', top: '92.6%', left: '25.7%'},
        {code: '256', class: '', top: '92.6%', left: '33.0%'},
        {code: '255', class: '', top: '92.6%', left: '40.3%'},
        {code: '254', class: '', top: '92.6%', left: '47.6%'},
        {code: '253', class: '', top: '92.6%', left: '54.8%'},
        {code: '252', class: '', top: '92.6%', left: '62.1%'},
        {code: '251', class: '', top: '92.6%', left: '69.4%'},



        //第4层
        {code: '260', class: 'rotate180', top: '62.5%', left: '2.0%'},
        {code: '259', class: 'rotate180', top: '62.5%', left: '8.7%'},
        {code: '258', class: 'rotate180', top: '62.5%', left: '15.3%'},
        {code: '263', class: 'rotate180', top: '70.7%', left: '2.0%'},
        {code: '262', class: 'rotate180', top: '70.7%', left: '8.7%'},
        {code: '261', class: 'rotate180', top: '70.7%', left: '15.3%'},
        {code: '266', class: '', top: '77.1%', left: '2.0%'},
        {code: '265', class: '', top: '77.1%', left: '8.7%'},
        {code: '264', class: '', top: '77.1%', left: '15.3%'},
        {code: '269', class: 'rotate180', top: '82%', left: '2.0%'},
        {code: '268', class: 'rotate180', top: '82%', left: '8.7%'},
        {code: '267', class: 'rotate180', top: '82%', left: '15.3%'},
        {code: '272', class: '', top: '88.2%', left: '2.0%'},
        {code: '271', class: '', top: '88.2%', left: '8.7%'},
        {code: '270', class: '', top: '88.2%', left: '15.3%'},


        //第五层
        {code: '140', class: 'rotate270', top: '31.2%', left: '83%'},
        {code: '141', class: 'rotate270', top: '36.4%', left: '83%'},
        {code: '142', class: 'rotate270', top: '41.5%', left: '83%'},

        {code: '136', class: 'rotate90', top: '26.2%', left: '92%'},
        {code: '137', class: 'rotate90', top: '31.2%', left: '92%'},
        {code: '138', class: 'rotate90', top: '36.4%', left: '92%'},
        {code: '139', class: 'rotate90', top: '41.5%', left: '92%'},


      ],
      //10b7楼座位样式数据 static
      seatBaseInfo10b7:[

        //第一层
        {code: '283', class: 'rotate90', top: '3.8%', left: '51.5%'},
        {code: '284', class: 'rotate90', top: '9.4%', left: '51.5%'},
        {code: '285', class: 'rotate90', top: '15.0%', left: '51.5%'},
        {code: '286', class: 'rotate90', top: '20.6%', left: '51.5%'},
        {code: '287', class: 'rotate90', top: '26.2%', left: '51.5%'},
        {code: '278', class: 'rotate270', top: '3.8%', left: '60%'},
        {code: '279', class: 'rotate270', top: '9.4%', left: '60%'},
        {code: '280', class: 'rotate270', top: '15.0%', left: '60%'},
        {code: '281', class: 'rotate270', top: '20.6%', left: '60%'},
        {code: '282', class: 'rotate270', top: '26.2%', left: '60%'},
        {code: '273', class: 'rotate90', top: '3.8%', left: '68.5%'},
        {code: '274', class: 'rotate90', top: '9.4%', left: '68.5%'},
        {code: '275', class: 'rotate90', top: '15.0%', left: '68.5%'},
        {code: '276', class: 'rotate90', top: '20.6%', left: '68.5%'},
        {code: '277', class: 'rotate90', top: '26.2%', left: '68.5%'},

        //第二层
        {code: '288', class: 'rotate270', top: '16.0%', left: '90.5%'},
        {code: '289', class: 'rotate270', top: '21.2%', left: '90.5%'},
        {code: '290', class: 'rotate270', top: '26.3%', left: '90.5%'},
        {code: '291', class: 'rotate270', top: '31.5%', left: '90.5%'},
        {code: '292', class: 'rotate270', top: '36.7%', left: '90.5%'},
        {code: '293', class: 'rotate270', top: '41.8%', left: '90.5%'},


        //第三层
        {code: '310', class: 'rotate180', top: '38%', left: '22.4%'},
        {code: '309', class: 'rotate180', top: '38%', left: '29.4%'},
        {code: '308', class: 'rotate180', top: '38%', left: '36.4%'},
        {code: '307', class: 'rotate180', top: '38%', left: '43.4%'},
        {code: '306', class: 'rotate180', top: '38%', left: '50.4%'},
        {code: '305', class: 'rotate180', top: '38%', left: '57.4%'},
        {code: '304', class: 'rotate180', top: '38%', left: '64.4%'},
        {code: '303', class: 'rotate180', top: '38%', left: '71.4%'},
        {code: '302', class: 'rotate180', top: '38%', left: '78.4%'},
        {code: '319', class: '', top: '44.8%', left: '22.4%'},
        {code: '318', class: '', top: '44.8%', left: '29.4%'},
        {code: '317', class: '', top: '44.8%', left: '36.4%'},
        {code: '316', class: '', top: '44.8%', left: '43.4%'},
        {code: '315', class: '', top: '44.8%', left: '50.4%'},
        {code: '314', class: '', top: '44.8%', left: '57.4%'},
        {code: '313', class: '', top: '44.8%', left: '64.4%'},
        {code: '312', class: '', top: '44.8%', left: '71.4%'},
        {code: '311', class: '', top: '44.8%', left: '78.4%'},


        {code: '301', class: '', top: '34.5%', left: '26.4%'},
        {code: '300', class: '', top: '34.5%', left: '33.8%'},
        {code: '299', class: '', top: '34.5%', left: '41.2%'},
        {code: '298', class: '', top: '34.5%', left: '48.5%'},
        {code: '297', class: '', top: '34.5%', left: '55.9%'},
        {code: '296', class: '', top: '34.5%', left: '63.3%'},
        {code: '295', class: '', top: '34.5%', left: '70.7%'},
        {code: '294', class: '', top: '34.5%', left: '78.0%'},

        //第4层
        {code: '326', class: 'rotate180', top: '50%', left: '22.4%'},
        {code: '325', class: 'rotate180', top: '50%', left: '30.5%'},
        {code: '324', class: 'rotate180', top: '50%', left: '38.7%'},
        {code: '323', class: 'rotate180', top: '50%', left: '46.8%'},
        {code: '322', class: 'rotate180', top: '50%', left: '55.0%'},
        {code: '321', class: 'rotate180', top: '50%', left: '63.1%'},
        {code: '320', class: 'rotate180', top: '50%', left: '71.3%'},
        {code: '333', class: '', top: '56.6%', left: '22.4%'},
        {code: '332', class: '', top: '56.6%', left: '30.5%'},
        {code: '331', class: '', top: '56.6%', left: '38.7%'},
        {code: '330', class: '', top: '56.6%', left: '46.8%'},
        {code: '329', class: '', top: '56.6%', left: '55.0%'},
        {code: '328', class: '', top: '56.6%', left: '63.1%'},
        {code: '327', class: '', top: '56.6%', left: '71.3%'},
        {code: '340', class: 'rotate180', top: '61.1%', left: '22.4%'},
        {code: '339', class: 'rotate180', top: '61.1%', left: '30.5%'},
        {code: '338', class: 'rotate180', top: '61.1%', left: '38.7%'},
        {code: '337', class: 'rotate180', top: '61.1%', left: '46.8%'},
        {code: '336', class: 'rotate180', top: '61.1%', left: '55.0%'},
        {code: '335', class: 'rotate180', top: '61.1%', left: '63.1%'},
        {code: '334', class: 'rotate180', top: '61.1%', left: '71.3%'},
        {code: '347', class: '', top: '67.6%', left: '22.4%'},
        {code: '346', class: '', top: '67.6%', left: '30.5%'},
        {code: '345', class: '', top: '67.6%', left: '38.7%'},
        {code: '344', class: '', top: '67.6%', left: '46.8%'},
        {code: '343', class: '', top: '67.6%', left: '55.0%'},
        {code: '342', class: '', top: '67.6%', left: '63.1%'},
        {code: '341', class: '', top: '67.6%', left: '71.3%'},
        {code: '354', class: 'rotate180', top: '72.1%', left: '22.4%'},
        {code: '353', class: 'rotate180', top: '72.1%', left: '30.5%'},
        {code: '352', class: 'rotate180', top: '72.1%', left: '38.7%'},
        {code: '351', class: 'rotate180', top: '72.1%', left: '46.8%'},
        {code: '350', class: 'rotate180', top: '72.1%', left: '55.0%'},
        {code: '349', class: 'rotate180', top: '72.1%', left: '63.1%'},
        {code: '348', class: 'rotate180', top: '72.1%', left: '71.3%'},
        {code: '361', class: '', top: '78.5%', left: '22.4%'},
        {code: '360', class: '', top: '78.5%', left: '30.5%'},
        {code: '359', class: '', top: '78.5%', left: '38.7%'},
        {code: '358', class: '', top: '78.5%', left: '46.8%'},
        {code: '357', class: '', top: '78.5%', left: '55.0%'},
        {code: '356', class: '', top: '78.5%', left: '63.1%'},
        {code: '355', class: '', top: '78.5%', left: '71.3%'},
        {code: '368', class: 'rotate180', top: '82.9%', left: '22.4%'},
        {code: '367', class: 'rotate180', top: '82.9%', left: '30.5%'},
        {code: '366', class: 'rotate180', top: '82.9%', left: '38.7%'},
        {code: '365', class: 'rotate180', top: '82.9%', left: '46.8%'},
        {code: '364', class: 'rotate180', top: '82.9%', left: '55.0%'},
        {code: '363', class: 'rotate180', top: '82.9%', left: '63.1%'},
        {code: '362', class: 'rotate180', top: '82.9%', left: '71.3%'},
        {code: '375', class: '', top: '89.3%', left: '22.4%'},
        {code: '374', class: '', top: '89.3%', left: '30.5%'},
        {code: '373', class: '', top: '89.3%', left: '38.7%'},
        {code: '372', class: '', top: '89.3%', left: '46.8%'},
        {code: '371', class: '', top: '89.3%', left: '55.0%'},
        {code: '370', class: '', top: '89.3%', left: '63.1%'},
        {code: '369', class: '', top: '89.3%', left: '71.3%'},

        //第五层
        {code: '377', class: 'rotate180', top: '66.6%', left: '3.4%'},
        {code: '376', class: 'rotate180', top: '66.6%', left: '10.9%'},
        {code: '379', class: '', top: '73%', left: '3.4%'},
        {code: '378', class: '', top: '73%', left: '10.9%'},
        {code: '381', class: 'rotate180', top: '77.1%', left: '3.4%'},
        {code: '380', class: 'rotate180', top: '77.1%', left: '10.9%'},
        {code: '383', class: '', top: '83.2%', left: '3.4%'},
        {code: '382', class: '', top: '83.2%', left: '10.9%'},
        {code: '385', class: 'rotate180', top: '89.1%', left: '3.4%'},
        {code: '384', class: 'rotate180', top: '89.1%', left: '10.9%'},


      ],
      //10b7楼座位样式数据 static
      seatBaseInfo13b5:[
        {code: '386', class: 'rotate180', top: '15.7%', left: '20.2%'},
        {code: '387', class: 'rotate180', top: '15.7%', left: '28.2%'},
        {code: '388', class: 'rotate180', top: '15.7%', left: '36.2%'},
        {code: '389', class: 'rotate180', top: '15.7%', left: '44.2%'},
        {code: '390', class: 'rotate180', top: '15.7%', left: '52.2%'},
        {code: '391', class: 'rotate180', top: '15.7%', left: '60.2%'},
        {code: '392', class: 'rotate180', top: '15.7%', left: '68.2%'},
        {code: '393', class: 'rotate180', top: '15.7%', left: '76.2%'},
        {code: '394', class: 'rotate180', top: '15.7%', left: '84.2%'},
        {code: '395', class: 'rotate180', top: '15.7%', left: '92.2%'},
        {code: '396', class: '', top: '21.7%', left: '20.2%'},
        {code: '397', class: '', top: '21.7%', left: '28.2%'},
        {code: '398', class: '', top: '21.7%', left: '36.2%'},
        {code: '399', class: '', top: '21.7%', left: '44.2%'},
        {code: '400', class: '', top: '21.7%', left: '52.2%'},
        {code: '401', class: '', top: '21.7%', left: '60.2%'},
        {code: '402', class: '', top: '21.7%', left: '68.2%'},
        {code: '403', class: '', top: '21.7%', left: '76.2%'},
        {code: '404', class: '', top: '21.7%', left: '84.2%'},
        {code: '405', class: '', top: '21.7%', left: '92.2%'},
        {code: '406', class: 'rotate180', top: '27.6%', left: '20.2%'},
        {code: '407', class: 'rotate180', top: '27.6%', left: '28.2%'},
        {code: '408', class: 'rotate180', top: '27.6%', left: '36.2%'},
        {code: '409', class: 'rotate180', top: '27.6%', left: '44.2%'},
        {code: '410', class: 'rotate180', top: '27.6%', left: '52.2%'},
        {code: '411', class: 'rotate180', top: '27.6%', left: '60.2%'},
        {code: '412', class: 'rotate180', top: '27.6%', left: '68.2%'},
        {code: '413', class: 'rotate180', top: '27.6%', left: '76.2%'},
        {code: '414', class: 'rotate180', top: '27.6%', left: '84.2%'},
        {code: '415', class: 'rotate180', top: '27.6%', left: '92.2%'},
        {code: '416', class: '', top: '33.6%', left: '20.2%'},
        {code: '417', class: '', top: '33.6%', left: '28.2%'},
        {code: '418', class: '', top: '33.6%', left: '36.2%'},
        {code: '419', class: '', top: '33.6%', left: '44.2%'},
        {code: '420', class: '', top: '33.6%', left: '52.2%'},
        {code: '421', class: '', top: '33.6%', left: '60.2%'},
        {code: '422', class: '', top: '33.6%', left: '68.2%'},
        {code: '423', class: '', top: '33.6%', left: '76.2%'},
        {code: '424', class: '', top: '33.6%', left: '84.2%'},
        {code: '425', class: '', top: '33.6%', left: '92.2%'},
        {code: '426', class: 'rotate180', top: '39.6%', left: '20.2%'},
        {code: '427', class: 'rotate180', top: '39.6%', left: '28.2%'},
        {code: '428', class: 'rotate180', top: '39.6%', left: '36.2%'},
        {code: '429', class: 'rotate180', top: '39.6%', left: '44.2%'},
        {code: '430', class: 'rotate180', top: '39.6%', left: '52.2%'},
        {code: '431', class: 'rotate180', top: '39.6%', left: '60.2%'},
        {code: '432', class: 'rotate180', top: '39.6%', left: '68.2%'},
        {code: '433', class: 'rotate180', top: '39.6%', left: '76.2%'},
        {code: '434', class: 'rotate180', top: '39.6%', left: '84.2%'},
        {code: '435', class: 'rotate180', top: '39.6%', left: '92.2%'},
        {code: '436', class: '', top: '45.6%', left: '20.2%'},
        {code: '437', class: '', top: '45.6%', left: '28.2%'},
        {code: '438', class: '', top: '45.6%', left: '36.2%'},
        {code: '439', class: '', top: '45.6%', left: '44.2%'},
        {code: '440', class: '', top: '45.6%', left: '52.2%'},
        {code: '441', class: '', top: '45.6%', left: '60.2%'},
        {code: '442', class: '', top: '45.6%', left: '68.2%'},
        {code: '443', class: '', top: '45.6%', left: '76.2%'},
        {code: '444', class: '', top: '45.6%', left: '84.2%'},
        {code: '445', class: '', top: '45.6%', left: '92.2%'},
        {code: '446', class: 'rotate180', top: '51.6%', left: '20.2%'},
        {code: '447', class: 'rotate180', top: '51.6%', left: '28.2%'},
        {code: '448', class: 'rotate180', top: '51.6%', left: '36.2%'},
        {code: '449', class: 'rotate180', top: '51.6%', left: '44.2%'},
        {code: '450', class: 'rotate180', top: '51.6%', left: '52.2%'},
        {code: '451', class: 'rotate180', top: '51.6%', left: '60.2%'},
        {code: '452', class: 'rotate180', top: '51.6%', left: '68.2%'},
        {code: '453', class: 'rotate180', top: '51.6%', left: '76.2%'},
        {code: '454', class: 'rotate180', top: '51.6%', left: '84.2%'},
        {code: '455', class: 'rotate180', top: '51.6%', left: '92.2%'},
        {code: '456', class: '', top: '57.6%', left: '20.2%'},
        {code: '457', class: '', top: '57.6%', left: '28.2%'},
        {code: '458', class: '', top: '57.6%', left: '36.2%'},
        {code: '459', class: '', top: '57.6%', left: '44.2%'},
        {code: '460', class: '', top: '57.6%', left: '52.2%'},
        {code: '461', class: '', top: '57.6%', left: '60.2%'},
        {code: '462', class: '', top: '57.6%', left: '68.2%'},
        {code: '463', class: '', top: '57.6%', left: '76.2%'},
        {code: '464', class: '', top: '57.6%', left: '84.2%'},
        {code: '465', class: '', top: '57.6%', left: '92.2%'},
        {code: '466', class: 'rotate180', top: '63.6%', left: '20.2%'},
        {code: '467', class: 'rotate180', top: '63.6%', left: '28.2%'},
        {code: '468', class: 'rotate180', top: '63.6%', left: '36.2%'},
        {code: '469', class: 'rotate180', top: '63.6%', left: '44.2%'},
        {code: '470', class: 'rotate180', top: '63.6%', left: '52.2%'},
        {code: '471', class: 'rotate180', top: '63.6%', left: '60.2%'},
        {code: '472', class: 'rotate180', top: '63.6%', left: '68.2%'},
        {code: '473', class: 'rotate180', top: '63.6%', left: '76.2%'},
        {code: '474', class: 'rotate180', top: '63.6%', left: '84.2%'},
        {code: '475', class: 'rotate180', top: '63.6%', left: '92.2%'},
        {code: '476', class: '', top: '69.6%', left: '20.2%'},
        {code: '477', class: '', top: '69.6%', left: '28.2%'},
        {code: '478', class: '', top: '69.6%', left: '36.2%'},
        {code: '479', class: '', top: '69.6%', left: '44.2%'},
        {code: '480', class: '', top: '69.6%', left: '52.2%'},
        {code: '481', class: '', top: '69.6%', left: '60.2%'},
        {code: '482', class: '', top: '69.6%', left: '68.2%'},
        {code: '483', class: '', top: '69.6%', left: '76.2%'},
        {code: '484', class: '', top: '69.6%', left: '84.2%'},
        {code: '485', class: '', top: '69.6%', left: '92.2%'},
        {code: '486', class: 'rotate180', top: '75.3%', left: '20.2%'},
        {code: '487', class: 'rotate180', top: '75.3%', left: '28.2%'},
        {code: '488', class: 'rotate180', top: '75.3%', left: '36.2%'},
        {code: '489', class: 'rotate180', top: '75.3%', left: '44.2%'},
        {code: '490', class: 'rotate180', top: '75.3%', left: '52.2%'},
        {code: '491', class: 'rotate180', top: '75.3%', left: '60.2%'},
        {code: '492', class: 'rotate180', top: '75.3%', left: '68.2%'},
        {code: '493', class: 'rotate180', top: '75.3%', left: '76.2%'},
        {code: '494', class: 'rotate180', top: '75.3%', left: '84.2%'},
        {code: '495', class: 'rotate180', top: '75.3%', left: '92.2%'},
        {code: '496', class: '', top: '81.3%', left: '20.2%'},
        {code: '497', class: '', top: '81.3%', left: '28.2%'},
        {code: '498', class: '', top: '81.3%', left: '36.2%'},
        {code: '499', class: '', top: '81.3%', left: '44.2%'},
        {code: '500', class: '', top: '81.3%', left: '52.2%'},
        {code: '501', class: '', top: '81.3%', left: '60.2%'},
        {code: '502', class: '', top: '81.3%', left: '68.2%'},
        {code: '503', class: '', top: '81.3%', left: '76.2%'},
        {code: '504', class: '', top: '81.3%', left: '84.2%'},
        {code: '505', class: '', top: '81.3%', left: '92.2%'},

      ],
      //end of 基础数据

      curSelectCode: -1
    }
  },
  methods: {

    getSilderSty(id){
      return {
        'active-bg': this.floorSelect == id
      }
    },

    getTheHitPostion(theClassSty) {
      if( theClassSty == ""){
        return "right";
      } else if( theClassSty == "rotate90")  {
        return "left";
      } else if( theClassSty == "rotate180")  {
        return "top";
      } else if( theClassSty == "rotate270")  {
        return "right";
      }
    },

    getRateSty(item) {
      var classes = {
        'selected':this.curSelectCode == item.code
      }
      classes[item.class] = true;
        return classes;
    },
    getDeptSty(dept_id) {
      return {backgroundImage: `url('/srs/static/status/${dept_id}-0.png')`};
    },
    getSeatSty(item) {
      const that = this;
      let code = item.code;

      let seat = that.getSeatInfo(code);

      let codes = that.curSelectSeats.codes;

      let is = false;
      let bgcUrl = null;

      for(let i=0; i<codes.length; i++) {
        if (item.code == codes[i]) {
          bgcUrl = "/srs/static/status/icon_select.png";
          is = true;
          break;
        }
      }

      if (!is) {
        if (seat.typeCode == 2) {
          bgcUrl='/srs/static/status/web_public-seat.png';
        }  else {
          bgcUrl = '/srs/static/status/'+seat.departmentCode+'-'+seat.typeCode+'.png';
        }
      }

      let obj = {
        backgroundImage: `url('${bgcUrl}')`,
        top: item.top,
        left: item.left
      }
      return obj;
    },

    getSeatInfo(code) {
      const that = this;
      for(let i=0; i<that.floorData.length; i++) {
        let tSeat = that.floorData[i];
        if (tSeat.code == code) {
          return tSeat;
        }
      }
    },

    checkHint() {
      const that = this;
      that.dialogHint.ctge = false;
      that.dialogHint.dept = false;
      let res = true;

      if (that.dialogVisible) {
        if (that.curSelectSeats.typeCode == "") {
          that.dialogHint.ctge = true;
          res = false;
        }
        if (that.curSelectSeats.departmentCode == "" && that.curSelectSeats.typeCode != "2") {
          that.dialogHint.dept = true;
          res = false;
        }
      }
      return res;
    },

    clearSelectSeatsData() {
      const that = this;
      that.curSelectSeats.codes=[];
      that.curSelectSeats.typeCode="";
      that.curSelectSeats.departmentCode = "";
    },

    //用户事件
    whenUserClickTheEditButton() {
      const that = this;

      that.clearSelectSeatsData();

      if(that.editSeat == false) {
        that.editSeat = true;
        // that.editSeatHintMsg = "取消编辑";
      } else{
        that.editSeat = false;
        // that.editSeatHintMsg = "开始编辑";
      }
    },

    whenUserClickTheUpdateButton() {
      const that = this;
      //如果没有点击开始编辑则 警告提示 exit
      if (that.editSeat == false) {
        that.suces("请点击“开始编辑”按钮后选择想更改的座位");
      } else { //显示弹窗

        if (that.curSelectSeats.codes.length > 0) {
          that.dialogVisible = true
        } else {
          that.warig("请先选好座位在点击更改哦!")
        }

      }
    },

    whenUserClickTheSeat(item) {
      const that = this;
      //if user not start edit => hint

      if (that.editSeat == true) {
        let codes = that.curSelectSeats.codes;
        let idx = -1;
        for(let i=0; i<codes.length; i++){
          if (codes[i] == item.code) {
            idx = i;
            break;
          }
        }

        if (idx > -1) {
          that.curSelectSeats.codes.splice(idx, 1);
        } else {
          that.curSelectSeats.codes.push(item.code);
        }

      } else {
          this.curSelectCode = item.code;
        // request 预定数据 from server
        that.loadTheReservationStaff(item);
        //弹出提示：预定人信息

        // if (item.class == "rotate180") {
        //   console.log(item.class)
        //   document.getElementsByClassName("el-popover el-popper")[0].classList.add("my-popo-rotate180");
        // } else if (item.class == "rotate90") {
        //   document.getElementsByClassName("el-popover el-popper")[0].classList.add("my-popo-rotate90");
        // } else  if (item.class == "rotate270"){
        //   document.getElementsByClassName("el-popover el-popper")[0].classList.add("my-popo-rotate270");
        // }

      }

    },

    whenUserClickTheDialogSaveButton() {
      const that = this;

      if (that.checkHint()) {
        //提交数据
        that.saveTheSeatConfig();

      }
    },

    whenUserClickTheFloorButton(id) {
      const that = this;
      that.loadTheSpecificFloorData(id);
    },

    //get data from server
    /***
     *
     * 在created
     */
    loadTheFloorData() {
      const that = this;
      pcApi.getFloorList({}).then(res => {
        let tt = res.result;
        if (tt && tt.length < 1) {
          that.error("出错: 没有楼层数据")
        } else {
          that.floorListData = tt;
          // that.floorSelect = that.floorListData[0].code;

          //加载指定的楼层数据
          that.loadTheSpecificFloorData(that.floorListData[0].code);
        }

      }).catch(err => {
        console.error(err);
        that.error("出错: 网络请求-楼层数据-失败")
      })
    },

    /***
     *
     * 在created
     */
    loadTheSeatTypeList() {
      const that = this;
      pcApi.getSeatTypeList().then(res => {
        let tt = res.result;
        if (tt && tt.length < 1) {
          that.error("出错: 没有座位类型数据")
        } else {
          let tt2 = [];
          for(let i=0; i<tt.length; i++) {
            let tvar = {value: tt[i].code, label: tt[i].name}
            tt2.push(tvar)
          }
          that.seatCategoryInfos = tt2;
        }
      }).catch(err => {
        that.error("出错: 网络请求-座位类型数据-失败")
      })
    },

    /***
     *
     * 在created
     */
    loadTheDepartmentList() {
      //获取所有部门数据
      const that = this;
      pcApi.getDepartmentList().then(res => {
        let tt = res.result;
        if (tt && tt.length < 1) {
          that.error("出错: 没有座位类型数据")
        } else {
          that.deptInfos = tt;
        }
      }).catch(err => {
        that.error("出错: 网络请求-部门数据-失败")
      })
    },

    /**
     * 加载情况:
     *  1. 在加载完毕所有楼层数据后加载
     *  2.在管理员提交数据时,从新刷新时
     */
    loadTheSpecificFloorData(floorSelect) {
      const that = this;
      pcApi.getFloorData({code: floorSelect}).then(res => {
        let tt = res.result;
        if (tt && tt.length < 1) {
          that.error("出错: 没有指定的楼层数据")
        } else {
          that.floorData = tt;

          that.floorSelect = floorSelect;
        }
      }).catch(err => {
        that.error("出错: 网络请求-获取指定的楼层数据-失败")
      })
    },

    /***
     *
     * 在用户点击座位时
     */
    loadTheReservationStaff(item) {
      const that = this;
        pcApi.getReservationStaff({selectDate: that.filterDate, code: item.code}).then(res => {
          let tt = res.result;
          if (tt && tt.no == undefined) {
            // that.warig("该预定人信息不存在");
            // that.seatReservedHintInfo = "无数据"
            that.haveTheReservedPersonInfo = false;
          } else {
            that.haveTheReservedPersonInfo = true;
            that.reservedPersonInfo = tt;

            //that.seatReservedHintInfo = tt.no+"-"+tt.userName+"-"+tt.departmentName;
          }

          let code = item.code;
          console.log(code);
          let x = document.getElementById(code);
          let x1 = x.firstChild.firstChild;



          if (item.class == "rotate180") {
            console.log(item.class)
            x1.classList.add("my-popo-rotate180");
            // document.getElementsByClassName("el-popover el-popper")[0].classList.add("my-popo-rotate180");
            // document.getElementById(item.code).firstChild.firstChild.classList.add("my-popo-rotate180");
          } else if (item.class == "rotate90") {
            // document.getElementsByClassName("el-popover el-popper")[0].classList.add("my-popo-rotate90");
            // document.getElementById(item.code).firstChild.firstChild.classList.add("my-popo-rotate90");
            x1.classList.add("my-popo-rotate90");

          } else  if (item.class == "rotate270"){
            // document.getElementsByClassName("el-popover el-popper").classList.add("my-popo-rotate270");
            // document.getElementById(item.code).firstChild.firstChild.classList.add("my-popo-rotate270");
            x1.classList.add("my-popo-rotate270");
          } else {
            x1.classList.add("my-popo-rotate");
          }

        }).catch(err => {
          // that.error("出错: 加载预定个人信息")
          that.haveTheReservedPersonInfo = false;
          // that.seatReservedHintInfo = "无数据"



        })
    },

    /**
     * 在用户点击保存时
     */
    saveTheSeatConfig() {
      const that = this;
      pcApi.saveSeatConfig(that.curSelectSeats).then(res => {
        let tt = res.result;
        if (tt && tt.value == 0) {
          that.suces("成功: 保存信息成功");
          that.loadTheSpecificFloorData(that.floorSelect); //从新加载楼层数据

          that.dialogVisible = false
          that.clearSelectSeatsData();
          that.editSeat = false; //取消编辑

        } else {
          that.error("出错: 保存-数据-失败")
        }
      }).catch(err => {
        that.error("出错: 网络请求-提交座位信息-失败")
      })
    },

    //waring
    alert(text) {
      this.$message(text);
    },
    suces(text) {
      this.$message({
        message: text,
        type: 'success'
      });
    },
    warig(text) {
      this.$message({
        message: text,
        type: 'warning'
      });
    },
    error(text) {
      this.$message.error(text);
    }
  },
  watch: {
    'curSelectSeats.typeCode' () {
      const that = this;
      this.checkHint();
      let x = that.curSelectSeats.typeCode;
      if (x == 2) {
        that.disableTheSelectDept = true;
        that.curSelectSeats.departmentCode = "";
        that.disableTheSelectDeptShowMsg = "公共座位";
      } else {
        that.disableTheSelectDept = false;
        that.curSelectSeats.departmentCode = "";
        that.disableTheSelectDeptShowMsg = "请选择座位类别";
      }

    },
    'curSelectSeats.departmentCode' () {
      this.checkHint();
    },
    filterDateShow: function ( ) {
        this.filterDate = ymsUtil.fmtDate(this.filterDateShow);
        this.loadTheSpecificFloorData(this.floorSelect);
    },
    floorSelect: function ( ) {
        this.editSeat = false;
        this.clearSelectSeatsData();
    },
    editSeat: function () {
        if (this.editSeat == false) {
          this.editSeatHintMsg = "开始编辑";
        } else {
          this.editSeatHintMsg = "取消编辑";
        }
    }

  },
  created () {
    const that = this;
    that.loadTheFloorData();
    that.loadTheSeatTypeList();
    that.loadTheDepartmentList();
  }
}
</script>

<style lang="less" scoped>
  /*/deep/.el-popper[x-placement^="right"] .popper__arrow {*/
  /*  left: -8px;*/
  /*}*/
  /*/deep/.el-popper[x-placement^="right"] .popper__arrow::after {*/
  /*  border-right-color: #010101;*/
  /*  border-width: 8px 8px 8px 0;*/
  /*  bottom: -8px;*/
  /*}*/


  /*/deep/ .my-popo-rotate{*/
  /*  left: 11px !important;*/
  /*}*/

  /*/deep/ .my-popo-rotate180 {*/
  /*  transform: rotate(180deg);*/
  /*  top: -28px !important;*/
  /*}*/

  /*/deep/ .my-popo-rotate90 {*/
  /*  transform: rotate(270deg);*/
  /*  left: -88px !important;*/
  /*}*/

  /*/deep/ .my-popo-rotate270 {*/
  /*  transform: rotate(90deg);*/
  /*  left: 6px !important;*/
  /*}*/

  /deep/.el-popover {
    min-width: 80px;
  }
  /deep/.el-popover--plain {
    padding: 10px 10px;
  }
  .tip-hint-sty {
    font-size: 0.8rem;
  }

  .my-popo /deep/ .el-popover {
    min-width: 30px;
  }

  .selected {
    z-index: 4000;
  }

  .clear{
    clear:both;
  }
  .my-dialog-hit {
    color: red;
    float: left;
    margin-left: 109px;
  }

  .my-dialog-sty /deep/ .el-dialog {
    margin-top: 30vh !important;
  }

  .choosesty-opt {
    width: 235px;
  }

  .choosesty {
    margin-top: 1rem;
    font-size: 1rem;
  }





  .user-seat {
    /*background-image: url('../assets/images/icon_1.png');*/
    background-repeat: no-repeat;
    width: 5%;
    height: 5%;
    background-size: 100%;
    position: absolute;
  }

  //旋转效果
  .user-seat.rotate90 {
    transform: rotate(90deg);
  }

  .user-seat.rotate270 {
    transform: rotate(270deg);
  }

  .user-seat.rotate180 {
    transform: rotate(180deg);
  }

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
          box-sizing: border-box;
          padding-top: 7%;
          font-size: 1rem;

        }
      }
    }

    .body {
      text-align: center;
      background-color: #fff;
      height: 1000px;

      .header {
        width: 100%;
        height: 70px;
        position: relative;
        font-size: 1.1rem;
        border-bottom: 1px solid #00AFAA;
        font-size: 1.1rem;

        .header-left , .header-right {
          position: absolute;//子元素绝对定位
          /*width: 20%;*/
          height: 100%;
        }
        .header-left {
          margin-top:1px;
          box-sizing: border-box;
          padding-top: 13px;
          margin-left: 20px;
          color: #00afa5;

          .header-left-date-sty {
            margin-left: 6px;
          }

          .header-left-date-sty /deep/ .el-input__inner {
            border: 1px solid #C3EFF4;
            /*border-radius: 10px;*/
            color: #00afa5;
            padding-left: 5%;
            width: 290px;

          }

          .header-left-date-sty /deep/ .el-input__prefix {
            color: #00afa5;
            font-size: 1.2rem;
            margin-left: 115%;
          }

        }

        .header-right {
          right: 0;//设置left为左边盒子的宽度
          .header-right-bt  {
            margin-left: 30px;
            margin-right: 30px;
            margin-top: 17px;

            display: inline-block;
            height: 35px;
            width: 100px;
            padding-top: 5px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            background-color: #00AFAA;
            color: white;
            border-radius: 5px;
          }

        }
      }

      .body-content {
        margin-top: 10px;
        min-width: 1130px;

        .body-content-left {
          float: left;
          .hint-1 {
            margin-top: 3rem;
            .body-content-left-seatctf {
              display: inline-block;
              height: 2.2rem;
              background-size: 2.2rem;
              background-repeat: no-repeat;
              margin-left: 25px;
              background-position: center;
              float: left;
              font-size: 1rem;
              padding-top: 50px;
              background-position-x: 8px;
              box-sizing: border-box;
            }
          }

          .hint-2 {
            margin-top: 10rem;
            margin-left: 2.5rem;
            .body-content-left-seatdept {
              height: 2rem;
              background-size: 2rem;
              background-repeat: no-repeat;
              font-size: 0.8rem;
              text-align: left;
              padding-left: 40px;
              padding-top: 8px;

            }
          }

        }

        .body-content-right {
          background-color: orange;
          margin-left: 400px;
          width: 700px;

          .chooseseat {
            position: relative;
            .chooseseat-floor {
              position: absolute;
              height: 807px;
              width: 101%;

              height: 806px;
              width: 100%;

              background-repeat: no-repeat;
              background-size: 100%;
              margin-left: -1px;
            }
          }


        }

      }


    }
  }


  //座位布局图
  .choosearea-10B5 {
    background-image: url('../../assets/image/seat/bg-10B-5.png');

  }

  .choosearea-10B6 {
    background-image: url('../../assets/image/seat/bg-10B-6.png');
  }

  .choosearea-10B7 {
    background-image: url('../../assets/image/seat/bg-10B-7.png');
  }

  .choosearea-13B5 {
    background-image: url('../../assets/image/seat/bg-13B-5.png');
  }


  //座位所属 -----------------------------------------------------------------
  /*.belongto-market-ctr { //市场及供应链中心*/
  /*  background-image: url("../../assets/image/seat/icon_market-ctr.png");*/
  /*}*/

  /*.belongto-mane-ctr { //战略管理*/
  /*  background-image: url("../../assets/image/seat/icon_stra-mane-ctr.png");*/
  /*}*/

  /*.belongto-f-sales-ctr {*/
  /*  background-image: url("../../assets/image/seat/icon_f-sales-ctr.png");*/
  /*}*/

  /*.belongto-product-ctr { //产品中心*/
  /*  background-image: url("../../assets/image/seat/icon_product-ctr.png");*/
  /*}*/

  /*.belongto-h-sales-ctr {*/
  /*  background-image: url("../../assets/image/seat/icon_h-sales-ctr.png");*/
  /*}*/

  /*.belongto-BTL-ctr { //线下*/
  /*  background-image: url("../../assets/image/seat/icon_BTL-ctr.png");*/
  /*}*/

  /*.belongto-ip-ctr { //内控*/
  /*  background-image: url("../../assets/image/seat/icon_ip-ctr.png");*/
  /*}*/

  /*.belongto-cw-ctr {*/
  /*  background-image: url("../../assets/image/seat/icon_cw-ctr.png");*/
  /*}*/

  /*.belongto-it-ctr {*/
  /*  background-image: url("../../assets/image/seat/icon_it-ctr.png");*/
  /*}*/

  /*.belongto-hr-ctr {*/
  /*  background-image: url("../../assets/image/seat/icon_hr-ctr.png");*/
  /*}*/

  /*.belongto-law-ctr {*/
  /*  background-image: url("../../assets/image/seat/icon_law-ctr.png");*/
  /*}*/


  //座位类型 -----------------------------------------------------------------
  .seatctf1 {
    background-image: url("../../assets/image/seat/web_fix-seat.png");
  }

  .seatctf2 {
    background-image: url("../../assets/image/seat/web_flexible-seat.png");
  }

  .seatctf3 {
    background-image: url("../../assets/image/seat/web_public-seat.png");
  }




  .active-bg {
    background-color: #9BE8EC;
    border-left: 12px solid #00AFAA;

    /*background-color:rgba(55,210,218,0.7);*/
    height: 4rem;
  }

  /*.active-bg {*/
  /*  height: 4rem;*/
  /*  width: 40px;*/
  /*  height: 4rem;*/
  /*  background-color: #00AFAA;*/
  /*}*/



</style>
