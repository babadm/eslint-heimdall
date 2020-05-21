/**
 * @fileoverview A class shall always be exported for interaction with other classes
 * @author 
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "A class shall always be exported for interaction with other classes",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ],
        messages: {
          noExport: "class must be exported so it can be used on other classes"
        }
    },

    create(context) {

      let exportFound = false

      return {
          Program() {
              exportFound = false
          },
          "Program:exit"(node) {
              if (!exportFound) {
                  context.report({
                      node,
                      messageId: "noExport",
                  });
              }
          },
          "ExportDefaultDeclaration"() {
            exportFound = true
          },
          "ExportNamedDeclaration"() {
            exportFound = true
          }
      };
  }
};
