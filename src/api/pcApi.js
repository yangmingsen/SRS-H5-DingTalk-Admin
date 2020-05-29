import http from '@galaplat/utils/lib/common/service'
export const pcApi = {

  /***
   *PC端查询楼层信息 http://showdoc.esrcloud.com/index.php?s=/2&page_id=1433
   * @param params
   * @returns {Promise<*>}
   */
  async getFloorList (params) {
    try {
      const result = await http.get("pc/storey/list", params);
      return result.data;
    } catch (e) {
      return {}
    }
  },

  /***
   * PC端查询预定员工信息 http://showdoc.esrcloud.com/index.php?s=/2&page_id=1434
   *
   * {selectDate: 'yyyy-mm-dd', code: '座位唯一编码'}
   *
   * @param params
   * @returns {Promise<*>}
   */
  async getReservationStaff(params) {
    const res = await http.get("pc/reservation/getReservationStaff", params);
    return res.data;
  },

  /***
   * PC端查询座位布局图 http://showdoc.esrcloud.com/index.php?s=/2&page_id=1435
   *
   *  params {code: '	楼层唯一编码'}
   *
   * @param
   * @returns {Promise<void>}
   */
  async getFloorData(params) {
    const result = await http.get("pc/seat/list", params);
    return result.data;
  },

  /***
   * PC端查询座位类别信息
   * @param params
   * @returns {Promise<*>}
   */
  async getSeatTypeList(params) {
    const result = await http.get("pc/seat/listType", params);
    return result.data;

  },

  /***
   *PC端查询部门信息
   * @param params
   * @returns {Promise<*>}
   */
  async getDepartmentList(params) {
    const result = await http.get("pc/department/list", params);
    return result.data;
  },

  /***
   * PC端修改座位信息
   * {codes: [1,2,3], typeCode: '0', departmentCode: '2342343'}
   * @param params
   * @returns {Promise<*>}
   */
  async saveSeatConfig(params) {
    const result = await http.post("pc/seat/updateSeat", params);
    return result.data;
    },


}
