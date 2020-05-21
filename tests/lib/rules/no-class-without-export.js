/**
 * @fileoverview A class shall always be exported for interaction with other classes
 * @author 
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-class-without-export"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 11,sourceType: "module", } });
ruleTester.run("no-class-without-export", rule, {

    valid: [
             "export default class foo { }",
             "export class foo { }"   
    ],

    invalid: [
        {
          code: "class Foo {}",
          errors: [{
                messageId: "noExport",
                type: "Program"
            }]
        }
    ]
});
