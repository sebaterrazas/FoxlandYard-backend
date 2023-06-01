const Router = require('koa-router');

const router = new Router();

router.get("games.list", "/", async (ctx) => {
    try {
        const games = await ctx.orm.Game.findAll();
        ctx.body = games;
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("games.show", "/:id", async (ctx) => {
    try {
        const game = await ctx.orm.Game.findByPk(ctx.params.id);
        ctx.body = game;
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("games.tiles", "/:id/tiles", async (ctx) => {
    try {
        const game = await ctx.orm.Game.findByPk(ctx.params.id, {
            include: ctx.orm.Tile
          });
        ctx.body = game ? game.Tiles : [];
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("games.characters", "/:id/characters", async (ctx) => {
    try {
        const game = await ctx.orm.Game.findByPk(ctx.params.id, {
            include: ctx.orm.Character
        });
        console.log(game);

        ctx.body = game ? game.Characters : [];
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

module.exports = router;