VERSION := 1.4.2
ROOT_IMAGE := node:lts
BASE_IMAGE := sails-cli

create-baseimg: 
	docker build -t $(BASE_IMAGE):${VERSION} docker/sails

.PHONY: create-baseimg
