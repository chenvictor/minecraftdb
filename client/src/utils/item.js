module.exports = {
  serialize: ({ id, sub_id }) => {
    return sub_id
      ? `${id}:${sub_id}`
      : `${id}`;
  }
};
