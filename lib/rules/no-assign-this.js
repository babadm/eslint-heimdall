/**
 * @fileoverview Do not assign this to a variable, use arrow functions to work with it
 * @author 
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Do not assign this to a variable, use arrow functions to work with it or assign only the properties needed",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ],
        messages: {
          noAssignThis: "Do not assign this to a variable, use arrow funtions or assign only the properties needed"
        }
    },

    create: function(context) {
        
      let usesThisAlone = []

      return {
          Program() {
            usesThisAlone = []
          },
          "Program:exit"(node) {
            usesThisAlone.forEach(n => {
              context.report({
                node: n,
                messageId: "noAssignThis",
              });
            });
          },
          "VariableDeclaration"(node) {
            usesThisAlone = usesThisAlone.concat(node.declarations?.filter(d => d.init?.type === "ThisExpression"))            
          }
      };
    }
};
