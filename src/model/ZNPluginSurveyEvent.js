zn.define(function () {

    var model = zn.db.common.model;

    return zn.Model("zn_plugin_survey_event", {
        mixins: [
            model.Base,
            model.Rights
        ],
        properties: {
            status: {
                value: null,
                type: ['int', 11],
                default: 0
            },
            type_id: {
                value: null,
                type: ['int', 11],
                default: 0
            },
            max_count: {
                value: null,
                type: ['int', 11],
                default: 0
            },
            count: {
                value: null,
                type: ['int', 11],
                default: 0
            },
            start_time: {
                value: null,
                type: ['datetime'],
                default: null
            },
            end_time: {
                value: null,
                type: ['datetime'],
                default: null
            },
            table_name: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            table_generated: {
                value: null,
                type: ['int', 4],
                default: 0
            },
            table_multi: {
                value: null,
                type: ['int', 4],
                default: 0
            },
            show_count: {
                value: null,
                type: ['int', 4],
                default: 0
            },
            unique_check: {
                value: null,
                type: ['int', 4],
                default: 0
            },
            email_enabled: {
                value: null,
                type: ['int', 4],
                default: 0
            },
            footer_title: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            owner_openid: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            owner_phone: {
                value: null,
                type: ['varchar', 20],
                default: ''
            },
            owner_email: {
                value: null,
                type: ['varchar', 20],
                default: ''
            },
            error_message: {
                value: null,
                type: ['longtext']
            },
            success_message: {
                value: null,
                type: ['longtext']
            },
            attachments: {
                value: null,
                type: ['varchar', 2000],
                default: ','
            },
            comment: {
                value: null,
                type: ['varchar', 1000],
                default: ''
            },
            background_image: {
                value: null,
                type: ['varchar', 100],
                default: ''
            }
        }
    });

})
