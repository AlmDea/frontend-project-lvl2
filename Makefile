publish:
	npm publish --dry-run
	
install:
	npm ci

lint:
	npx eslint .

link:
	npm link

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test-watch:
	NODE_OPTIONS=--experimental-vm-modules npx jest --watch