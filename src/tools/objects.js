const isObjectEmpty = (object) => {
  return !object || Object.keys(object).length === 0
}

module.exports = {
  isObjectEmpty
}
