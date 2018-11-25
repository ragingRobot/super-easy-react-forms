export default {
  /**
   * Require string to be all numbers
   */
  NUMBER: value => {
    return /^[0-9]*$/.test(value);
  },

  /**
   * Require string to be text only
   */
  TEXT: value => {
    return /^[a-zA-Z ]*$/.test(value);
  }
};
