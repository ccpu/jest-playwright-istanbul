# jest-chromium-istanbul

<p>
  <a href="http://badge.fury.io/js/jest-chromium-istanbul"><img src="https://badge.fury.io/js/jest-chromium-istanbul.svg" alt="npm version"></a>
  <a href="https://circleci.com/gh/ocavue/jest-chromium-istanbul/tree/master"><img src="https://circleci.com/gh/ocavue/jest-chromium-istanbul/tree/master.svg?&style=shield" alt="Build Status"></a>
</p>

> This is a fork of [ocavue/jest-puppeteer-istanbul](https://github.com/ocavue/jest-puppeteer-istanbul), if you are using puppeteer, i would suggest using original library. it has been modified and added a function to manually passing a page to a function and setting the coverage.

## Install

```bash
yarn add -D jest-chromium-istanbul
// or
npm install -D jest-chromium-istanbul
```

## Configure

### [1/4]

Make sure that you have [Jest](https://github.com/facebook/jest) and [Babel](https://github.com/babel/babel) installed and configured.

### [2/4]

Install [`babel-plugin-istanbul`](https://www.npmjs.com/package/babel-plugin-istanbul) and add it to your Babel config.

You should **ONLY** use this plugin when you are in development mode. This plugin will add a lot of code for keeping track of the coverage statements. You definitely won't want them in your final production code.

Babel configuration examples:

```javascript
// .babelrc.js

const plugins = [
    /* Your babel plugins */
]
if (process.env.NODE_ENV === "development") {
    plugins.push("istanbul")
}
module.exports = {
    plugins: plugins,
}
```

```json5
// babel.config.json

{
    plugins: [
        // Your babel plugins
    ],
    env: {
        development: {
            plugins: ["istanbul"],
        },
    },
}
```

### [3/4]

Update your Jest configuration:

-   Add `json` to `coverageReporters`. Since the defualt value of `coverageReporters` has `json` inclued, you don't need to change `coverageReporters` if you havn't specify it.
-   Add `jest-chromium-istanbul/lib/reporter` to `reporters`.

Set coverage using function as follow:

```
import { setCoverage } from "jest-chromium-istanbul"

await setCoverage(page)
```

Alternatively If chromium page available globally do as follow:

Update your Jest configuration:

-   Add `jest-chromium-istanbul/lib/setup` to `setupFilesAfterEnv`.

Notice:

> If custom reporters are specified, the default Jest reporters will be overridden. To keep default reporters, `default` can be passed as a module name.

A Jest configuration example:

```js
{
  coverageReporters: ["json", "text", "lcov"],
  setupFilesAfterEnv: ["jest-chromium-istanbul/lib/setup"],
  reporters: ["default", "jest-chromium-istanbul/lib/reporter"],
  collectCoverage: true,
}
```

If you use [jest-chromium](https://github.com/smooth-code/jest-chromium), jest-chromium will make page globally available. Otherwise you can set page globally as follow:

```js
beforeAll(async () => {
    const browser = await chromium.launch()
    const page = await browser.newPage()
    global.page = page
})
describe("E2E Tests", () => {
    test(async () => {
        /* Your test code */
    })
})
```
