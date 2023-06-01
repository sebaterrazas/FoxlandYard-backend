const Router = require('koa-router');

const router = new Router();

router.get("players.list", "/", async (ctx) => {
    try {
        const players = await ctx.orm.Player.findAll();
        ctx.body = players;
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
});

router.get("players.show", "/:id", async (ctx) => {
    try {
        const player = await ctx.orm.Player.findByPk(ctx.params.id);
        ctx.body = player;
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
});

router.get("players.details", "/:id/details", async (ctx) => {
    try {
        const player = await ctx.orm.Player.findByPk(ctx.params.id, {
          include: [ctx.orm.Game, ctx.orm.User, ctx.orm.Character]
        });
        ctx.body = player;
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
});

module.exports = router;