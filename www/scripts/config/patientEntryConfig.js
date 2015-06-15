/**
 * [patientViewConfig patient module ng-admin view config function]
 * @param  {[object]} nga [NgAdminConfigurationProvider object]
 * @return {[object]}     [ng-admin.entity]
 * @shikelong 2015-6-3 16:35:20
 */
function patientViewConfig(nga) {
    // define an entity mapped 
    var patient = nga.entity('patient')
        .identifier(nga.field('id'))
        .label('病人管理')
        .url(function(entityName, viewType, identifierValue, identifierName) {
            if (viewType == "DeleteView"||viewType=="ShowView"||viewType=="EditView") {
                return entityName + "/" + identifierValue+"/";
            } else {
                return entityName + "/";
            }
        });

    patient.listView()
        .title('病人管理') // default title is "[Entity_name] list"
        .description('病人信息列表') // description appears under the title
        .infinitePagination(true) // load pages as the user scrolls
        .fields([
            nga.field('id').label('ID').label('用户编号'),
            nga.field('username').label('用户名'),
            nga.field('first_name').label('名字'),
            nga.field('last_name').label('姓氏'),
            nga.field('gender').label('性别'),
            nga.field('phone').label('电话号码'),
            nga.field('credits').label('信用'),
            nga.field('language').label('语言'),
            nga.field('dob', 'date').label('生日'),
            nga.field('email').label('邮箱'),
            nga.field('referee'),
            nga.field('illness').label('疾病'),
            nga.field('purpose').label('目的'),
            nga.field('treat_in_america').label('是否在美治疗')

        ])
        .listActions(['show','edit', 'delete'])
        .filters([
            nga.field('username', 'string').label('').attributes({
                'placeholder': '请输入用户名进行搜索'
            })
            .validation({
                maxlength: 30
            }),
            nga.field('email', 'string').label('').attributes({
                'placeholder': '请输入邮箱进行搜索'
            })

        ]);

    patient.creationView()
        .title('创建病人账户')

    .description('输入信息创建病人账户，其中带*号的为必填项目。')
        .fields([
            nga.field('username').label('用户名') // the default edit field type is "string", and displays as a text input
            .validation({
                required: true,
                minlength: 1,
                maxlength: 30
            }),
            nga.field('email').label('电子邮箱')
            .validation({
                required: false,
                validator: function(value) {
                    if (value.indexOf('@') == -1) return false;
                }
            }),
            nga.field('last_name').label('姓氏')
            .validation({
                required: true,
                maxlength: 15
            }),
            nga.field('first_name').label('名字')
            .validation({
                required: true,
                maxlength: 15
            }),
            nga.field('dob', 'date').label('出生日期')
            .validation({
                required: true
            }),
            nga.field('password').label('密码')
            .validation({
                required: true,
                minlength: 6,
                maxlength: 15
            }),
            nga.field('password_conf').label('确认密码')
            .validation({
                required: true,
                minlength: 6,
                maxlength: 15
            }),
            nga.field('phone').label('电话号码')
            .validation({
                required: true,
                maxlength: 20
            }),
            nga.field('gender', 'choice').label('性别')
            .validation({
                required: true
            })
            .choices([{
                label: '男',
                value: 'm'
            }, {
                label: '女',
                value: 'f'
            }]),
            nga.field('language', 'choice').label('语言')
            .validation({
                required: true
            })
            .choices([{
                label: '英语',
                value: 'en-us'
            }, {
                label: '中文',
                value: 'zh-cn'
            }]),
        ]);

    patient.editionView()
        .title('编辑病人信息') //"{{ entry.values }}" 
        .actions(['list', 'show', 'delete'])
        .fields([
            patient.creationView().fields()
        ]);

    patient.showView()
        .title('病人信息详情')
        .fields([
            nga.field('id'),
            patient.editionView().fields()
        ]);

    return patient;
}



// {
//     "first_name": [
//         "名只能包含1-2位中文字符或者1-30个英文字符"
//     ],
//     "username": [
//         "这个字段是必须的"
//     ],
//     "password": [
//         "密码长度为 6-15 只能包含字母数字和~!@#$%^&*()_+=-"
//     ],
//     "last_name": [
//         "名只能包含1-2位中文字符或者1-30个英文字符"
//     ],
//     "phone": [
//         "带有区号的座机号或者手机号码，例如 0293-8888888，13888888888"
//     ],
//     "password_conf": [
//         "密码长度为 6-15 只能包含字母数字和~!@#$%^&*()_+=-"
//     ],
//     "language": [
//         "“22112” 不是合法选项。"
//     ]
// }
