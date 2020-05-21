/**
 * @fileoverview Given we are enforcing a single export per file, the only export shall be the default one
 * @author 
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-export-without-default"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 11,sourceType: "module", } });
ruleTester.run("no-export-without-default", rule, {

    valid: [
      "export default class foo {}"
    ],

    invalid: [
        {
            code: "export class foo {}",
            errors: [{
                messageId: "noExportDefault",
                type: "Program"
            }]
        }
    ]
});
