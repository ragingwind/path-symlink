import test from 'ava';
import osRandTmpDir from 'os-random-tmpdir';
import mkdirp from 'mkdirp';
import pathSymlink from './';

test('Creat symlinks', async t => {
	const dest = osRandTmpDir('path-symlink2');
	mkdirp.sync(dest);

	pathSymlink(['*.js', 'readme.md'], dest).then(links => {
		links = links.map(link => link.replace(dest, ''));
		t.true(links.indexOf('/.cli.js') >= 0);
		t.true(links.indexOf('/.index.js') >= 0);
		t.true(links.indexOf('/.test.js') >= 0);
		t.true(links.indexOf('/.readme.me') >= 0);
	});
});
