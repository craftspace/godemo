# Godemo

[![node version][node-image]][node-url]

[node-image]: https://img.shields.io/badge/node.js-%3E=_4.2-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/

## Developing
If you'd like to run it locally, and modify something, you can do so by cloning this repo and running the following commands (assuming that you have Node, NPM, Python, Grunt and Bower installed).

```bash  
# Clone and Install dependencies  
$ git clone https://github.com/craftspace/godemo.git  
$ npm install  
$ bower install  

# Start the node server on localhost:5601 on development mode    
# Watches for changes, automatically recompiles files and refreshes the browser  
$ grunt serve  

# Start the node server on production mode  
$ grunt release  
```
