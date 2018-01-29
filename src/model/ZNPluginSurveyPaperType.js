zn.define(function () {

    var model = zn.db.common.model;

    return zn.Model("zn_plugin_survey_paper_type", {
        mixins: [
            model.Base,
            model.Tree,
            model.Rights
        ],
        properties: {
            table_prefix: {
                value: null,
                type: ['varchar', 50],
                default: 'zn_plugin_survey_paper_table_'
            }
        }
    });

});
