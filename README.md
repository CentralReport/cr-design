# CentralReport Web Design

This repository contains resources around the web design for the CentralReport project.
It will be used in the Unix/Linux agent and in the online part.

## Prerequisites

* [NodeJS](http://nodejs.org/)
* [Grunt](http://gruntjs.com/)

## Install, build and run

To compile assets, you need to install required Node modules and run the related grunt task.
It's pretty easy, just run the following commands:

```bash
npm install;
grunt;

```

That's it! The grunt task has compiled:

- The examples assets (available in the [example folder](examples/))
- The dist assets, usable to production environment (in the [dist folder](dist/))


## Develop
The grunt task ```serve``` can be used during the development. It starts a web server with a live reload when
any less or javascript file is updated.

To use it, just run the ```grunt serve``` command.

## Contribute
As the CentralReport is an open source project and licensed under the Apache 2.0 licence, you are welcome
to contribute!