/**
 * @fileoverview Use async-await instead of then chaining for promises 
 * @author 
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
function searchForFunction(node, name) {

  if(node?.property?.name === name) {
    return node
  }
  else if (node) {
    return searchForFunction(node?.object?.callee, name)
  }
}

module.exports = {
    meta: {
        docs: {
            description: "Use async-await instead of then chaining for promises ",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ],
        messages: {
          noThen : "Do not link then function to promise, use async await",
          noCatch: "Do not link catch function to promise, use async await and wrap it with try catch",
        }
    },

    create: (context) => {
      let promiseCatchChained,promiseThenChained
      return {
          Program() {
            promiseThenChained = []
            promiseCatchChained = []
          },
          "Program:exit"(node) {
            if(promiseThenChained.length > 0) {
              promiseThenChained.forEach(n => {
                context.report({
                  node: n,
                  messageId: "noThen",
                })
              })
            }
            if(promiseCatchChained.length > 0) {
              promiseCatchChained.forEach(n => {
                context.report({
                    node: n,
                    messageId: "noCatch",
                })
              })
            }
          },
          "ExpressionStatement"(node) {
            const thenFound = searchForFunction(node.expression?.callee, 'then')
            if(thenFound !== undefined) {
              promiseThenChained = promiseThenChained.concat(thenFound)
            }
            const catchFound = searchForFunction(node.expression.callee, 'catch')
            if (catchFound !== undefined) {
              promiseCatchChained = promiseCatchChained.concat(catchFound)
            }
          }
         
      }
    }

    
}
