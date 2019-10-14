'use strict'

const User = use('App/Models/User');//importando modelo de usuario

//método register usado para criar novos usuários no banco de dados:
class AuthController {

    async register({ request, auth, response }) {
        const username = request.input("username")
        const email = request.input("email")
        const password = request.input("password")

        let user = new User()
        user.username = username
        user.email = email
        user.password = password

        user = await user.save()
        let accessToken = await auth.generate(user)
        return response.json({ "user": user, "access_token": accessToken })
    }

    /*     async login ({ request, auth, response }) {
            try {
                // validate the user credentials and generate a JWT token
                const token = await auth.attempt(
                    request.input('email'),
                    request.input('password')
                )    
                return response.json({
                    status: 'success',
                    data: token
                })
            } catch (error) {
                response.status(400).json({
                    status: 'error',
                    message: 'Invalid email/password'
                })
            }
        } */
    async login({ request, auth, response }) {
        const email = request.input("email")
        const password = request.input("password");
        try {
            if (await auth.attempt(email, password)) {
                let user = await User.findBy('email', email)
                let accessToken = await auth.generate(user)
                return response.json({ "user": user, "access_token": accessToken})
                //return response.response.setHeader("Authorization", 'Bearer ${token.token}');

            }

        }
        catch (e) {
            return response.json({ message: 'You first need to register!' })
        }
    }

}

module.exports = AuthController
