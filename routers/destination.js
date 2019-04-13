const router = require('koa-router')()
const DESTINATION = require('../service/destination')

router
    /**
     * get destination
     */
    .get('/api/destination', async ctx => {


        let min = ctx.query.min || 0
        let max = ctx.query.max || 4

        let sort = ctx.query.sort

        let res = await DESTINATION.find()

        ctx.body = {
            code: 200,
            data: res.slice(min, max),
            _links: {
                self: {
                    href: '/api/detination'
                }
            },
            message: 'success'
        }
    })
    /**
     * update a destination 
     */
    .put('/api/destination', async ctx => {


        let _id = ctx.request.body._id
        let description = ctx.request.body.description

        if (!_id || !description) {
            return ctx.body = {
                code: -1,
                message: 'please confirm the parameters'
            }
        }

        await DESTINATION.update(_id, description).then(res => {

            ctx.body = {
                code: 200,
                data: res,
                _links: {
                    self: {
                        href: '/api/detination'
                    }
                },
                message: 'success'
            }
        })

    })
    /**
     * create a destination
     */
    .post('/api/destination', async ctx => {

        const {
            name,
            banner
        } = ctx.request.body


        if (!name || !banner) {
            return ctx.body = {
                code: -1,
                message: 'please confirm the parameters'
            }
        }

        await DESTINATION.create(ctx.request.body).then(res => {

            ctx.body = {
                code: 200,
                data: res,
                _links: {
                    self: {
                        href: '/api/detination'
                    }
                },
                message: 'success'
            }
        })
    })


module.exports = router