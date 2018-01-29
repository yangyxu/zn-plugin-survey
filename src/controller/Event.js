zn.define(function () {

    return zn.Controller('event',{
        methods: {
            getEventMeta: {
                method: 'GET/POST',
                argv: {
                    openid: null,
                    event_uuid: null
                },
                value: function (request, response, chain){
                    var _openid = request.getValue('openid'),
                        _event_uuid = request.getValue('event_uuid');
                    var _data = {}
                    this.beginTransaction()
                        .query(zn.sql.select({
                            table: 'zn_plugin_survey_event',
                            where: { zn_id: _event_uuid, status: 1 }
                        }))
                        .query('validate', function (sql, data){
                            if(!data[0]){
                                return response.error('未查到该活动'), false;
                            }
                            _data.event = data[0];
                            if(!_data.event.table_generated){
                                return response.error('该活动还未发布或已经结束'), false;
                            }

                            if(_data.event.count == _data.event.max_count){
                                return response.error('该活动提交已满'), false;
                            }

                            return zn.sql.select({
                                table: 'zn_plugin_survey_event_field',
                                where: { event_id:  _data.event.id }
                            }) + zn.sql.select({
                                table: _data.event.table_name,
                                where: {
                                    zn_plugin_wechat_open_id: _openid
                                }
                            });
                        }, function (err, data){
                            if(err){
                                return response.error(err);
                            }
                            _data.event.table_name = null;
                            delete _data.event.table_name;
                            _data.event.table_generated = null;
                            delete _data.event.table_generated;
                            if(data[1][0]){
                                var _obj = data[1][0];
                                _data.data = data[0].map(function (field, index){
                                    return {
                                        title: field.title,
                                        type: field.type,
                                        value: _obj[field.name]
                                    };
                                });
                                response.success(_data);
                            }else {
                                _data.fields = data[0];
                                response.success(_data);
                            }
                        }).commit();
                }
            },
            submitEvent: {
                method: 'GET/POST',
                argv: {
                    openid: null,
                    event_uuid: null,
                    data: null
                },
                value: function (request, response, chain){
                    var _openid = request.getValue('openid'),
                        _event_uuid = request.getValue('event_uuid'),
                        _data = request.getValue('data'),
                        _value = {};
                    this.beginTransaction()
                        .query(zn.sql.select({
                            table: 'zn_plugin_survey_event',
                            where: { zn_id: _event_uuid, status: 1 }
                        }))
                        .query('validate', function (sql, data){
                            if(!data[0]){
                                return response.error('未查到该活动或活动已经结束'), false;
                            }
                            _value.event = data[0];
                            if(!_value.event.table_generated){
                                return response.error('该活动还未发布'), false;
                            }

                            if(_value.event.count == _value.event.max_count){
                                return response.error('该活动提交已满'), false;
                            }

                            return zn.sql.select({
                                table: _value.event.table_name,
                                where: {
                                    zn_plugin_wechat_open_id: _openid
                                }
                            });
                        })
                        .query('insert', function (sql, data){
                            if(data[0]){
                                return response.error('您已经提交报名'), false;
                            }else {
                                _data.zn_plugin_wechat_open_id = _openid;
                                return zn.sql.insert({
                                    table: _value.event.table_name,
                                    values: _data
                                }) + zn.sql.update({
                                    table: 'zn_plugin_survey_event',
                                    updates: 'count=count+1',
                                    where: { zn_id: _event_uuid }
                                });
                            }
                        }, function (err, data){
                            if(err){
                                response.error(err);
                            }else {
                                _value.event.table_name = null;
                                delete _value.event.table_name;
                                _value.event.table_generated = null;
                                delete _value.event.table_generated;
                                response.success(_value);
                            }
                        }).commit();
                }
            },
            getEventFields: {
                method: 'GET/POST',
                argv: {
                    event_uuid: null
                },
                value: function (request, response, chain){
                    var _event_uuid = request.getValue('event_uuid');
                    var _data = {};
                    this.beginTransaction()
                        .query(zn.sql.select({
                            table: 'zn_plugin_survey_event',
                            where: {
                                zn_id: _event_uuid
                            }
                        }))
                        .query('Select Field', function (sql, data){
                            if(!data[0]){
                                return response.error('未查到该活动'), false;
                            }else {
                                _data.event = data[0];
                                return zn.sql.select({
                                    table: 'zn_plugin_survey_event_field',
                                    where: {
                                        event_id: _data.event.id,
                                        zn_deleted: 0
                                    }
                                })
                            }
                        }, function (err, data){
                            if(err){
                                return response.error(err), false;
                            }else {
                                _data.fields = data;
                                response.success(_data);
                            }
                        })
                        .commit();
                }
            },
            createEventField: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    var _value = request.getValue();
                    _value.name = zn.util.pinyin(_value.title, {style: zn.util.pinyin.STYLE_NORMAL}).split(' ').join('_') + '_' +zn.util.getRandomNumbers();
                    this.beginTransaction()
                        .query(zn.sql.insert({
                            table: 'zn_plugin_survey_event_field',
                            values: _value
                        }), null, function (err, data){
                            if(err){
                                response.error(err);
                            }else {
                                response.success(data);
                            }
                        })
                        .commit();
                }
            },
            deployEvent: {
                method: 'GET/POST',
                argv: {
                    event_id: null
                },
                value: function (request, response, chain){
                    var _event_id = request.getValue('event_id');
                    this.beginTransaction()
                        .query(zn.sql.select({
                            table: 'zn_plugin_survey_event',
                            where: {
                                id: _event_id
                            }
                        }) + zn.sql.select({
                            table: 'zn_plugin_survey_event_field',
                            where: {
                                event_id: _event_id
                            }
                        }))
                        .query('create table', function (sql, rows){
                            var _table = rows[0][0];
                            if(_table){
                                var _fields = rows[1], __fields = {};
                                __fields['zn_plugin_survey_status'] = {
                                    type: ["int", 11],
                                    default: 0
                                };
                                __fields['zn_plugin_wechat_open_id'] = {
                                    type: ["varchar", 50],
                                    default: ''
                                };
                                _fields.map(function(field){
                                    __fields[field.name] = {
                                        type: JSON.parse(field.field_type),
                                        default: ''
                                    };
                                });
                                return zn.Model(_table.table_name, {
                                    mixins: [ zn.db.common.model.Base ],
                                    properties: __fields
                                }).getCreateSql() + zn.sql.update({
                                    table: 'zn_plugin_survey_event',
                                    where: { id: _event_id },
                                    updates: { table_generated: 1, status: 1 }
                                });
                            }else {
                                return response.error('表存在'), false;
                            }
                        }, function (err, rows){
                            if(err){
                                response.error(err);
                            }else {
                                response.success(rows);
                            }
                        }).commit();
                }
            },
            getEventsByType: {
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
                            table: 'zn_plugin_survey_event',
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
