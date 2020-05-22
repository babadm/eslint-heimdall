/**
 * @fileoverview use let or const instead of var when declaring variables
 * @author 
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-use-var"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 11,sourceType: "module", } });
ruleTester.run("no-use-var", rule, {

    valid: [
      "let foo = 'bar'",
      "const foo = 'bar'"

    ],

    invalid: [
        {
            code: "var foo = \"bar\"",
            errors: [{
                messageId: "noVar",
                type: "VariableDeclaration"
            }]
        }
    ]
});
