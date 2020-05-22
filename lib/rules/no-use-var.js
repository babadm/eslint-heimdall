/**
 * @fileoverview use let or const instead of var when declaring variables
 * @author 
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "use let or const instead of var when declaring variables",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ],
        messages: {
          noVar: "Use let or const instead of var"
        }
    },

    create: function(context) {

      return {
          "VariableDeclaration"(node) {
            if(node.kind === 'var') {
              context.report({
                node,
                messageId: "noVar"
              });
            }
          }
      };
    }
};
