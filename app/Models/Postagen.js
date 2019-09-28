'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Postagen extends Model {
    usuario(){
        return this.belongsTo('App/Models/User','usuarioid','id')
    }

    images() {
        return this.hasMany('App/Models/Image')
      }
}

module.exports = Postagen
