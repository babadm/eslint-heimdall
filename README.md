# eslint-plugin-heimdall

Eslint rules for ragnarok project

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-heimdall`:

```
$ npm install eslint-plugin-eslint-heimdall --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-heimdall` globally.

## Usage

Add `heimdall` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "heimdall"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "heimdall/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





