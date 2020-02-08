module.exports = {
  serialize: ({ id, sub_id }) => {
    return sub_id === null || sub_id === undefined
      ? `${id}`
      : `${id}:${sub_id}`;
  }
};
