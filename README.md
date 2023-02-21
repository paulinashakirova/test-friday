# friday-finance-test

## MY GENERAL NOTES

1. I spent some hours trying to integrate Firebase as my backend, but it doesn't support csv files out of the box. To integrate I needed to use external tools. I chose Retool, but it was buggy. So instead I converted csv files to json and minified them.

Then I came across multiple compatibility issues.
Such as:

1. Couldn't load sourcemaps
2. Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/html". Strict MIME type checking is enforced for module scripts per HTML spec.
   This error persisted. I went backwards through each commit and the error stayed. There is not much information online why that happened. There was a similar issue on Gatsby issues page from 4 years ago, but it was fixed there.
   After I reset to the very first commit. removed and reinstalled node_modules, nothing worked. This made me very frustrated. Since this appeared to be unsolvable, I created another project from scratch.

Scaffolding new project.

1. After auto scaffolding and installing modules, there is this error:
   Cannot destructure property 'nuxt' of 'this' as it is undefined.
   Attempts to solve:
   - Install postcss8
   - follow github [issue](https://github.com/nuxt-modules/tailwindcss/issues/598), but their solution is not working for me.

After some more time, I realized that debugging won't help, and decided to create more minimalistic setup.
I decided not to add testing, ui frameworks etc. only the required parts. Also this time I am choosing yarn as a package manager, not npm or pnpm as before.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
