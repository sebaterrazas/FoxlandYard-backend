const Router = require('koa-router');
const { context } = require('../app');

const router = new Router();

router.get("users.list", "/", async (ctx)=>{
    try {
        const users = await ctx.orm.User.findAll();
        ctx.body= users;
        ctx.status = 201;
    } catch(error) {
        ctx.body= error;
        ctx.status = 400;
    }
})

router.get("users.show", "/:id", async (ctx)=>{
    try {
        const user = await ctx.orm.User.findByPk(ctx.params.id);
        ctx.body= user;
        ctx.status = 201;
    } catch(error) {
        ctx.body= error;
        ctx.status = 400;
    }
})

router.post("users.create", "/", async (ctx)=>{
    try {
        const user = await ctx.orm.User.create(ctx.request.body);
        ctx.body= user;
        ctx.status = 201;
    } catch(error) {
        ctx.body= error;
        ctx.status = 400;
    }
})

router.get("nodes.characters", "/:id/characters", async (ctx) => {
    try {
        const user = await ctx.orm.User.findByPk(ctx.params.id, {
            include: ctx.orm.Character
        });
          
        ctx.body = user ? user.Characters : [];
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
});

module.exports = router;