zn.define(function () {

    var model = zn.db.common.model;

    return zn.Model("zn_plugin_survey_paper", {
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
            parent_id: {
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
            attachments: {
                value: null,
                type: ['varchar', 2000],
                default: ','
            },
            comment: {
                value: null,
                type: ['varchar', 1000],
                default: ''
            }
        }
    });

})
