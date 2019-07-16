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

Route.get("postagensusuarios/:id","UsuarioController.postagensUsuarios")
Route.get("usuariodapostagem/:id","PostagenController.usuarioDaPostagem")





