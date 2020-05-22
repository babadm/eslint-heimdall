/**
 * @fileoverview Do not use '+' operator for concating literals, use template literals instead
 * @author 
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

function searchForBinaryPlusConcatenation(node) {
  if(node.operator === '+'){
    if(node.right.type === 'Literal' || node.left.type === 'Literal') {
      context.report({
        node,
        messageId: "noPlusConcatenation",
      });
    }
    else if(node.left === 'BinaryExpression') {
      searchForBinaryPlusConcatenation(node.left)
    }
  }
}

module.exports = {
    meta: {
        docs: {
            description: "Do not use '+' operator for concating literals, use template literals instead",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ],
        messages: {
          noPlusConcatenation: "Do not use '+' operator for concating literals, use template literals instead"
        }
    },

    create: function(context) {
      
      return {
          
          "VariableDeclaration"(node) {
            let usesPlusConcatenation = node?.declarations?.filter(d => d.init?.type === "BinaryExpression" && (d.init?.left.type === 'Literal' || d.init?.right.type === 'Literal') )
            usesPlusConcatenation.forEach(n => {
              context.report({
                n,
                messageId: "noPlusConcatenation",
              });
            })
          },
          "ExpressionStatement"(node) {
            searchForBinaryPlusConcatenation(node.expression)
          },
      };
    }
};
