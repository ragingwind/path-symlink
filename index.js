'use strict';

const fs = require('fs');
const path = require('path');
const globby = require('globby');
const pify = require('pify');

const pFs = pify(fs);

function stripExtname(p) {
	return `${path.basename(p, path.extname(p))}`;
}

function renameExists(target) {
	return globby(target + '*').then(files => {
		files.forEach(f => pFs.renameSync(f, `${f}.bak`));
		return files;
	});
}

function createSymlink(manifest, dest, opts) {
	return globby(manifest).then(items => {
		return Promise.all(items.map(src => {
			const symlink = path.join(dest, `.${opts.strip ? stripExtname(src) : src}`);
			return renameExists(symlink).then(_ => {
				pFs.symlink(path.resolve(src), symlink);
				return symlink;
			});
		}));
	});
}

module.exports = (src, dest, opts) => {
	if (!src || !dest) {
		throw new Error('Invalid arguments');
	}

	if (!Array.isArray(src)) {
		src = [src];
	}

	opts = Object.assign({
		strip: false
	}, opts);

	return createSymlink(src, dest, opts);
};
