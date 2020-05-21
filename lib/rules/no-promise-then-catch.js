/**
 * @fileoverview Use async-await instead of then chaining for promises 
 * @author 
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
function searchForFunction(node, name) {
  let nested =  node === undefined ? false : searchForFunction(node?.object?.callee, name);
  return nested || node?.property?.name === name
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
      let isThereAnyCatch,isThereAnyThen
      return {
          Program() {
            isThereAnyThen = false
            isThereAnyCatch = false
          },
          "Program:exit"(node) {
              if (isThereAnyThen) {
                  context.report({
                      node,
                      messageId: "noThen",
                  });
              }
              if (isThereAnyCatch) {
                context.report({
                    node,
                    messageId: "noCatch",
                });
            }
          },
          "ExpressionStatement"(node) {
            isThereAnyThen = searchForFunction(node.expression?.callee, 'then')
            isThereAnyCatch = searchForFunction(node.expression.callee, 'catch')
          }
         
      }
    }

    
}
