install:
	npm install
publish:
	npm publish --dry-run
make lint:
	npx eslint .
make lint fix:
	npx eslint --fix .
test:
	npm test
test-coverage:
	npm test -- --coverage