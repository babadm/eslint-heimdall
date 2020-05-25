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
      return node
    }
    else if(node.left === 'BinaryExpression') {
      return searchForBinaryPlusConcatenation(node.left)
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
        
      let usesPlusConcatenation = []

      return {
          Program() {
            usesPlusConcatenation = []
          },
          "Program:exit"(node) {
              if (usesPlusConcatenation.length > 0) {
                  usesPlusConcatenation.forEach(
                    n => {
                      context.report({
                      node:n,
                      messageId: "noPlusConcatenation",
                  })}
                )
                  
              }
          },
          "VariableDeclaration"(node) {
            const guiltyNodes = node?.declarations?.filter(d => d.init?.type === "BinaryExpression" && (d.init?.left.type === 'Literal' || d.init?.right.type === 'Literal') )
            usesPlusConcatenation = usesPlusConcatenation.concat(guiltyNodes)
          },
          "ExpressionStatement"(node) {
            const guiltyNode = searchForBinaryPlusConcatenation(node.expression)
            if(guiltyNode !== undefined) {
              usesPlusConcatenation.push(guiltyNode)
            }
          },
      };
    }
};
