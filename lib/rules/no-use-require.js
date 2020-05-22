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

      return {

          "VariableDeclaration"(node) {
            node.declarations.forEach(d => {
              if (d?.init?.callee?.name === "require") {
                context.report({
                  node,
                  messageId: "noRequire",
                });
              }
            });
          }
      };
    }
};
