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
      return true
    }
    else if(node.left === 'BinaryExpression') {
      return searchForBinaryPlusConcatenation(node.left)
    }
  }
  return false
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
        
      let usesPlusConcatenation = false

      return {
          Program() {
            usesPlusConcatenation = false
          },
          "Program:exit"(node) {
              if (usesPlusConcatenation) {
                  context.report({
                      node,
                      messageId: "noPlusConcatenation",
                  });
              }
          },
          "VariableDeclaration"(node) {
            usesPlusConcatenation = node?.declarations?.filter(d => d.init?.type === "BinaryExpression" && (d.init?.left.type === 'Literal' || d.init?.right.type === 'Literal') ).length > 0
          },
          "ExpressionStatement"(node) {
            usesPlusConcatenation = searchForBinaryPlusConcatenation(node.expression)
          },
      };
    }
};
