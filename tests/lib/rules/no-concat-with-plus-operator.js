/**
 * @fileoverview Do not use &#39;+&#39; operator for concating literals, use template literals instead
 * @author 
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-concat-with-plus-operator"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 11,sourceType: "module", } });
ruleTester.run("no-concat-with-plus-operator", rule, {

    valid: [
      "let foo = `hello world`",
      "let foo = `hello 1`",
      "let foo = `21 guns`",
      "let foo = `{bar} world`"
    ],

    invalid: [
        {
            code: "let foo = 'hello' + 'world'",
            errors: [{
                messageId: "noPlusConcatenation",
                type: "Program"
            }]
        },
        {
          code: "let foo = 'hello' + 1",
          errors: [{
              messageId: "noPlusConcatenation",
              type: "Program"
          }]
        },
        {
          code: "let foo = 21 + 'guns'",
          errors: [{
              messageId: "noPlusConcatenation",
              type: "Program"
          }]
        },
        {
          code: "let foo = bar + 'world'",
          errors: [{
              messageId: "noPlusConcatenation",
              type: "Program"
          }]
        },
        {
          code: "'b' + 'a' + + 'a' + 'a'",
          errors: [{
            messageId: "noPlusConcatenation",
            type: "Program"
        }]
        },
        {
          code: "'d' + 1 + 0 + 0",
          errors: [{
            messageId: "noPlusConcatenation",
            type: "Program"
        }]
        }
    ]
});
