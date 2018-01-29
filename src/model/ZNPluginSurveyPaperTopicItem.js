zn.define(function () {

    var model = zn.db.common.model;

    return zn.Model("zn_plugin_survey_paper_topic_item", {
        mixins: [
            model.Base
        ],
        properties: {
            paper_id: {
                value: null,
                type: ['int', 11],
                default: 0
            },
            paper_topic_id: {
                value: null,
                type: ['int', 11],
                default: 0
            },
            text: {
                value: null,
                type: ['varchar', 1000],
                default: ''
            },
            value: {
                value: null,
                type: ['varchar', 1000],
                default: ''
            },
            type: {
                value: null,
                type: ['varchar', 50],
                default: ''
            }
        }
    });

})
