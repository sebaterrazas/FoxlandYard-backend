const Router = require('koa-router');

const router = new Router();

router.get("tiles.list", "/", async (ctx) => {
    try {
        const tiles = await ctx.orm.Tile.findAll();
        ctx.body = tiles;
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
});

router.get("tiles.show", "/:id", async (ctx) => {
    try {
        const tile = await ctx.orm.Tile.findByPk(ctx.params.id);
        ctx.body = tile;
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
});

module.exports = router;