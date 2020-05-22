/**
 * @fileoverview Given we are enforcing a single export per file, the only export shall be the default one
 * @author 
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Given we are enforcing a single export per file, the only export shall be the default one",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ],
        messages: {
          noExportDefault: "class must be exported with default to avoid verbose import"
        }
    },

    create(context) {

      let exportWithoutDefault = false
      let classFound = false 

      return {
          Program() {
              exportWithoutDefault = false
              classFound = false
          },
          "Program:exit"(node) {
              if (exportWithoutDefault && classFound) {
                  context.report({
                      node,
                      messageId: "noExportDefault",
                  });
              }
          },
          "ExportNamedDeclaration"() {
            exportWithoutDefault = true
          },
          "ClassDeclaration"() {
            classFound = true
          }
      };
  }
};
