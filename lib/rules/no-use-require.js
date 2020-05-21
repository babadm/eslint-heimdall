/**
 * @fileoverview Use import instead of require
 * @author 
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Use import instead of require",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ],
        messages: {
          noRequire: "Use import instead of require"
        }
    },

    create: function(context) {


      let isThereAnyRequire = false

      return {
          Program() {
            isThereAnyRequire = false
          },
          "Program:exit"(node) {
              if (isThereAnyRequire) {
                  context.report({
                      node,
                      messageId: "noRequire",
                  });
              }
          },
          "VariableDeclaration"(node) {
            node.declarations.forEach(d => {
              if (d?.init?.callee?.name === "require") {
                isThereAnyRequire = true
              }
            });
          }
      };
    }
};
