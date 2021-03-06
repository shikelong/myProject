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


/**
 * [validation 校验方法集合]
 * @type {Object} */
var validation = {

    email: function(value) {
        if (!value.match(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)) {
            throw new Error('你输入的邮箱地址不合法!');
        }
    },
    telphone: function(value) {
        if (!value.match(/\d{3}-\d{8}|\d{4}-\d{7}|\d{11}/)) {
            throw new Error('你输入的电话号码不合法!');
        }
    },
    firstName: function(value) {
        //zh-cn 1-2
        if (value.match(/^[\u4E00-\u9FA5]+$/)) {
            if (value.length > 2 || value.length < 1) {
                throw new Error('名字只能包含1-2位中文字符或者1-30个英文字符');
            }
        } else if (value.match(/^[A-Za-z]+$/)) {
            if (value.length > 30 || value.length < 1) {
                throw new Error('名字只能包含1-2位中文字符或者1-30个英文字符');
            }
        } else {
            throw new Error('名字只能包含1-2位中文字符或者1-30个英文字符');
        }
    },
    lastName: function(value) {
        //zh-cn 1-2
        if (value.match(/^[\u4E00-\u9FA5]+$/)) {
            if (value.length > 2 || value.length < 1) {
                throw new Error('姓氏只能包含1-2位中文字符或者1-30个英文字符');
            }
        }
        //en-us 1-30
        else if (value.match(/^[A-Za-z]+$/)) {
            if (value.length > 30 || value.length < 1) {
                throw new Error('姓氏只能包含1-2位中文字符或者1-30个英文字符');
            }
        } else {
            throw new Error('姓氏只能包含1-2位中文字符或者1-30个英文字符');
        }
    },
    password: function(value) {
        if (!value.match(/^[a-zA-Z0-9~!@#$%^&*()_+=-]+$/)) {
            throw new Error('密码应该由数字,字母和~!@#$%^&*()_+=-组成!');
        }

        if (document.querySelector('#password_conf').value !== document.querySelector('#password').value) {
            throw new Error('密码和确认密码应相等！');
        }

    }
}

/**
 * [truncate dashboard配置使用]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
function truncate(value) {
    if (!value) {
        return '';
    }

    return value.length > 50 ? value.substr(0, 50) + '...' : value;
}

/**
 * [objArrayCustom 对象数组相关的自定义方法]
 * @type {Object}
 */
var objArrayCustom = {

    objectArrValueRemain: function(objArr, remainAttr, remainArr) {
        var resultArr = [];
        objArr.forEach(function(value, index) {
            if (remainArr.indexOf(value["_" + remainAttr]) !== -1) {
                resultArr.push(value);
            }
        });
        return resultArr;
    },
    //根据参数和属性值从对象数组中删除元素
    objectArrValueDelete: function(objArr, delAttr, delArr) {
        var resultArr = [];
        objArr.forEach(function(value, index) {
            if (delArr.indexOf(value["_" + delAttr]) == -1) {
                resultArr.push(value);
            }
        });
        return resultArr;
    }
};


var customButtons={
   
   //action button
   list:'<ma-list-button ng-if=::entity.listView().enabled label="列表" entity=::entity></ma-list-button>',
   delete:function(label){ return '<ma-delete-button label="删除" ng-if="::entity.deletionView().enabled" entry="::entry" entity="::entity" ></ma-delete-button>';          },
   show:function(label){ return '<ma-show-button label="查看" entry="::entry" entity="::entity"></ma-show-button>';          },
   create:function(label){ return '<ma-create-button entity="::entity" label="'+label+'"></ma-create-button>';},
   edit:function(label){ return '<ma-edit-button label="编辑" ng-if="::entity.editionView().enabled" entry="::entry" entity="::entity" ></ma-edit-button>'; },
   exportCvs:'<ma-export-to-csv-button  datastore=datastore entity=entity search=search label="导出表格"></ma-export-to-csv-button>',
   //buttons in grid
   showXz:'<ma-show-button label="查看" entry="::entry" entity="::entity" size="xs"></ma-show-button>',
   editXz:'<ma-edit-button label="编辑" ng-if="::entity.editionView().enabled" entry="::entry" entity="::entity" size="xs"></ma-edit-button>',
   deleteXz:'<ma-delete-button label="删除" ng-if="::entity.deletionView().enabled" entry="::entry" entity="::entity" size="xs"></ma-delete-button>'
}

