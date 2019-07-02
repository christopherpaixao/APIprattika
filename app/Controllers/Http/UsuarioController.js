'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const UsuarioModel= use ("App/Models/User")
/**
 * Resourceful controller for interacting with usuarios
 */
class UsuarioController {
  /**
   * Show a list of all usuarios.
   * GET usuarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) { 
    const Usuarios=await UsuarioModel.all(); //listar usuários
    response.send(Usuarios)
  }

  /**
   * Create/save a new usuario.
   * POST usuarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data=request.all() //await pq é um método assincrono
    const User=await UsuarioModel.create(data) //criar registro no banco
    response.send(User)
  }

  /**
   * Display a single usuario.
   * GET usuarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const User=await UsuarioModel.find(params.id)
    response.send(User)
  }
//método que busca os dados e retorna os posts dos usuário
  async postagensUsuarios ({ params, request, response, view }) {
    const UserPostagens=await UsuarioModel.find(params.id)
    UserPostagens.postagens=await UserPostagens.postagens().fetch()//postagens armazenadas
    return  UserPostagens
  }


  /**
   * Render a form to update an existing usuario.
   * GET usuarios/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update usuario details.
   * PUT or PATCH usuarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data=request.all()
    const User=await UsuarioModel.find(params.id) //encontrar usuário
    User.merge(data) //merge com os dados do request
    User.save() 
    response.send(User)
  }

  /**
   * Delete a usuario with id.
   * DELETE usuarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const User=await UsuarioModel.find(params.id) //find passa parâmetro para deletar
    User.delete()
    response.send({mensagem: "Usuário deletado com sucesso!"})
  }

  //receber e validar token de autenticação
  async gettoken({request,response,auth}){
    const {email,password}=request.all() //dados que serão passados
    const autenticacao=await auth.attempt(email,password)//berificar se o email e senha estão no banco
    response.send(autenticacao)//retorno do token
  }
}

module.exports = UsuarioController
