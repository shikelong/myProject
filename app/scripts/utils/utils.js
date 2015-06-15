'use strict'


/**
 * [flattenNestObjectArray 去除对象数组嵌套]
 * @param  {[object]} objArray [nest object array]
 * @return {[flated object]}          [对象数组]
 * @author shikelong
 * @date time: 2015-6-2 11:21:39
 */
function flattenNestObjectArray(objArray) {
    var resultArr = [];
    if (objArray.length) {
        _.forEach(objArray, function(item) {
            resultArr.push(flattenCustom(item, {
                safe: true
            }));
        });
    } else {
        resultArr.push(flattenCustom(objArray, {
            safe: true
        }));
    }

    return resultArr;
}
