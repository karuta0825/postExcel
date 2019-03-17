function isNull(value) {
  return !value || value === '';
}

/**
 *
 * @param {string?} old
 * @param {sting?} new
 * */
function isDiff(oldValue, newValue) {
  if (isNull(oldValue) && isNull(newValue)) {
    return false;
  }
  return oldValue != newValue;
}

function createDiffList({
  kids_id, content_name, convertTable, create_user_id, oldObj, newObj,
}) {
  const list = Object.keys(newObj)
    .map((key) => {
      if (isDiff(oldObj[key], newObj[key])) {
        const item_name = convertTable[key];
        return {
          kids_id,
          type: '更新',
          content_name,
          item_name,
          before: oldObj[key],
          after: newObj[key],
          create_on: new Date(),
          create_user_id,
        };
      }
      return null;
    })
    .filter(v => v);
  return list;
}

module.exports = {
  isDiff,
  createDiffList,
};
