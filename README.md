# sonolus-express-demo-memory

A simple Sonolus custom server to demonstrate usage of [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express).

## Links

-   [Sonolus Website](https://sonolus.com)
-   [Sonolus Wiki](https://github.com/NonSpicyBurrito/sonolus-wiki)
-   [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express)
-   [sonolus-pack](https://github.com/NonSpicyBurrito/sonolus-pack)

## About

This custom server contains features:

-   A fully functional Sonolus custom server that Sonolus app can connect to and play.
-   Contains [sonolus-bandori-engine](https://github.com/NonSpicyBurrito/sonolus-bandori-engine) and other items.
-   Allows users to upload levels (by opening server link in browser) and play them.

This custom server demonstrates the following concepts that are commonly used in making Sonolus custom servers:

-   Setting up [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express) to handler Sonolus custom server routes.
-   Loading static items packed by [sonolus-pack](https://github.com/NonSpicyBurrito/sonolus-pack).
-   Dynamically adding new items (third party package and user uploads).

Additional notes:

-   This custom server is NOT production ready, it is meant as a demo.
-   All repository resources are not kept in memory.
-   All item info are kept in memory (`sonolus.db`), which allows [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express) default handlers to do their jobs automatically.
-   Keeping all item info in memory has non-negligible memory usage cost, and is meant for small to medium scale servers. For large scale servers with potentially too many item, it is recommended to implement respective handlers.

## Building

```
npm run build
```

## Running

After building, navigate to `dist` and:

```
node index.js
```
