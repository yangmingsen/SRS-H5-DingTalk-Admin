export const eleMessage ={
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

}
