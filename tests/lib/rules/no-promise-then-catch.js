/**
 * @fileoverview Use async-await instead of then chaining for promises 
 * @author 
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-promise-then-catch"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 11,sourceType: "module", } });
ruleTester.run("no-promise-then-catch", rule, {

    valid: [
      "async function foo() {\n await promise\n}",
      "async function foo() {\ntry{\nawait promise\n} catch \n { doSomething() \n}\n}"
    ],

    invalid: [
        {
            code: "promise.then(function foo(){})",
            errors: [{
                messageId: "noThen",
                type: "MemberExpression"
            }]
        },
        {
          code: "promise.then(function foo(){})",
          errors: [{
              messageId: "noThen",
              type: "MemberExpression"
          }]
      },
        {
          code: "promise.catch(function foo(){})",
          errors: [{
              messageId: "noCatch",
              type: "MemberExpression"
          }]
        },
        {
          code: "promise.then(function foo(){}).catch(function foo(){})",
          errors: [{
              messageId: "noThen",
              type: "MemberExpression"
          },{
            messageId: "noCatch",
            type: "MemberExpression"
        }]
      }
    ]
});
