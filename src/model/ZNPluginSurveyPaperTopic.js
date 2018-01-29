zn.define(function () {

    var model = zn.db.common.model;

    return zn.Model("zn_plugin_survey_paper_topic", {
        mixins: [
            model.Base,
            model.Rights
        ],
        properties: {
            paper_id: {
                value: null,
                type: ['int', 11],
                default: 0
            },
            field_type: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            field_convert: {
                value: null,
                type: ['varchar', 50],
                default: ''
            },
            field_default: {
                value: null,
                type: ['varchar', 200],
                default: ''
            },
            title: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            name: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            type: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            width: {
                value: null,
                type: ['int', 11],
                default: null
            },
            default_value: {
                value: null,
                type: ['varchar', 2000],
                default: ''
            },
            required: {
                value: null,
                type: ['int', 4],
                default: 0
            },
            data: {
                value: null,
                type: ['varchar', 2000],
                default: ''
            },
            props: {
                value: null,
                type: ['varchar', 2000],
                default: ''
            },
            attrs: {
                value: null,
                type: ['varchar', 2000],
                default: ''
            }
        }
    });

})
