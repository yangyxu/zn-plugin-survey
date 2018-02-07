zn.define(function () {

    var model = zn.db.common.model;

    return zn.Model("zn_plugin_survey_event_table", {
        mixins: [
            model.Base,
            model.Rights
        ],
        properties: {
            event_id: {
                value: null,
                type: ['int', 11],
                default: 0
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
            }
        }
    });

})
