"use strict";

var Promise = require('bluebird');
const db = require('../database/db.js');
var moment = require('moment')

class AppModel {
    constructor($mdl, $data, $path) {
        db.dbType = 'mysql'
        this.model = {}

        if ($path) {
            this.model = Object.assign({}, require($path + $mdl + ".json"))
        } else {
            this.model = Object.assign({}, require('./schema/' + $mdl + ".json"))
        }
        this.model.options = {}
        this.model.options.condition = []
        if ($data) { this.set($data) }

    }
    set($data) {
        this.model.options.data = $data;

    }
    create() {
        this.model.statement = '';
        this.model.where = [];
        this.model.options.values = [];
        let $parent5 = this


        return this.getInsertStatement(this.model)
            .then(async function() {
                return await db.insert($parent5.model);
            })
            .catch(AppModel.error);
    }
    getInsertStatement() {
        let $columns = [];
        let $values = [];
        let $keys = [];
        let $dataKeys = [];
        let $sql;
        let $data = {};
        $keys = Object.keys(this.model.entity)
        $dataKeys = Object.keys(this.model.options.data)
        if ($dataKeys.indexOf('active') < 0) {
            this.model.options.data.active = 1
        }
        
        for (let $k = 0; $k < $dataKeys.length; $k++) {
            let key = $dataKeys[$k]
            if ($keys.indexOf(key) >= 0) {
                
                $data[key] = this.model.options.data[key]
            }
            console.log($data);
        };
        $sql = "INSERT INTO " + this.model.tableName + " SET ? "
        this.model.options.values = $data;
        this.model.statement = $sql;
        return Promise.resolve(this.model);
    }
    where($condition) {
        if (!$condition) {
            this.model.options.condition = []
        } else {
            this.model.options.condition = [$condition]
        }
    }
    find($type, $options) {
   
        if ($options) { this.model.options = $options; }
        this.model.statement = '';
        this.model.where = this.model.options.condition;//changes
        let $parent3 = this
        return this.getSqlSelect()
            .then(this.setWhere())
            .then(this.setSort())

        .then(async function() {
                return await db.find($parent3.model)
            })
            .then(function() {
                return $parent3.parser()
            })
            .catch(AppModel.error)
    }
    getSqlSelect() {

        if (this.model.statement) {
            console.log(this.model.statement+"jjjjjjj")
            return new Promise.resolve(this.model);
        }
        let $tables = [];
        console.log(JSON.stringify(JSON.stringify(this.model)+"777777777777777"))
        let $alias = ""
        let $sql = "SELECT " + this.model.tableName + ".* from "+this.model.tableName+" ";

        this.model.statement = $sql;
        this.model.arguments = [];
        //console.log(this.model.statement)
        return new Promise.resolve(this.model);
    }

    setWhere() {
       
        let $str = "WHERE (1=1  "    
        console.log(JSON.stringify(this.model))
        if (this.model.hasOwnProperty('where')) {
            if (this.model.where.length > 0) {
                this.model.statement = this.model.statement + $str + " and " + this.model.where.join(" and ") + " ) ";
                $str = " "
            }
        }
    }

    setSort() {
        let $sort = " ";
        console.log('Sorting', this.model.options);

        if (this.model.options.hasOwnProperty('sort')) {
            console.log('Inside sorting')
            if (this.model.options.sort.length > 0) {
                $sort = $sort + this.model.options.sort.join(" , ");
            }
            this.model.statement = this.model.statement + " order by " + $sort;
            console.log('Statemetn rdered by added')
        }
        if (this.limit) {
            this.model.statement = this.model.statement + " limit " + this.limit
        }
        console.log(this.model.statement)
        return Promise.resolve(this.model);
    }
    parser($mdl, $group) {
        let $data = [];
        let $total = 0;
        let $i;
        let $keys = [];

       
        if (!$group) { $group = '#' }
        
        if (this.model.data) {
            
            $total = this.model.data.length;
            
            for ($i = 0; $i < $total; $i++) {
                let $row = {};
                $keys = Object.keys(this.model.data[$i]);
                
                for (let $k = 0; $k < $keys.length; $k++) {
                    let key = $keys[$k]
                    if (key == this.model.tableName) {
                        $row = this.model.data[$i][key]
                    } else if (key == $group) {
                        $row = this.model.data[$i][key]
                    } else if (key == '') {
                        $row = Object.assign($row, this.model.data[$i][key])
                    } else {
                        $row[key] = this.model.data[$i][key];
                    }
                };
                $data.push($row);
            }
        }
        return new Promise.resolve($data);
    }
    async updateTable($tableName, $where, $data) {
        let $x = {}
            if (Array.isArray($where)) {
                $x.statement = "update " + $tableName + " SET ? WHERE " + $where.join(' and ')
            } else if (typeof $where === 'object' && $where.id !== undefined) {
                $x.statement = "update " + $tableName + " SET ? WHERE id=" + $where.id
            } else {
                console.error("Invalid $where parameter:", $where);
            }
            
            
        console.log($x.statement)
        console.log($data)
        $x.options = { "values": $data }
        return await db.update($x);
    }
    deleteFrom($tableName, $where) {
        var $x = {}
            if (Array.isArray($where)) {
                $x.statement = "delete from " + $tableName + "  WHERE " + $where.join(' and ')
            } else if (typeof $where === 'object' && $where.id !== undefined) {
                $x.statement = "delete from  " + $tableName + "  WHERE id=" + $where.id
            } else {
                console.error("Invalid $where parameter:", $where);
            }
            console.log($x.statement)
        return db.delete($x);
    }
    
}
module.exports = AppModel;