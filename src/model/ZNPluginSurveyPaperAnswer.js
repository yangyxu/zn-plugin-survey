zn.define(function () {

    var model = zn.db.common.model;

    return zn.Model("zn_plugin_survey_paper_answer", {
        mixins: [
            model.Base
        ],
        properties: {
            user_id: {
                value: null,
                type: ['int', 11],
                default: 0
            },
            paper_id: {
                value: null,
                type: ['int', 11],
                default: 0
            },
            topic_id: {
                value: null,
                type: ['int', 11],
                default: 0
            },
            value: {
                value: null,
                type: ['varchar', 1000],
                default: ''
            },
            text: {
                value: null,
                type: ['varchar', 1000],
                default: ''
            }
        }
    });

})
