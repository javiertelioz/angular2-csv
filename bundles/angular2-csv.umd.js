(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular2-csv', ['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global['angular2-csv'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,i0,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Angular2CsvService = (function () {
        function Angular2CsvService() {
        }
        Angular2CsvService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        Angular2CsvService.ctorParameters = function () { return []; };
        /** @nocollapse */ Angular2CsvService.ngInjectableDef = i0.defineInjectable({ factory: function Angular2CsvService_Factory() { return new Angular2CsvService(); }, token: Angular2CsvService, providedIn: "root" });
        return Angular2CsvService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Angular2CsvComponent = (function () {
        function Angular2CsvComponent() {
            this.filename = this.filename || 'mycsv.csv';
            this.options = this.objectAssign({}, ConfigDefaults, this.options);
            this.label_btn = "download";
            this.csv = '';
        }
        /**
         * Event Download
         */
        /**
         * Event Download
         * @return {?}
         */
        Angular2CsvComponent.prototype.onDownload = /**
         * Event Download
         * @return {?}
         */
            function () {
                this.generateCsv();
            };
        /**
         * ngOnInit
         */
        /**
         * ngOnInit
         * @return {?}
         */
        Angular2CsvComponent.prototype.ngOnInit = /**
         * ngOnInit
         * @return {?}
         */
            function () { };
        /**
         * [generateCsv description]
         */
        /**
         * [generateCsv description]
         * @return {?}
         */
        Angular2CsvComponent.prototype.generateCsv = /**
         * [generateCsv description]
         * @return {?}
         */
            function () {
                if (this.options.useBom) {
                    this.csv += CsvConfigConsts.BOM;
                }
                if (this.options.showTitle) {
                    this.csv += this.options.title + '\r\n\n';
                }
                this.getHeaders();
                this.getBody();
                if (this.csv === '') {
                    console.log('Invalid data');
                    return;
                }
                var /** @type {?} */ blob = new Blob([this.csv], { type: 'text/csv;charset=utf8;' });
                if (navigator.msSaveBlob) {
                    var /** @type {?} */ filename = this.options.filename.replace(/ /g, '_') + '.csv';
                    navigator.msSaveBlob(blob, filename);
                }
                else {
                    var /** @type {?} */ uri = 'data:attachment/csv;charset=utf-8,' + encodeURI(this.csv);
                    var /** @type {?} */ link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.setAttribute('visibility', 'hidden');
                    link.download = this.filename.replace(/ /g, '_') + '.csv';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
                this.csv = '';
            };
        /**
         * Create Headers for Csv File
         */
        /**
         * Create Headers for Csv File
         * @return {?}
         */
        Angular2CsvComponent.prototype.getHeaders = /**
         * Create Headers for Csv File
         * @return {?}
         */
            function () {
                if (this.options.headers.length > 0) {
                    var /** @type {?} */ row = '';
                    try {
                        for (var _a = __values(this.options.headers), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var column = _b.value;
                            row += column + this.options.fieldSeparator;
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return))
                                _c.call(_a);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
                    }
                    row = row.slice(0, -1);
                    this.csv += row + CsvConfigConsts.EOL;
                }
                var e_1, _c;
            };
        /**
         * Create Headers
         */
        /**
         * Create Headers
         * @return {?}
         */
        Angular2CsvComponent.prototype.getBody = /**
         * Create Headers
         * @return {?}
         */
            function () {
                try {
                    for (var _a = __values(this.data), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var dataRow = _b.value;
                        var /** @type {?} */ row = '';
                        if (this.isEmptyObject(dataRow) && this.options.removeNewLines) {
                            continue;
                        }
                        if (typeof this.options.keys !== 'undefined' && this.options.keys.length) {
                            try {
                                for (var _c = __values(this.options.keys), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var key = _d.value;
                                    row += this.formartData(dataRow[key]) + this.options.fieldSeparator;
                                }
                            }
                            catch (e_2_1) {
                                e_2 = { error: e_2_1 };
                            }
                            finally {
                                try {
                                    if (_d && !_d.done && (_e = _c.return))
                                        _e.call(_c);
                                }
                                finally {
                                    if (e_2)
                                        throw e_2.error;
                                }
                            }
                            row = row.slice(0, -1);
                            this.csv += row + CsvConfigConsts.EOL;
                        }
                        else {
                            for (var /** @type {?} */ key in dataRow) {
                                if (dataRow[key]) {
                                    row += this.formartData(dataRow[key]) + this.options.fieldSeparator;
                                }
                            }
                            this.csv += row + CsvConfigConsts.EOL;
                        }
                    }
                }
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_f = _a.return))
                            _f.call(_a);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
                }
                var e_3, _f, e_2, _e;
            };
        /**
         * Format Data
         */
        /**
         * Format Data
         * @param {?} data
         * @return {?}
         */
        Angular2CsvComponent.prototype.formartData = /**
         * Format Data
         * @param {?} data
         * @return {?}
         */
            function (data) {
                if (this.options.decimalseparator === 'locale' && this.isFloat(data)) {
                    return data.toLocaleString();
                }
                if (this.options.decimalseparator !== '.' && this.isFloat(data)) {
                    return data.toString().replace('.', this.options.decimalseparator);
                }
                if (typeof data === 'string') {
                    data = data.replace(/"/g, '""');
                    if (this.options.quoteStrings || data.indexOf(',') > -1 || data.indexOf("\n") > -1 || data.indexOf("\r") > -1) {
                        data = this.options.quoteStrings + data + this.options.quoteStrings;
                    }
                    return data;
                }
                if (typeof data === 'boolean') {
                    return data ? 'TRUE' : 'FALSE';
                }
                return data;
            };
        /**
         * Validate if object is not empty
         */
        /**
         * Validate if object is not empty
         * @param {?} obj
         * @return {?}
         */
        Angular2CsvComponent.prototype.isEmptyObject = /**
         * Validate if object is not empty
         * @param {?} obj
         * @return {?}
         */
            function (obj) {
                return (obj && (Object.keys(obj).length === 0));
            };
        /**
         * Get Input is Float
         */
        /**
         * Get Input is Float
         * @param {?} input
         * @return {?}
         */
        Angular2CsvComponent.prototype.isFloat = /**
         * Get Input is Float
         * @param {?} input
         * @return {?}
         */
            function (input) {
                return +input === input && (!isFinite(input) || Boolean(input % 1));
            };
        /**
         * Add object Values
         */
        /**
         * Add object Values
         * @param {?} val
         * @return {?}
         */
        Angular2CsvComponent.prototype.toObject = /**
         * Add object Values
         * @param {?} val
         * @return {?}
         */
            function (val) {
                if (val === null || val === undefined) {
                    throw new TypeError('Object.assign cannot be called with null or undefined');
                }
                return Object(val);
            };
        /**
         * Add Values to Object
         */
        /**
         * Add Values to Object
         * @param {?} target
         * @param {...?} source
         * @return {?}
         */
        Angular2CsvComponent.prototype.objectAssign = /**
         * Add Values to Object
         * @param {?} target
         * @param {...?} source
         * @return {?}
         */
            function (target) {
                var source = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    source[_i - 1] = arguments[_i];
                }
                var /** @type {?} */ from;
                var /** @type {?} */ to = this.toObject(target);
                var /** @type {?} */ symbols;
                var /** @type {?} */ hasOwnProperty = Object.prototype.hasOwnProperty;
                var /** @type {?} */ propIsEnumerable = Object.prototype.propertyIsEnumerable;
                for (var /** @type {?} */ s = 1; s < arguments.length; s++) {
                    from = Object(arguments[s]);
                    for (var /** @type {?} */ key in from) {
                        if (hasOwnProperty.call(from, key)) {
                            to[key] = from[key];
                        }
                    }
                    if (((Object)).getOwnPropertySymbols) {
                        symbols = ((Object)).getOwnPropertySymbols(from);
                        try {
                            for (var symbols_1 = __values(symbols), symbols_1_1 = symbols_1.next(); !symbols_1_1.done; symbols_1_1 = symbols_1.next()) {
                                var symbol = symbols_1_1.value;
                                if (propIsEnumerable.call(from, symbol)) {
                                    to[symbol] = from[symbol];
                                }
                            }
                        }
                        catch (e_4_1) {
                            e_4 = { error: e_4_1 };
                        }
                        finally {
                            try {
                                if (symbols_1_1 && !symbols_1_1.done && (_a = symbols_1.return))
                                    _a.call(symbols_1);
                            }
                            finally {
                                if (e_4)
                                    throw e_4.error;
                            }
                        }
                    }
                }
                return to;
                var e_4, _a;
            };
        Angular2CsvComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'angular2csv',
                        template: "<button (click)=\"onDownload()\">{{ label_btn }}</button>",
                        styles: []
                    },] },
        ];
        /** @nocollapse */
        Angular2CsvComponent.ctorParameters = function () { return []; };
        Angular2CsvComponent.propDecorators = {
            data: [{ type: i0.Input }],
            filename: [{ type: i0.Input }],
            options: [{ type: i0.Input }]
        };
        return Angular2CsvComponent;
    }());
    /**
     * CsvConfigConsts
     */
    var CsvConfigConsts = (function () {
        function CsvConfigConsts() {
        }
        CsvConfigConsts.EOL = '\r\n';
        CsvConfigConsts.BOM = '\ufeff';
        CsvConfigConsts.DEFAULT_FIELD_SEPARATOR = ',';
        CsvConfigConsts.DEFAULT_DECIMAL_SEPARATOR = '.';
        CsvConfigConsts.DEFAULT_QUOTE = '"';
        CsvConfigConsts.DEFAULT_SHOW_TITLE = false;
        CsvConfigConsts.DEFAULT_TITLE = 'My Report';
        CsvConfigConsts.DEFAULT_FILENAME = 'mycsv.csv';
        CsvConfigConsts.DEFAULT_SHOW_LABELS = false;
        CsvConfigConsts.DEFAULT_USE_BOM = true;
        CsvConfigConsts.DEFAULT_HEADER = [];
        CsvConfigConsts.DEFAULT_KEY = [];
        CsvConfigConsts.DEFAULT_REMOVE_NEW_LINES = false;
        return CsvConfigConsts;
    }());
    /**
     * Default Configurations
     */
    var /** @type {?} */ ConfigDefaults = {
        filename: CsvConfigConsts.DEFAULT_FILENAME,
        fieldSeparator: CsvConfigConsts.DEFAULT_FIELD_SEPARATOR,
        quoteStrings: CsvConfigConsts.DEFAULT_QUOTE,
        decimalseparator: CsvConfigConsts.DEFAULT_DECIMAL_SEPARATOR,
        showLabels: CsvConfigConsts.DEFAULT_SHOW_LABELS,
        showTitle: CsvConfigConsts.DEFAULT_SHOW_TITLE,
        title: CsvConfigConsts.DEFAULT_TITLE,
        useBom: CsvConfigConsts.DEFAULT_USE_BOM,
        headers: CsvConfigConsts.DEFAULT_HEADER,
        keys: CsvConfigConsts.DEFAULT_KEY,
        removeNewLines: CsvConfigConsts.DEFAULT_REMOVE_NEW_LINES
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Angular2CsvModule = (function () {
        function Angular2CsvModule() {
        }
        Angular2CsvModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ],
                        declarations: [Angular2CsvComponent],
                        exports: [Angular2CsvComponent]
                    },] },
        ];
        return Angular2CsvModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.Angular2CsvService = Angular2CsvService;
    exports.Angular2CsvComponent = Angular2CsvComponent;
    exports.CsvConfigConsts = CsvConfigConsts;
    exports.ConfigDefaults = ConfigDefaults;
    exports.Angular2CsvModule = Angular2CsvModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItY3N2LnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYW5ndWxhcjItY3N2L2xpYi9hbmd1bGFyMi1jc3Yuc2VydmljZS50cyIsbnVsbCwibmc6Ly9hbmd1bGFyMi1jc3YvbGliL2FuZ3VsYXIyLWNzdi5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXIyLWNzdi9saWIvYW5ndWxhcjItY3N2Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXIyQ3N2U2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FuZ3VsYXIyY3N2JyxcbiAgdGVtcGxhdGU6IGA8YnV0dG9uIChjbGljayk9XCJvbkRvd25sb2FkKClcIj57eyBsYWJlbF9idG4gfX08L2J1dHRvbj5gLFxuICBzdHlsZXM6IFtdXG59KVxuXG5leHBvcnQgY2xhc3MgQW5ndWxhcjJDc3ZDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGRhdGE6IGFueVtdO1xuICBASW5wdXQoKSBmaWxlbmFtZTogc3RyaW5nICA9IHRoaXMuZmlsZW5hbWUgfHwgJ215Y3N2LmNzdic7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IE9wdGlvbnMgPSB0aGlzLm9iamVjdEFzc2lnbih7fSwgQ29uZmlnRGVmYXVsdHMsIHRoaXMub3B0aW9ucyk7XG5cbiAgbGFiZWxfYnRuOiBzdHJpbmcgPSBcImRvd25sb2FkXCI7XG4gIGNzdjogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuICAvKipcbiAgICogRXZlbnQgRG93bmxvYWRcbiAgICovXG4gIG9uRG93bmxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5nZW5lcmF0ZUNzdigpO1xuICB9XG4gIC8qKlxuICAgKiBuZ09uSW5pdFxuICAgKi9cbiAgbmdPbkluaXQoKSB7fVxuICAvKipcbiAgICogW2dlbmVyYXRlQ3N2IGRlc2NyaXB0aW9uXVxuICAgKi9cbiAgZ2VuZXJhdGVDc3YoKTogdm9pZCB7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnVzZUJvbSkge1xuICAgICAgdGhpcy5jc3YgKz0gQ3N2Q29uZmlnQ29uc3RzLkJPTTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnNob3dUaXRsZSkge1xuICAgICAgdGhpcy5jc3YgKz0gdGhpcy5vcHRpb25zLnRpdGxlICsgJ1xcclxcblxcbic7XG4gICAgfVxuXG4gICAgdGhpcy5nZXRIZWFkZXJzKCk7XG4gICAgdGhpcy5nZXRCb2R5KCk7XG5cbiAgICBpZiAodGhpcy5jc3YgPT09ICcnKSB7XG4gICAgICBjb25zb2xlLmxvZygnSW52YWxpZCBkYXRhJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGJsb2IgPSBuZXcgQmxvYihbdGhpcy5jc3ZdLCB7dHlwZTogJ3RleHQvY3N2O2NoYXJzZXQ9dXRmODsnfSk7XG5cbiAgICBpZiAobmF2aWdhdG9yLm1zU2F2ZUJsb2IpIHtcblxuICAgICAgbGV0IGZpbGVuYW1lID0gdGhpcy5vcHRpb25zLmZpbGVuYW1lLnJlcGxhY2UoLyAvZywgJ18nKSArICcuY3N2JztcbiAgICAgIG5hdmlnYXRvci5tc1NhdmVCbG9iKGJsb2IsIGZpbGVuYW1lKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGxldCB1cmkgPSAnZGF0YTphdHRhY2htZW50L2NzdjtjaGFyc2V0PXV0Zi04LCcgKyBlbmNvZGVVUkkodGhpcy5jc3YpO1xuICAgICAgbGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICAgIGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgbGluay5kb3dubG9hZCA9IHRoaXMuZmlsZW5hbWUucmVwbGFjZSgvIC9nLCAnXycpICsgJy5jc3YnO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuXG4gICAgICBsaW5rLmNsaWNrKCk7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgfVxuXG4gICAgdGhpcy5jc3YgPSAnJztcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlIEhlYWRlcnMgZm9yIENzdiBGaWxlXG4gICAqL1xuICBnZXRIZWFkZXJzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaGVhZGVycy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgcm93ID0gJyc7XG4gICAgICBmb3IgKGxldCBjb2x1bW4gb2YgdGhpcy5vcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgcm93ICs9IGNvbHVtbiArIHRoaXMub3B0aW9ucy5maWVsZFNlcGFyYXRvcjtcbiAgICAgIH1cblxuICAgICAgcm93ID0gcm93LnNsaWNlKDAsIC0xKTtcbiAgICAgIHRoaXMuY3N2ICs9IHJvdyArIENzdkNvbmZpZ0NvbnN0cy5FT0w7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBDcmVhdGUgSGVhZGVyc1xuICAgKi9cbiAgZ2V0Qm9keSgpOiB2b2lkIHtcblxuICAgIGZvciAobGV0IGRhdGFSb3cgb2YgdGhpcy5kYXRhKSB7XG5cbiAgICAgIGxldCByb3cgPSAnJztcblxuICAgICAgaWYodGhpcy5pc0VtcHR5T2JqZWN0KGRhdGFSb3cpICYmIHRoaXMub3B0aW9ucy5yZW1vdmVOZXdMaW5lcykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMua2V5cyAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5vcHRpb25zLmtleXMubGVuZ3RoKSB7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMub3B0aW9ucy5rZXlzKSB7XG4gICAgICAgICAgcm93ICs9IHRoaXMuZm9ybWFydERhdGEoZGF0YVJvd1trZXldKSArIHRoaXMub3B0aW9ucy5maWVsZFNlcGFyYXRvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJvdyA9IHJvdy5zbGljZSgwLCAtMSk7XG4gICAgICAgIHRoaXMuY3N2ICs9IHJvdyArIENzdkNvbmZpZ0NvbnN0cy5FT0w7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGRhdGFSb3cpIHtcbiAgICAgICAgICBpZihkYXRhUm93W2tleV0pIHtcbiAgICAgICAgICAgIHJvdyArPSB0aGlzLmZvcm1hcnREYXRhKGRhdGFSb3dba2V5XSkgKyB0aGlzLm9wdGlvbnMuZmllbGRTZXBhcmF0b3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3N2ICs9IHJvdyArIENzdkNvbmZpZ0NvbnN0cy5FT0w7XG5cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEZvcm1hdCBEYXRhXG4gICAqL1xuICBmb3JtYXJ0RGF0YShkYXRhOiBhbnkpIHtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVjaW1hbHNlcGFyYXRvciA9PT0gJ2xvY2FsZScgJiYgdGhpcy5pc0Zsb2F0KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS50b0xvY2FsZVN0cmluZygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVjaW1hbHNlcGFyYXRvciAhPT0gJy4nICYmIHRoaXMuaXNGbG9hdChkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKS5yZXBsYWNlKCcuJywgdGhpcy5vcHRpb25zLmRlY2ltYWxzZXBhcmF0b3IpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UoL1wiL2csICdcIlwiJyk7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucXVvdGVTdHJpbmdzIHx8IGRhdGEuaW5kZXhPZignLCcpID4gLTEgfHwgZGF0YS5pbmRleE9mKFwiXFxuXCIpID4gLTEgfHwgZGF0YS5pbmRleE9mKFwiXFxyXCIpID4gLTEpIHtcbiAgICAgICAgZGF0YSA9IHRoaXMub3B0aW9ucy5xdW90ZVN0cmluZ3MgKyBkYXRhICsgdGhpcy5vcHRpb25zLnF1b3RlU3RyaW5ncztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiBkYXRhID8gJ1RSVUUnIDogJ0ZBTFNFJztcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuICAvKipcbiAgICogVmFsaWRhdGUgaWYgb2JqZWN0IGlzIG5vdCBlbXB0eVxuICAgKi9cbiAgaXNFbXB0eU9iamVjdChvYmo6IGFueSkge1xuICAgIHJldHVybiAob2JqICYmIChPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA9PT0gMCkpO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgSW5wdXQgaXMgRmxvYXRcbiAgICovXG4gIGlzRmxvYXQoaW5wdXQ6IGFueSkge1xuICAgIHJldHVybiAraW5wdXQgPT09IGlucHV0ICYmICghaXNGaW5pdGUoaW5wdXQpIHx8IEJvb2xlYW4oaW5wdXQgJSAxKSk7XG4gIH1cbiAgLyoqXG4gICAqIEFkZCBvYmplY3QgVmFsdWVzXG4gICAqL1xuICB0b09iamVjdCh2YWw6IGFueSkge1xuICAgIGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3QodmFsKTtcbiAgfVxuICAvKipcbiAgICogQWRkIFZhbHVlcyB0byBPYmplY3RcbiAgICovXG4gIG9iamVjdEFzc2lnbih0YXJnZXQ6IGFueSwgLi4uc291cmNlOiBhbnlbXSkge1xuICAgIGxldCBmcm9tOiBhbnk7XG4gICAgbGV0IHRvID0gdGhpcy50b09iamVjdCh0YXJnZXQpO1xuICAgIGxldCBzeW1ib2xzOiBhbnk7XG5cbiAgICBsZXQgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICAgIGxldCBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuICAgIGZvciAobGV0IHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG4gICAgICBmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cbiAgICAgIGZvciAobGV0IGtleSBpbiBmcm9tKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcbiAgICAgICAgICB0b1trZXldID0gZnJvbVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICgoPGFueT4gT2JqZWN0KS5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICAgICAgc3ltYm9scyA9ICg8YW55PiBPYmplY3QpLmdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcbiAgICAgICAgZm9yIChsZXQgc3ltYm9sIG9mIHN5bWJvbHMpIHtcbiAgICAgICAgICBpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbCkpIHtcbiAgICAgICAgICAgIHRvW3N5bWJvbF0gPSBmcm9tW3N5bWJvbF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvO1xuICB9XG59XG4vKipcbiAqIE9wdGlvbiBJbnRlcmZhY2VcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zIHtcbiAgZmlsZW5hbWU6IHN0cmluZztcbiAgZmllbGRTZXBhcmF0b3I6IHN0cmluZztcbiAgcXVvdGVTdHJpbmdzOiBzdHJpbmc7XG4gIGRlY2ltYWxzZXBhcmF0b3I6IHN0cmluZztcbiAgc2hvd0xhYmVsczogYm9vbGVhbjtcbiAgc2hvd1RpdGxlOiBib29sZWFuO1xuICB0aXRsZTogc3RyaW5nO1xuICB1c2VCb206IGJvb2xlYW47XG4gIGhlYWRlcnM6IHN0cmluZ1tdO1xuICBrZXlzOiBzdHJpbmdbXTtcbiAgcmVtb3ZlTmV3TGluZXM6IGJvb2xlYW47XG59XG4vKipcbiAqIENzdkNvbmZpZ0NvbnN0c1xuICovXG5leHBvcnQgY2xhc3MgQ3N2Q29uZmlnQ29uc3RzIHtcblxuICBwdWJsaWMgc3RhdGljIEVPTCA9ICdcXHJcXG4nO1xuICBwdWJsaWMgc3RhdGljIEJPTSA9ICdcXHVmZWZmJztcblxuICBwdWJsaWMgc3RhdGljIERFRkFVTFRfRklFTERfU0VQQVJBVE9SID0gJywnO1xuICBwdWJsaWMgc3RhdGljIERFRkFVTFRfREVDSU1BTF9TRVBBUkFUT1IgPSAnLic7XG4gIHB1YmxpYyBzdGF0aWMgREVGQVVMVF9RVU9URSA9ICdcIic7XG4gIHB1YmxpYyBzdGF0aWMgREVGQVVMVF9TSE9XX1RJVExFID0gZmFsc2U7XG4gIHB1YmxpYyBzdGF0aWMgREVGQVVMVF9USVRMRSA9ICdNeSBSZXBvcnQnO1xuICBwdWJsaWMgc3RhdGljIERFRkFVTFRfRklMRU5BTUUgPSAnbXljc3YuY3N2JztcbiAgcHVibGljIHN0YXRpYyBERUZBVUxUX1NIT1dfTEFCRUxTID0gZmFsc2U7XG4gIHB1YmxpYyBzdGF0aWMgREVGQVVMVF9VU0VfQk9NID0gdHJ1ZTtcbiAgcHVibGljIHN0YXRpYyBERUZBVUxUX0hFQURFUjogc3RyaW5nW10gPSBbXTtcbiAgcHVibGljIHN0YXRpYyBERUZBVUxUX0tFWTogc3RyaW5nW10gPSBbXTtcbiAgcHVibGljIHN0YXRpYyBERUZBVUxUX1JFTU9WRV9ORVdfTElORVMgPSBmYWxzZTtcbn1cbi8qKlxuICogRGVmYXVsdCBDb25maWd1cmF0aW9uc1xuICovXG5leHBvcnQgY29uc3QgQ29uZmlnRGVmYXVsdHM6IE9wdGlvbnMgPSB7XG4gIGZpbGVuYW1lOiBDc3ZDb25maWdDb25zdHMuREVGQVVMVF9GSUxFTkFNRSxcbiAgZmllbGRTZXBhcmF0b3I6IENzdkNvbmZpZ0NvbnN0cy5ERUZBVUxUX0ZJRUxEX1NFUEFSQVRPUixcbiAgcXVvdGVTdHJpbmdzOiBDc3ZDb25maWdDb25zdHMuREVGQVVMVF9RVU9URSxcbiAgZGVjaW1hbHNlcGFyYXRvcjogQ3N2Q29uZmlnQ29uc3RzLkRFRkFVTFRfREVDSU1BTF9TRVBBUkFUT1IsXG4gIHNob3dMYWJlbHM6IENzdkNvbmZpZ0NvbnN0cy5ERUZBVUxUX1NIT1dfTEFCRUxTLFxuICBzaG93VGl0bGU6IENzdkNvbmZpZ0NvbnN0cy5ERUZBVUxUX1NIT1dfVElUTEUsXG4gIHRpdGxlOiBDc3ZDb25maWdDb25zdHMuREVGQVVMVF9USVRMRSxcbiAgdXNlQm9tOiBDc3ZDb25maWdDb25zdHMuREVGQVVMVF9VU0VfQk9NLFxuICBoZWFkZXJzOiBDc3ZDb25maWdDb25zdHMuREVGQVVMVF9IRUFERVIsXG4gIGtleXM6IENzdkNvbmZpZ0NvbnN0cy5ERUZBVUxUX0tFWSxcbiAgcmVtb3ZlTmV3TGluZXM6IENzdkNvbmZpZ0NvbnN0cy5ERUZBVUxUX1JFTU9WRV9ORVdfTElORVNcbn07XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgQW5ndWxhcjJDc3ZDb21wb25lbnQgfSBmcm9tICcuL2FuZ3VsYXIyLWNzdi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0FuZ3VsYXIyQ3N2Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0FuZ3VsYXIyQ3N2Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyMkNzdk1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwidHNsaWJfMS5fX3ZhbHVlcyIsIkNvbXBvbmVudCIsIklucHV0IiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQU9FO1NBQWlCOztvQkFMbEJBLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7O2lDQUpEOzs7SUNBQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxzQkE0RnlCLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUM7WUFBRSxPQUFP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