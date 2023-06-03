const Router = require('koa-router');

const router = new Router();

router.get("characters.list", "/", async (ctx)=>{
    try {
        const characters = await ctx.orm.Character.findAll();
        ctx.body= characters;
        ctx.status = 201;
    } catch(error) {
        ctx.body= error;
        ctx.status = 400;
    }
})

router.get("characters.show", "/:id", async (ctx)=>{
    try {
        const characters = await ctx.orm.Character.findByPk(ctx.params.id);
        ctx.body= characters;
        ctx.status = 201;
    } catch(error) {
        ctx.body= error;
        ctx.status = 400;
    }
})

module.exports = router;