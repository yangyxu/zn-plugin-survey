zn.define(function () {

    var model = zn.db.common.model;

    return zn.Model("zn_survey_user", {
        mixins: [
            model.Base
        ],
        properties: {
            name: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            sex: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            email: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            phone: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            qq: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            wechat: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            website: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            zn_plugin_wechat_open_id: {
                value: null,
                type: ['varchar', 100],
                default: ''
            }
        }
    });

})
