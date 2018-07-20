import { Injectable, NgModule, defineInjectable, Component, Input } from '@angular/core';
import { __values } from 'tslib';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Angular2CsvService = /** @class */ (function () {
    function Angular2CsvService() {
    }
    Angular2CsvService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    Angular2CsvService.ctorParameters = function () { return []; };
    /** @nocollapse */ Angular2CsvService.ngInjectableDef = defineInjectable({ factory: function Angular2CsvService_Factory() { return new Angular2CsvService(); }, token: Angular2CsvService, providedIn: "root" });
    return Angular2CsvService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Angular2CsvComponent = /** @class */ (function () {
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
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
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
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_e = _c.return)) _e.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
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
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
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
            if ((/** @type {?} */ (Object)).getOwnPropertySymbols) {
                symbols = (/** @type {?} */ (Object)).getOwnPropertySymbols(from);
                try {
                    for (var symbols_1 = __values(symbols), symbols_1_1 = symbols_1.next(); !symbols_1_1.done; symbols_1_1 = symbols_1.next()) {
                        var symbol = symbols_1_1.value;
                        if (propIsEnumerable.call(from, symbol)) {
                            to[symbol] = from[symbol];
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (symbols_1_1 && !symbols_1_1.done && (_a = symbols_1.return)) _a.call(symbols_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        return to;
        var e_4, _a;
    };
    Angular2CsvComponent.decorators = [
        { type: Component, args: [{
                    selector: 'angular2csv',
                    template: "<button (click)=\"onDownload()\">{{ label_btn }}</button>",
                    styles: []
                },] },
    ];
    /** @nocollapse */
    Angular2CsvComponent.ctorParameters = function () { return []; };
    Angular2CsvComponent.propDecorators = {
        data: [{ type: Input }],
        filename: [{ type: Input }],
        options: [{ type: Input }]
    };
    return Angular2CsvComponent;
}());
/**
 * CsvConfigConsts
 */
var CsvConfigConsts = /** @class */ (function () {
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
var Angular2CsvModule = /** @class */ (function () {
    function Angular2CsvModule() {
    }
    Angular2CsvModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
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

export { Angular2CsvService, Angular2CsvComponent, CsvConfigConsts, ConfigDefaults, Angular2CsvModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItY3N2LmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyMi1jc3YvbGliL2FuZ3VsYXIyLWNzdi5zZXJ2aWNlLnRzIiwibmc6Ly9hbmd1bGFyMi1jc3YvbGliL2FuZ3VsYXIyLWNzdi5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXIyLWNzdi9saWIvYW5ndWxhcjItY3N2Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXIyQ3N2U2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhbmd1bGFyMmNzdicsXG4gIHRlbXBsYXRlOiBgPGJ1dHRvbiAoY2xpY2spPVwib25Eb3dubG9hZCgpXCI+e3sgbGFiZWxfYnRuIH19PC9idXR0b24+YCxcbiAgc3R5bGVzOiBbXVxufSlcblxuZXhwb3J0IGNsYXNzIEFuZ3VsYXIyQ3N2Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBkYXRhOiBhbnlbXTtcbiAgQElucHV0KCkgZmlsZW5hbWU6IHN0cmluZyAgPSB0aGlzLmZpbGVuYW1lIHx8ICdteWNzdi5jc3YnO1xuICBASW5wdXQoKSBvcHRpb25zOiBPcHRpb25zID0gdGhpcy5vYmplY3RBc3NpZ24oe30sIENvbmZpZ0RlZmF1bHRzLCB0aGlzLm9wdGlvbnMpO1xuXG4gIGxhYmVsX2J0bjogc3RyaW5nID0gXCJkb3dubG9hZFwiO1xuICBjc3Y6IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cbiAgLyoqXG4gICAqIEV2ZW50IERvd25sb2FkXG4gICAqL1xuICBvbkRvd25sb2FkKCk6IHZvaWQge1xuICAgIHRoaXMuZ2VuZXJhdGVDc3YoKTtcbiAgfVxuICAvKipcbiAgICogbmdPbkluaXRcbiAgICovXG4gIG5nT25Jbml0KCkge31cbiAgLyoqXG4gICAqIFtnZW5lcmF0ZUNzdiBkZXNjcmlwdGlvbl1cbiAgICovXG4gIGdlbmVyYXRlQ3N2KCk6IHZvaWQge1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy51c2VCb20pIHtcbiAgICAgIHRoaXMuY3N2ICs9IENzdkNvbmZpZ0NvbnN0cy5CT007XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zaG93VGl0bGUpIHtcbiAgICAgIHRoaXMuY3N2ICs9IHRoaXMub3B0aW9ucy50aXRsZSArICdcXHJcXG5cXG4nO1xuICAgIH1cblxuICAgIHRoaXMuZ2V0SGVhZGVycygpO1xuICAgIHRoaXMuZ2V0Qm9keSgpO1xuXG4gICAgaWYgKHRoaXMuY3N2ID09PSAnJykge1xuICAgICAgY29uc29sZS5sb2coJ0ludmFsaWQgZGF0YScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBibG9iID0gbmV3IEJsb2IoW3RoaXMuY3N2XSwge3R5cGU6ICd0ZXh0L2NzdjtjaGFyc2V0PXV0Zjg7J30pO1xuXG4gICAgaWYgKG5hdmlnYXRvci5tc1NhdmVCbG9iKSB7XG5cbiAgICAgIGxldCBmaWxlbmFtZSA9IHRoaXMub3B0aW9ucy5maWxlbmFtZS5yZXBsYWNlKC8gL2csICdfJykgKyAnLmNzdic7XG4gICAgICBuYXZpZ2F0b3IubXNTYXZlQmxvYihibG9iLCBmaWxlbmFtZSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBsZXQgdXJpID0gJ2RhdGE6YXR0YWNobWVudC9jc3Y7Y2hhcnNldD11dGYtOCwnICsgZW5jb2RlVVJJKHRoaXMuY3N2KTtcbiAgICAgIGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXG4gICAgICBsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgIGxpbmsuZG93bmxvYWQgPSB0aGlzLmZpbGVuYW1lLnJlcGxhY2UoLyAvZywgJ18nKSArICcuY3N2JztcblxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcblxuICAgICAgbGluay5jbGljaygpO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xuICAgIH1cblxuICAgIHRoaXMuY3N2ID0gJyc7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZSBIZWFkZXJzIGZvciBDc3YgRmlsZVxuICAgKi9cbiAgZ2V0SGVhZGVycygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmhlYWRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IHJvdyA9ICcnO1xuICAgICAgZm9yIChsZXQgY29sdW1uIG9mIHRoaXMub3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgIHJvdyArPSBjb2x1bW4gKyB0aGlzLm9wdGlvbnMuZmllbGRTZXBhcmF0b3I7XG4gICAgICB9XG5cbiAgICAgIHJvdyA9IHJvdy5zbGljZSgwLCAtMSk7XG4gICAgICB0aGlzLmNzdiArPSByb3cgKyBDc3ZDb25maWdDb25zdHMuRU9MO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogQ3JlYXRlIEhlYWRlcnNcbiAgICovXG4gIGdldEJvZHkoKTogdm9pZCB7XG5cbiAgICBmb3IgKGxldCBkYXRhUm93IG9mIHRoaXMuZGF0YSkge1xuXG4gICAgICBsZXQgcm93ID0gJyc7XG5cbiAgICAgIGlmKHRoaXMuaXNFbXB0eU9iamVjdChkYXRhUm93KSAmJiB0aGlzLm9wdGlvbnMucmVtb3ZlTmV3TGluZXMpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLmtleXMgIT09ICd1bmRlZmluZWQnICYmIHRoaXMub3B0aW9ucy5rZXlzLmxlbmd0aCkge1xuXG4gICAgICAgIGZvciAobGV0IGtleSBvZiB0aGlzLm9wdGlvbnMua2V5cykge1xuICAgICAgICAgIHJvdyArPSB0aGlzLmZvcm1hcnREYXRhKGRhdGFSb3dba2V5XSkgKyB0aGlzLm9wdGlvbnMuZmllbGRTZXBhcmF0b3I7XG4gICAgICAgIH1cblxuICAgICAgICByb3cgPSByb3cuc2xpY2UoMCwgLTEpO1xuICAgICAgICB0aGlzLmNzdiArPSByb3cgKyBDc3ZDb25maWdDb25zdHMuRU9MO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBkYXRhUm93KSB7XG4gICAgICAgICAgaWYoZGF0YVJvd1trZXldKSB7XG4gICAgICAgICAgICByb3cgKz0gdGhpcy5mb3JtYXJ0RGF0YShkYXRhUm93W2tleV0pICsgdGhpcy5vcHRpb25zLmZpZWxkU2VwYXJhdG9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNzdiArPSByb3cgKyBDc3ZDb25maWdDb25zdHMuRU9MO1xuXG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBGb3JtYXQgRGF0YVxuICAgKi9cbiAgZm9ybWFydERhdGEoZGF0YTogYW55KSB7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmRlY2ltYWxzZXBhcmF0b3IgPT09ICdsb2NhbGUnICYmIHRoaXMuaXNGbG9hdChkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmRlY2ltYWxzZXBhcmF0b3IgIT09ICcuJyAmJiB0aGlzLmlzRmxvYXQoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCkucmVwbGFjZSgnLicsIHRoaXMub3B0aW9ucy5kZWNpbWFsc2VwYXJhdG9yKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICBkYXRhID0gZGF0YS5yZXBsYWNlKC9cIi9nLCAnXCJcIicpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnF1b3RlU3RyaW5ncyB8fCBkYXRhLmluZGV4T2YoJywnKSA+IC0xIHx8IGRhdGEuaW5kZXhPZihcIlxcblwiKSA+IC0xIHx8IGRhdGEuaW5kZXhPZihcIlxcclwiKSA+IC0xKSB7XG4gICAgICAgIGRhdGEgPSB0aGlzLm9wdGlvbnMucXVvdGVTdHJpbmdzICsgZGF0YSArIHRoaXMub3B0aW9ucy5xdW90ZVN0cmluZ3M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICByZXR1cm4gZGF0YSA/ICdUUlVFJyA6ICdGQUxTRSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cbiAgLyoqXG4gICAqIFZhbGlkYXRlIGlmIG9iamVjdCBpcyBub3QgZW1wdHlcbiAgICovXG4gIGlzRW1wdHlPYmplY3Qob2JqOiBhbnkpIHtcbiAgICByZXR1cm4gKG9iaiAmJiAoT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDApKTtcbiAgfVxuICAvKipcbiAgICogR2V0IElucHV0IGlzIEZsb2F0XG4gICAqL1xuICBpc0Zsb2F0KGlucHV0OiBhbnkpIHtcbiAgICByZXR1cm4gK2lucHV0ID09PSBpbnB1dCAmJiAoIWlzRmluaXRlKGlucHV0KSB8fCBCb29sZWFuKGlucHV0ICUgMSkpO1xuICB9XG4gIC8qKlxuICAgKiBBZGQgb2JqZWN0IFZhbHVlc1xuICAgKi9cbiAgdG9PYmplY3QodmFsOiBhbnkpIHtcbiAgICBpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0KHZhbCk7XG4gIH1cbiAgLyoqXG4gICAqIEFkZCBWYWx1ZXMgdG8gT2JqZWN0XG4gICAqL1xuICBvYmplY3RBc3NpZ24odGFyZ2V0OiBhbnksIC4uLnNvdXJjZTogYW55W10pIHtcbiAgICBsZXQgZnJvbTogYW55O1xuICAgIGxldCB0byA9IHRoaXMudG9PYmplY3QodGFyZ2V0KTtcbiAgICBsZXQgc3ltYm9sczogYW55O1xuXG4gICAgbGV0IGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgICBsZXQgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbiAgICBmb3IgKGxldCBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuICAgICAgZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG4gICAgICBmb3IgKGxldCBrZXkgaW4gZnJvbSkge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG4gICAgICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoKDxhbnk+IE9iamVjdCkuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgICAgIHN5bWJvbHMgPSAoPGFueT4gT2JqZWN0KS5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG4gICAgICAgIGZvciAobGV0IHN5bWJvbCBvZiBzeW1ib2xzKSB7XG4gICAgICAgICAgaWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2wpKSB7XG4gICAgICAgICAgICB0b1tzeW1ib2xdID0gZnJvbVtzeW1ib2xdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0bztcbiAgfVxufVxuLyoqXG4gKiBPcHRpb24gSW50ZXJmYWNlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9ucyB7XG4gIGZpbGVuYW1lOiBzdHJpbmc7XG4gIGZpZWxkU2VwYXJhdG9yOiBzdHJpbmc7XG4gIHF1b3RlU3RyaW5nczogc3RyaW5nO1xuICBkZWNpbWFsc2VwYXJhdG9yOiBzdHJpbmc7XG4gIHNob3dMYWJlbHM6IGJvb2xlYW47XG4gIHNob3dUaXRsZTogYm9vbGVhbjtcbiAgdGl0bGU6IHN0cmluZztcbiAgdXNlQm9tOiBib29sZWFuO1xuICBoZWFkZXJzOiBzdHJpbmdbXTtcbiAga2V5czogc3RyaW5nW107XG4gIHJlbW92ZU5ld0xpbmVzOiBib29sZWFuO1xufVxuLyoqXG4gKiBDc3ZDb25maWdDb25zdHNcbiAqL1xuZXhwb3J0IGNsYXNzIENzdkNvbmZpZ0NvbnN0cyB7XG5cbiAgcHVibGljIHN0YXRpYyBFT0wgPSAnXFxyXFxuJztcbiAgcHVibGljIHN0YXRpYyBCT00gPSAnXFx1ZmVmZic7XG5cbiAgcHVibGljIHN0YXRpYyBERUZBVUxUX0ZJRUxEX1NFUEFSQVRPUiA9ICcsJztcbiAgcHVibGljIHN0YXRpYyBERUZBVUxUX0RFQ0lNQUxfU0VQQVJBVE9SID0gJy4nO1xuICBwdWJsaWMgc3RhdGljIERFRkFVTFRfUVVPVEUgPSAnXCInO1xuICBwdWJsaWMgc3RhdGljIERFRkFVTFRfU0hPV19USVRMRSA9IGZhbHNlO1xuICBwdWJsaWMgc3RhdGljIERFRkFVTFRfVElUTEUgPSAnTXkgUmVwb3J0JztcbiAgcHVibGljIHN0YXRpYyBERUZBVUxUX0ZJTEVOQU1FID0gJ215Y3N2LmNzdic7XG4gIHB1YmxpYyBzdGF0aWMgREVGQVVMVF9TSE9XX0xBQkVMUyA9IGZhbHNlO1xuICBwdWJsaWMgc3RhdGljIERFRkFVTFRfVVNFX0JPTSA9IHRydWU7XG4gIHB1YmxpYyBzdGF0aWMgREVGQVVMVF9IRUFERVI6IHN0cmluZ1tdID0gW107XG4gIHB1YmxpYyBzdGF0aWMgREVGQVVMVF9LRVk6IHN0cmluZ1tdID0gW107XG4gIHB1YmxpYyBzdGF0aWMgREVGQVVMVF9SRU1PVkVfTkVXX0xJTkVTID0gZmFsc2U7XG59XG4vKipcbiAqIERlZmF1bHQgQ29uZmlndXJhdGlvbnNcbiAqL1xuZXhwb3J0IGNvbnN0IENvbmZpZ0RlZmF1bHRzOiBPcHRpb25zID0ge1xuICBmaWxlbmFtZTogQ3N2Q29uZmlnQ29uc3RzLkRFRkFVTFRfRklMRU5BTUUsXG4gIGZpZWxkU2VwYXJhdG9yOiBDc3ZDb25maWdDb25zdHMuREVGQVVMVF9GSUVMRF9TRVBBUkFUT1IsXG4gIHF1b3RlU3RyaW5nczogQ3N2Q29uZmlnQ29uc3RzLkRFRkFVTFRfUVVPVEUsXG4gIGRlY2ltYWxzZXBhcmF0b3I6IENzdkNvbmZpZ0NvbnN0cy5ERUZBVUxUX0RFQ0lNQUxfU0VQQVJBVE9SLFxuICBzaG93TGFiZWxzOiBDc3ZDb25maWdDb25zdHMuREVGQVVMVF9TSE9XX0xBQkVMUyxcbiAgc2hvd1RpdGxlOiBDc3ZDb25maWdDb25zdHMuREVGQVVMVF9TSE9XX1RJVExFLFxuICB0aXRsZTogQ3N2Q29uZmlnQ29uc3RzLkRFRkFVTFRfVElUTEUsXG4gIHVzZUJvbTogQ3N2Q29uZmlnQ29uc3RzLkRFRkFVTFRfVVNFX0JPTSxcbiAgaGVhZGVyczogQ3N2Q29uZmlnQ29uc3RzLkRFRkFVTFRfSEVBREVSLFxuICBrZXlzOiBDc3ZDb25maWdDb25zdHMuREVGQVVMVF9LRVksXG4gIHJlbW92ZU5ld0xpbmVzOiBDc3ZDb25maWdDb25zdHMuREVGQVVMVF9SRU1PVkVfTkVXX0xJTkVTXG59O1xuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEFuZ3VsYXIyQ3N2Q29tcG9uZW50IH0gZnJvbSAnLi9hbmd1bGFyMi1jc3YuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtBbmd1bGFyMkNzdkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtBbmd1bGFyMkNzdkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcjJDc3ZNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX3ZhbHVlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtJQU9FO0tBQWlCOztnQkFMbEIsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7NkJBSkQ7Ozs7Ozs7O0lDaUJFO3dCQU42QixJQUFJLENBQUMsUUFBUSxJQUFJLFdBQVc7dUJBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUUzRCxVQUFVO21CQUNoQixFQUFFO0tBRUE7Ozs7Ozs7O0lBSWhCLHlDQUFVOzs7O0lBQVY7UUFDRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEI7Ozs7Ozs7O0lBSUQsdUNBQVE7Ozs7SUFBUixlQUFhOzs7Ozs7OztJQUliLDBDQUFXOzs7O0lBQVg7UUFFRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxHQUFHLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQztTQUNqQztRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDMUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7U0FDM0M7UUFFRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWYsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsRUFBRTtZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzVCLE9BQU87U0FDUjtRQUVELHFCQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBQyxDQUFDLENB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