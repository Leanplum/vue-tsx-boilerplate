export PATH := ./node_modules/.bin:$(PATH)
export SHELL := /bin/bash

clean-build:
	rm -rf build/

clean-proto:
	rm -rf src/proto

clean-test:
	rm -rf coverage/
	rm -rf test-report.xml

clean: clean-build clean-proto clean-test

proto: clean-proto
	NODE_ENV=development node ./scripts/convertProtos.js

compile: proto

build: compile clean-build
	NODE_ENV=production webpack

ci: compile clean-test
	tsc --noEmit --pretty
	NODE_ENV=development jest --ci --coverage --testResultsProcessor="./node_modules/jest-junit-reporter"

start: compile
	NODE_ENV=development node ./scripts/start.js
