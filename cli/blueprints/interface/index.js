"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../models/config");
const app_utils_1 = require("../../utilities/app-utils");
const stringUtils = require('ember-cli-string-utils');
const dynamicPathParser = require('../../utilities/dynamic-path-parser');
const Blueprint = require('../../ember-cli/lib/models/blueprint');
exports.default = Blueprint.extend({
    description: '',
    aliases: ['i'],
    anonymousOptions: [
        '<interface-type>'
    ],
    availableOptions: [
        {
            name: 'app',
            type: String,
            aliases: ['a'],
            description: 'Specifies app name to use.'
        }
    ],
    normalizeEntityName: function (entityName) {
        const appConfig = app_utils_1.getAppFromConfig(this.options.app);
        const parsedPath = dynamicPathParser(this.project, entityName, appConfig);
        this.dynamicPath = parsedPath;
        return parsedPath.name;
    },
    locals: function (options) {
        const interfaceType = options.args[2];
        this.fileName = stringUtils.dasherize(options.entity.name);
        if (interfaceType) {
            this.fileName += '.' + interfaceType;
        }
        const prefix = config_1.CliConfig.getValue('defaults.interface.prefix');
        return {
            dynamicPath: this.dynamicPath.dir,
            flat: options.flat,
            fileName: this.fileName,
            prefix: prefix
        };
    },
    fileMapTokens: function () {
        // Return custom template variables here.
        return {
            __path__: () => {
                this.generatePath = this.dynamicPath.dir;
                return this.generatePath;
            },
            __name__: () => {
                return this.fileName;
            }
        };
    }
});
//# sourceMappingURL=/users/hansl/sources/angular-cli/blueprints/interface/index.js.map