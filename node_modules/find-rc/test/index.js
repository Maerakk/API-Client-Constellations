'use strict';

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const FindRc = require('../');


const lab = exports.lab = Lab.script();
const it = lab.it;
const expect = Code.expect;


it('finds an rc in the current working directory', () => {
  const filePath = FindRc('find');
  expect(filePath).to.exist();
  expect(filePath).to.contain('.findrc.js');
});


it('finds a file in a parent directory', () => {
  const filePath = FindRc('find', __dirname);
  expect(filePath).to.exist();
  expect(filePath).to.contain('.findrc.js');
});


it('returns undefined when a file isn\'t found', () => {
  const filePath = FindRc('no_way_will_this_exist');
  expect(filePath).to.not.exist();
});

it('returns undefined when a file isn\'t found and env.USERPROFILE is set', () => {
  process.env.USERPROFILE = process.env.HOME;
  delete process.env.HOME;
  const filePath = FindRc('no_way_will_this_exist');
  expect(filePath).to.not.exist();
});

it('operates when env.USERPROFILE and env.HOME are missing', () => {
  delete process.env.USERPROFILE;
  delete process.env.HOME;
  const filePath = FindRc('no_way_will_this_exist');
  expect(filePath).to.not.exist();
});
