/**
 * @fileoverview Use import instead of require
 * @author 
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-use-require"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2020,sourceType: "module", } });
ruleTester.run("no-use-require", rule, {

    valid: [
      "import foo from 'bar'",
      "import {foo} from 'bar'",
      "import * as foo from 'bar'"
    ],

    invalid: [
        {
            code: "let foo = require(\"bar\")",
            errors: [{
                messageId: "noRequire",
                type: "VariableDeclaration"
            }]
        }
    ]
});
