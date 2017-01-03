# path-symlink [![Build Status](https://travis-ci.org/ragingwind/path-symlink.svg?branch=master)](https://travis-ci.org/ragingwind/path-symlink)

> Create symlinks in a safe way


## Install

```
$ npm install --save path-symlink
```


## Usage

```js
const pathSymlink = require('path-symlink');

pathSymlink(['~/.dotfiles/**/*.symlink', '~/Downloads/local/*'], $HOME).then(links) {
}
```

## API

### pathSymlink(src, dest, [options])

Return a Promise for an array of creating symbolic links

#### src

Type: pattern for [globby](https://github.com/sindresorhus/globby)

Source files to become a symbolic link

#### dest

Type: `string`

Path for root directory for symbolic links

#### options

##### strip

Type: `boolean`<br>
Default: `true`

Whether strip extension string in a path or not

## License

MIT © [ragingwind](http://ragingwind.me)
