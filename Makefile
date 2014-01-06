
serve: node_modules
	@node_modules/serve/bin/serve -Slojp 0

test: node_modules
	@sed "s/'timeline'/'.\/'/" Readme.md | node_modules/jsmd/bin/jsmd

node_modules: *.json
	@packin install \
		--meta deps.json,package.json \
		--folder node_modules

.PHONY: serve test
