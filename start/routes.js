'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.resource("usuarios","UsuarioController")
Route.resource("postagens","PostagenController")/* .middleware(["auth"]) */
Route.post("login","UsuarioController.gettoken")
Route.post("users", 'UsuarioController.create').middleware('auth') //rota para criação de usuário

Route.get("postagensusuarios/:id","UsuarioController.postagensUsuarios")
Route.get("usuariodapostagem/:id","PostagenController.usuarioDaPostagem")

//rotas de imagens
Route.post("postagens/:id/images","ImageController.store")/* .middleware('auth') */
Route.get('images/:path', 'ImageController.show')

//rotas de autenticação
Route.post('/auth/register', 'AuthController.register')
Route.post('/auth/login', 'AuthController.login')





