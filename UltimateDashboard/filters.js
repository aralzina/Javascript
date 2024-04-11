/**
 *
 * @param {Array} arr initial array
 * @param {*} element element to be removed
 * @returns {Array} array with element removed
 */
function removeElement (arr, element) {
  // get index number
  let index = arr.indexOf(element)

  // delete the item
  delete arr[index]

  //rebuild the array
  let temp = new Array()
  arr.forEach(ele => {
    if (typeof ele !== undefined) {
      temp.push(ele)
    }
  })

  //sort the array
  temp.sort((a, b) => {
    return a < b ? -1 : a > b ? 1 : 0
  })

  //return the new array
  return temp
}

/**
 *
 * @param {Array} arr initial array
 * @param {*} element element to be added
 * @returns {Array} the initial array
 */
function addElement (arr, element) {
  // add the element
  arr.push(element)

  //sort the array
  arr.sort((a, b) => {
    return a < b ? -1 : a > b ? 1 : 0
  })

  // return the initial array
  return arr
}
