# friday-finance-test

### You can see the site [live](https://main--gentle-dolphin-34dc0b.netlify.app/)

## What I implemented

- UI part for the transactions table list
- Sorting algorithm (to sort by day or bank)
- Search by text (so far only searching for references, but in the future it can be extended to seach through other metrics)
- Mock data to be async
- Adding typescript support
- Make sorting by date independent from other filters/sorts, so it doesn't reset other filters.

## What I wanted implement next

- Unit tests
- Cypress
- Search by other params
- Search by date range
- Pagination (to return only limited amount of results, since the real data contains 100000+ records)
- Changing the column order based on use case
- Linting/Formatting

## MY GENERAL NOTES

1. I spent some hours trying to integrate Firebase as my backend, but it doesn't support csv files out of the box. To integrate I needed to use external tools. I chose Retool, but it was buggy. So instead I converted csv files to json place them in the `/static` folder.

Then I came across multiple compatibility issues. Some of them I am listing below to show my thought process.

So the following is what was happening.

1. `Couldn't load sourcemaps`
2. `Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/html". Strict MIME type checking is enforced for module scripts per HTML spec.`
   This error persisted. I went backwards through each commit and the error stayed. There is not much information online why that happened. There was a similar issue on Gatsby issues page from 4 years ago, but it was fixed there.
   After I reset to the very first commit. removed and reinstalled node_modules, nothing worked. This made me very frustrated. Since this appeared to be unsolvable, I created another project from scratch.

Scaffolding new project.

1. After auto scaffolding and installing modules, there was this error:
   `Cannot destructure property 'nuxt' of 'this' as it is undefined.`
   Attempts to solve:
   - Install postcss8
   - follow github [issue](https://github.com/nuxt-modules/tailwindcss/issues/598), but their solution is not working for me.

After some more time, I realized that debugging won't help, and decided to create more minimalistic setup.
I decided not to add testing, ui frameworks etc. only the required parts. Also this time I am choosing yarn as a package manager, not npm or pnpm as before.

Now... New setup
I created the project with typescript and nuxt only. Works. I added Tailwind following the guide and now things break.

Decided to check what peer dependencies are missing and install them one by one. I installed Typescript, Webpack, babel-core, consola.

The error is different now.
`opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'`

[this](https://github.com/webpack/webpack/issues/15900#issuecomment-1373595261) solved the issue... to add `NODE_OPTIONS=--openssl-legacy-provider`

- `ts-loader couldn't be loaded`. I added as a dev dep.
- `Module build failed (from ./node_modules/ts-loader/index.js):friendly-errors 20:25:17`
- `TypeError: loaderContext.getOptions is not a function`
  following [this](https://github.com/TypeStrong/ts-loader/issues/1484#issuecomment-1219600213) advice, I downgraded ts-loader to 8.4.0
  It's working!!!!!

Second day:

1. Tried to use `computed` with `nuxtjs-composition-api` and got this error `Can't reexport the named export 'watchSyncEffect' from non EcmaScript module (only default export is available)`
   solved by adding `'@nuxtjs/composition-api/module',` `'@nuxtjs/tailwindcss'` build modules.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

```
