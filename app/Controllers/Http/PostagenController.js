'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const PostagenModel= use ("App/Models/Postagen")
/**
 * Resourceful controller for interacting with postagens
 */
class PostagenController {
  /**
   * Show a list of all postagens.
   * GET postagens
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const postagens=await PostagenModel.all(); //listar usuários
    

    //teste método mostrar imagem
    const postagens = Property.query()
      .with('images')
      .fetch()
      //fim método

      response.send(postagens)

  }

  /**
   * Render a form to be used for creating a new postagen.
   * GET postagens/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new postagen.
   * POST postagens
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data=request.all() //await pq é um método assincrono
    const Postagen=await PostagenModel.create(data) //criar registro no banco
    response.send(Postagen)
  }

  /**
   * Display a single postagen.
   * GET postagens/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const Postagen=await PostagenModel.find(params.id)
    
    //requisição imagens
    const data=request.all();
    Postagen.merge(data)
    await Postagen.save()
    //fim requisição

    response.send(Postagen)
  }

  
  /**
   * Render a form to update an existing postagen.
   * GET postagens/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update postagen details.
   * PUT or PATCH postagens/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data=request.all()
    const Postagen=await PostagenModel.find(params.id) //encontrar usuário
    Postagen.merge(data) //merge com os dados do request
    Postagen.save() 
    response.send(Postagen)
  }

  //método que busca os dados e retorna o usuário da postagem
  async usuarioDaPostagem ({ params, request, response, view }) {
    const Postagen=await PostagenModel.find(params.id)
    Postagen.usuario=await Postagen.usuario().fetch()//busca e retorna o usuario da postagem
    return Postagen
  }

  /**
   * Delete a postagen with id.
   * DELETE postagens/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const Postagen=await PostagenModel.find(params.id) //find passa parâmetro para deletar
    Postagen.delete()
    response.send({mensagem: "Postagem deletada com sucesso!"})
  }
}

module.exports = PostagenController
