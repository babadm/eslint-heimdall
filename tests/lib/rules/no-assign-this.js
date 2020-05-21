/**
 * @fileoverview Do not assign this to a variable, use arrow functions to work with it
 * @author 
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-assign-this"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 11,sourceType: "module", } });
ruleTester.run("no-assign-this", rule, {

    valid: [
      "let foo = this.bar"
    ],

    invalid: [
        {
            code: "let foo = this",
            errors: [{
                messageId: "noAssignThis",
                type: "Program"
            }]
        }
    ]
});
