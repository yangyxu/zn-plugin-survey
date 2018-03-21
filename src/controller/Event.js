zn.define(['node:chinese-to-pinyin', 'node:officegen'], function (node_pinyin, node_officegen) {

    return zn.Controller('event',{
        methods: {
            orderField: {
                method: 'GET/POST',
                argv: {
                    field_id: null,
                    order: 'up'
                },
                value: function (request, response, chain){
                    var _field_id = request.getValue('field_id'),
                        _order = request.getValue('order'),
                        _field = null;
                    this.beginTransaction()
                        .query(zn.sql.select({
                            table: 'zn_plugin_survey_event_field',
                            where: { id: _field_id }
                        }))
                        .query('validate', function (sql, data){
                            _field = data[0];
                            if(!_field){
                                return response.error('未查到该字段'), false;
                            }

                            if(_order=='up'){
                                if(_field.field_order==1){
                                    return response.error('已经是最高'), false;
                                }else {
                                    return zn.sql.update({
                                        table: 'zn_plugin_survey_event_field',
                                        updates: { field_order: _field.field_order },
                                        where: { field_order: _field.field_order - 1, event_id: _field.event_id }
                                    }) + zn.sql.update({
                                        table: 'zn_plugin_survey_event_field',
                                        updates: {field_order: (_field.field_order - 1)},
                                        where: { id: _field_id }
                                    });
                                }
                            }else {
                                return zn.sql.update({
                                    table: 'zn_plugin_survey_event_field',
                                    updates: { field_order: _field.field_order },
                                    where: { field_order: _field.field_order + 1, event_id: _field.event_id }
                                }) + zn.sql.update({
                                    table: 'zn_plugin_survey_event_field',
                                    updates: {field_order: (_field.field_order + 1)},
                                    where: { id: _field_id }
                                });
                            }
                        }, function (err, data){
                            if(err){
                                return response.error(err);
                            }else {
                                return response.success("排序成功");
                            }
                        }).commit();
                }
            },
            create: {
                method: 'GET/POST',
                argv: {
                    values: null
                },
                value: function (request, response, chain){
                    var _values = request.getValue('values');
                    this.beginTransaction()
                        .query(zn.sql.select({
                            table: 'zn_plugin_survey_event_type',
                            where: { id: _values.type_id }
                        }))
                        .query('validate', function (sql, data){
                            var _type = data[0];
                            if(!_type){
                                return response.error('未查到该活动'), false;
                            }

                            _values.table_name = _type.table_prefix + '_' + zn.date.nowDateString() + '_' + zn.util.randomNumbers(6)
                            return zn.sql.insert({
                                table: 'zn_plugin_survey_event',
                                values: _values
                            });
                        }, function (err, data){
                            if(err){
                                return response.error(err);
                            }else {
                                return response.success("创建成功");
                            }
                        }).commit();
                }
            },
            getEventMeta: {
                method: 'GET/POST',
                argv: {
                    openid: null,
                    event_uuid: null
                },
                value: function (request, response, chain){
                    var _openid = request.getValue('openid'),
                        _event_uuid = request.getValue('event_uuid'),
                        _data = {};
                    this.beginTransaction()
                        .query(zn.sql.select({
                            table: 'zn_plugin_survey_event',
                            where: { zn_id: _event_uuid, status: 1 }
                        }))
                        .query('validate', function (sql, data){
                            if(!data[0]){
                                return response.error('未查到该活动'), false;
                            }
                            var _event = _data.event = data[0];
                            if(_event.start_time || _event.end_time){
                                var _now = (new Date()).getTime()
                                if(_now>(new Date(_event.end_time)).getTime()){
                                    return response.error('活动已经结束'), false;
                                }
                                if(_now<(new Date(_event.start_time)).getTime()){
                                    return response.error('活动还没开始'), false;
                                }
                            }

                            if(!_data.event.table_generated){
                                return response.error('活动还未发布'), false;
                            }

                            if(_data.event.count == _data.event.max_count){
                                return response.error('活动提交已满'), false;
                            }

                            return zn.sql.select({
                                table: 'zn_plugin_survey_event_field',
                                where: { event_id:  _data.event.id },
                                order: {
                                    field_order: 'asc'
                                }
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
                            _data.fields = data[0];
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
                            if(data[0] && _value.event.unique_check){
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
            pagingEventResult: {
                method: 'GET/POST',
                argv: {
                    event_uuid: null
                },
                value: function (request, response, chain){
                    var _event_uuid = request.getValue('event_uuid');
                    var _values = request.getValue();
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
                                _values.table = data[0].table_name;
                                _values.fields = "*, zn_plugin_survey_convert_openid(zn_plugin_wechat_open_id) as openid_convert"
                                return zn.sql.paging(_values);
                            }
                        }, function (err, data){
                            if(err){
                                response.error(err);
                            }else {
                                response.success(data);
                            }
                        })
                        .commit();
                }
            },
            deleteEventResult: {
                method: 'GET/POST',
                argv: {
                    event_uuid: null,
                    ids: null
                },
                value: function (request, response, chain){
                    var _event_uuid = request.getValue('event_uuid');
                    var _ids = request.getValue("ids");
                    var _event = null;
                    this.beginTransaction()
                        .query(zn.sql.select({
                            table: 'zn_plugin_survey_event',
                            where: {
                                zn_id: _event_uuid
                            }
                        }))
                        .query('Select Field', function (sql, data){
                            _event = data[0];
                            if(!_event){
                                return response.error('未查到该活动'), false;
                            }else {
                                return zn.sql.delete({
                                    table: _event.table_name,
                                    where: "id in (" + _ids + ")"
                                }) + zn.sql.update({
                                    table: 'zn_plugin_survey_event',
                                    updates: "count=count-"+_ids.split(',').length
                                });
                            }
                        }, function (err, data){
                            if(err){
                                response.error(err);
                            }else {
                                response.success(data);
                            }
                        })
                        .commit();
                }
            },
            downloadEventResult: {
                method: 'GET/POST',
                argv: {
                    event_uuid: null
                },
                value: function (request, response, chain){
                    var _event_uuid = request.getValue('event_uuid');
                    var _values = request.getValue();
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
                                    table: _data.event.table_name
                                }) + zn.sql.select({
                                    table: 'zn_plugin_survey_event_field',
                                    where: { event_id: _data.event.id },
                                    order: {
                                        field_order: 'asc'
                                    }
                                });
                            }
                        }, function (err, data){
                            if(err){
                                response.error(err);
                            }else {
                                var _rows = data[0], _fields = data[1], _fk = [];
                                var _xlsx = node_officegen('xlsx'),
                                    _sheet0 = _xlsx.makeNewSheet();
                                _sheet0.name = _data.event.zn_title;
                                _sheet0.data[0] = [];
                                _fields.push({title: '提交时间', name: 'zn_create_time'})
                                _fields.forEach(function (field){
                                    _sheet0.data[0].push(field.title);
                                    _fk.push(field.name);
                                });
                                _rows.forEach(function (row, index){
                                    _sheet0.data.push(_fk.map(function (key){
                                        return row[key];
                                    }));
                                });

                                response.writeHead(200, {
                				    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                				    'Content-disposition': 'attachment; filename='+_data.event.table_name+'_data.xlsx'
                				});
                                _xlsx.generate(response._serverResponse);
                            }
                        })
                        .commit();
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
                                    },
                                    order: {
                                        field_order: 'asc'
                                    }
                                })
                            }
                        }, function (err, data){
                            if(err){
                                response.error(err);
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
                    /*
                    _value.name = node_pinyin(_value.title, { noTone: true, filterChinese: true }).split(' ').join('_') + '_' +zn.util.getRandomNumbers();
                    _value.name = _value.replace(/\(/g, '_');
                    _value.name = _value.replace(/\)/g, '_');
                    _value.name = _value.replace(/\:/g, '_');
                    _value.name = _value.replace(/\,/g, '_');
                    _value.name = _value.replace(/\,/g, '_');
                    */
                    _value.name = "zn_table_field_name_" + zn.util.getRandomNumbers();
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
                            },
                            order: {
                                field_order: 'asc'
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
                                        //type: JSON.parse(field.field_type),
                                        type: ["text"]
                                    };
                                });
                                return zn.Model(_table.table_name, {
                                    mixins: [ zn.db.common.model.Base ],
                                    properties: __fields
                                }).getCreateSql() + zn.sql.update({
                                    table: 'zn_plugin_survey_event',
                                    where: { id: _event_id },
                                    updates: { table_generated: 1, status: 1, count: 0 }
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

                },
                value: function (request, response, chain){
                    var _type = request.getValue('type'),
                        _status = request.getValue('status'),
                        _where = ['zn_deleted=0 and parent_id=0'];
                    if(_status !== undefined && _status != 100){
                        if(_status != -1){
                            _where.push(' and status=' + _status);
                        }else {
                            _where.push(' and status=1 and UNIX_TIMESTAMP(end_time)<UNIX_TIMESTAMP(now())');
                        }
                    }
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
