'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
//const ImageController= use('App/Models/Image')
const Postagens= use('App/Models/Postagens')
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with images
 */
class ImageController {

  /**
   * Create/save a new image.
   * POST images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, params }) {

  const postagens = await Postagens.findOrFail(params.id)

  const images = request.file('image', {
    types: ['image'],
    size: '2mb'
  })

  //Salvar imagens em uma pasta de uploads para termos acesso posterior:
  await images.moveAll(Helpers.tmpPath('uploads'), file => ({
    name: '${Date.now()}-${file.clientName}'
  }))
  
  if (!images.movedAll()) {
    return images.errors()
  }

  //criar os registros de imagens no banco de dados associados com o imóvel
  await Promise.all(
    images
      .movedList()
      .map(image => property.images().create({ path: image.fileName }))
  )

  }
}

module.exports = ImageController
