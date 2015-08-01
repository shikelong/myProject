/**
 * [doctorViewConfig description]
 * @param  {[type]} nga [description]
 * @return {[type]}     [description]
 * @shikelong 2015-6-3 23:07:18
 */
function doctorViewConfig(nga) {

    // define an entity mapped 
    var doctor = nga.entity('doctor')
        .identifier(nga.field('id'))
        .label('医生管理')
        .url(function(entityName, viewType, identifierValue, identifierName) {
            if (viewType == "DeleteView" || viewType == "ShowView" || viewType == "EditView") {
                return entityName + "/" + identifierValue + "/";
            } else {
                return entityName + "/";
            }
        });

    /*doctor.updateMethod('PATCH');*/

    doctor.dashboardView()
        .title('医生信息列表')
        .order(1) // display the post panel first in the dashboard
        .perPage(5) // limit the panel to the 5 latest posts
        .fields([nga.field('username').isDetailLink(true).map(truncate).label('用户名'),
            nga.field('hospital').label('医院'), nga.field('department').label('科室'),
            nga.field('phone').label('电话号码')
        ]);

    doctor.listView()
        .title('医生管理') // default title is "[Entity_name] list"
        .description('医生信息列表') // description appears under the title
        .infinitePagination(true) // load pages as the user scrolls
        .actions(['<ma-export-to-csv-button entity="::entity" label="导出表格"></ma-export-to-csv-button>','<ma-create-button entity="::entity" label="创建医生"></ma-create-button>'])
        .fields([
            nga.field('id').label('用户编号'),
            nga.field('username').label('用户名'),
            nga.field('first_name').label('名字'),
            nga.field('last_name').label('姓氏'),
            nga.field('gender').label('性别'),
            nga.field('phone').label('电话号码'),
            nga.field('credits').label('信用'),
            nga.field('language').label('语言'),
            nga.field('dob', 'date').label('生日'),
            nga.field('email').label('邮箱'),
            nga.field('hospital').label('医院'),
            nga.field('department').label('科室')
        ])
        .listActions(['show', 'edit', 'delete'])
        .filters([
            nga.field('username', 'string').label('').attributes({
                'placeholder': '请输入用户名进行搜索'
            })
        ]);

    doctor.creationView()
        .title('创建医生账户')
        .description('输入信息创建医生账户，其中带*号的为必填项目。')
        .fields([
            nga.field('username', 'string').label('用户名')
            .validation({
                required: true,
                maxlength: 30
            }),
            nga.field('email').label('电子邮箱')
            .validation({
                required: false,
                validator: validation.email
            }),
            nga.field('last_name').label('姓氏')
            .validation({
                required: true,
                validator: validation.lastName
            }),
            nga.field('first_name').label('名字')
            .validation({
                required: true,
                validator: validation.firstName
            }),
            nga.field('password').label('密码')
            .validation({
                required: true,
                minlength: 6,
                maxlength: 15,
                validator: validation.password
            }),
            nga.field('password_conf').label('确认密码')
            .validation({
                required: true,
                minlength: 6,
                maxlength: 15,
                validator: validation.password
            }),
            nga.field('dob', 'date').label('出生日期')
            .validation({
                required: true
            }),
            nga.field('phone').label('电话号码')
            .validation({
                required: true,
                maxlength: 20,
                validator: validation.telphone
            }),

            nga.field('gender', 'choice').label('性别')
            .validation({
                required: true
            })
            .choices([{
                label: '男性',
                value: 'm'
            }, {
                label: '女性',
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
            nga.field('hospital').label('医院')
            .validation({
                required: true,
                maxlength: 30
            }),
            nga.field('department').label('科室')
            .validation({
                required: true,
                maxlength: 20
            }),
        ]);
    
    doctor.editionView()
        .title('编辑医生信息') //"{{ entry.values }}" 
        .actions(['list', 'show', 'delete','back'])
        .fields([
            objArrayCustom.objectArrValueDelete(doctor.creationView().fields(), 'name', ['password', 'password_conf'])
        ]);

    doctor.showView()
        .title('医生信息详情')
        .fields([
            nga.field('id'),
            doctor.editionView().fields()
        ]);

    doctor.deletionView()
        .title('医生删除')
        .description('确认删除医生{{ entity }}吗？');


    return doctor;

}
