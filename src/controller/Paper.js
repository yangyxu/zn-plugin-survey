zn.define(function () {

    return zn.Controller('paper',{
        methods: {
            getPaperMeta: {
                method: 'GET/POST',
                argv: {
                    openid: null,
                    paper_uuid: null
                },
                value: function (request, response, chain){

                }
            },
            getPapersByType: {
                method: 'GET/POST',
                argv: {
                    status: null
                },
                value: function (request, response, chain){
                    var _type = request.getValue('type'),
                        _where = ['zn_deleted=0 and parent_id=0 and status=' + request.getValue('status') ];
                    if(_type){
                        _where.push(' and type_id=' + _type);
                    }
                    this.beginTransaction()
                        .query(zn.sql.paging({
                            table: 'zn_plugin_survey_paper',
                            where: _where
                        }), null, function (err, rows){
                            if(err){
                                response.error(err);
                            }else {
                                response.success(rows);
                            }
                        }).commit();
                }
            }
        }
    });

});
