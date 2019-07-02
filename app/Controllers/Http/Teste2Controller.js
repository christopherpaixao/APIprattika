'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with teste2S
 */
class Teste2Controller {
  /**
   * Show a list of all teste2S.
   * GET teste2S
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    return { greeting: 'Hello world in JSON'}
  }

  /**
   * Create/save a new teste2.
   * POST teste2S
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const {titulo,corpo}=request.all()
    response.send({ mensagem: 'msg de retorno da rota post com titulo' + titulo + "e o corpo: " + corpo})
  }

  /**
   * Display a single teste2.
   * GET teste2S/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    response.send({ mensagem: 'msg de retorno da rota show' + params.id})
  }

  /**
   * Update teste2 details.
   * PUT or PATCH teste2S/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    response.send({ mensagem: 'msg de retorno da rota put' + params.id})
  }

  /**
   * Delete a teste2 with id.
   * DELETE teste2S/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    response.send({ mensagem: 'msg de retorno da rota delete' + params.id})
  }
}

module.exports = Teste2Controller
