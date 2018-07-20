/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
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
                for (var _a = tslib_1.__values(this.options.headers), _b = _a.next(); !_b.done; _b = _a.next()) {
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
            for (var _a = tslib_1.__values(this.data), _b = _a.next(); !_b.done; _b = _a.next()) {
                var dataRow = _b.value;
                var /** @type {?} */ row = '';
                if (this.isEmptyObject(dataRow) && this.options.removeNewLines) {
                    continue;
                }
                if (typeof this.options.keys !== 'undefined' && this.options.keys.length) {
                    try {
                        for (var _c = tslib_1.__values(this.options.keys), _d = _c.next(); !_d.done; _d = _c.next()) {
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
                    for (var symbols_1 = tslib_1.__values(symbols), symbols_1_1 = symbols_1.next(); !symbols_1_1.done; symbols_1_1 = symbols_1.next()) {
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
export { Angular2CsvComponent };
function Angular2CsvComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    Angular2CsvComponent.prototype.data;
    /** @type {?} */
    Angular2CsvComponent.prototype.filename;
    /** @type {?} */
    Angular2CsvComponent.prototype.options;
    /** @type {?} */
    Angular2CsvComponent.prototype.label_btn;
    /** @type {?} */
    Angular2CsvComponent.prototype.csv;
}
/**
 * Option Interface
 * @record
 */
export function Options() { }
function Options_tsickle_Closure_declarations() {
    /** @type {?} */
    Options.prototype.filename;
    /** @type {?} */
    Options.prototype.fieldSeparator;
    /** @type {?} */
    Options.prototype.quoteStrings;
    /** @type {?} */
    Options.prototype.decimalseparator;
    /** @type {?} */
    Options.prototype.showLabels;
    /** @type {?} */
    Options.prototype.showTitle;
    /** @type {?} */
    Options.prototype.title;
    /** @type {?} */
    Options.prototype.useBom;
    /** @type {?} */
    Options.prototype.headers;
    /** @type {?} */
    Options.prototype.keys;
    /** @type {?} */
    Options.prototype.removeNewLines;
}
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
export { CsvConfigConsts };
function CsvConfigConsts_tsickle_Closure_declarations() {
    /** @type {?} */
    CsvConfigConsts.EOL;
    /** @type {?} */
    CsvConfigConsts.BOM;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_FIELD_SEPARATOR;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_DECIMAL_SEPARATOR;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_QUOTE;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_SHOW_TITLE;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_TITLE;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_FILENAME;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_SHOW_LABELS;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_USE_BOM;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_HEADER;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_KEY;
    /** @type {?} */
    CsvConfigConsts.DEFAULT_REMOVE_NEW_LINES;
}
/**
 * Default Configurations
 */
export var /** @type {?} */ ConfigDefaults = {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItY3N2LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXIyLWNzdi8iLCJzb3VyY2VzIjpbImxpYi9hbmd1bGFyMi1jc3YuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBaUJ2RDt3QkFONkIsSUFBSSxDQUFDLFFBQVEsSUFBSSxXQUFXO3VCQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFFM0QsVUFBVTttQkFDaEIsRUFBRTtLQUVBO0lBQ2hCOztPQUVHOzs7OztJQUNILHlDQUFVOzs7O0lBQVY7UUFDRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEI7SUFDRDs7T0FFRzs7Ozs7SUFDSCx1Q0FBUTs7OztJQUFSLGVBQWE7SUFDYjs7T0FFRzs7Ozs7SUFDSCwwQ0FBVzs7OztJQUFYO1FBRUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxHQUFHLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQztTQUNqQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztTQUMzQztRQUVELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM1QixNQUFN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LFFBQVEsRUFBRSxlQUFlLENBQUMsZ0JBQWdCO0lBQzFDLGNBQWMsRUFBRSxlQUFlLENBQUMsdUJBQXVCO0lBQ3ZELFlBQVksRUFBRSxlQUFlLENBQUMsYUFBYTtJQUMzQyxnQkFBZ0IsRUFBRSxlQUFlLENBQUMseUJBQXlCO0lBQzNELFVBQVUsRUFBRSxlQUFlLENBQUMsbUJBQW1CO0lBQy9DLFNBQVMsRUFBRSxlQUFlLENBQUMsa0JBQWtCO0lBQzdDLEtBQUssRUFBRSxlQUFlLENBQUMsYUFBYTtJQUNwQyxNQUFNLEVBQUUsZUFBZSxDQUFDLGVBQWU7SUFDdkMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxjQUFjO0lBQ3ZDLElBQUksRUFBRSxlQUFlLENBQUMsV0FBVztJQUNqQyxjQUFjLEVBQUUsZUFBZSxDQUFDLHdCQUF3QjtDQUN6RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FuZ3VsYXIyY3N2JyxcbiAgdGVtcGxhdGU6IGA8YnV0dG9uIChjbGljayk9XCJvbkRvd25sb2FkKClcIj57eyBsYWJlbF9idG4gfX08L2J1dHRvbj5gLFxuICBzdHlsZXM6IFtdXG59KVxuXG5leHBvcnQgY2xhc3MgQW5ndWxhcjJDc3ZDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGRhdGE6IGFueVtdO1xuICBASW5wdXQoKSBmaWxlbmFtZTogc3RyaW5nICA9IHRoaXMuZmlsZW5hbWUgfHwgJ215Y3N2LmNzdic7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IE9wdGlvbnMgPSB0aGlzLm9iamVjdEFzc2lnbih7fSwgQ29uZmlnRGVmYXVsdHMsIHRoaXMub3B0aW9ucyk7XG5cbiAgbGFiZWxfYnRuOiBzdHJpbmcgPSBcImRvd25sb2FkXCI7XG4gIGNzdjogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuICAvKipcbiAgICogRXZlbnQgRG93bmxvYWRcbiAgICovXG4gIG9uRG93bmxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5nZW5lcmF0ZUNzdigpO1xuICB9XG4gIC8qKlxuICAgKiBuZ09uSW5pdFxuICAgKi9cbiAgbmdPbkluaXQoKSB7fVxuICAvKipcbiAgICogW2dlbmVyYXRlQ3N2IGRlc2NyaXB0aW9uXVxuICAgKi9cbiAgZ2VuZXJhdGVDc3YoKTogdm9pZCB7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnVzZUJvbSkge1xuICAgICAgdGhpcy5jc3YgKz0gQ3N2Q29uZmlnQ29uc3RzLkJPTTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnNob3dUaXRsZSkge1xuICAgICAgdGhpcy5jc3YgKz0gdGhpcy5vcHRpb25zLnRpdGxlICsgJ1xcclxcblxcbic7XG4gICAgfVxuXG4gICAgdGhpcy5nZXRIZWFkZXJzKCk7XG4gICAgdGhpcy5nZXRCb2R5KCk7XG5cbiAgICBpZiAodGhpcy5jc3YgPT09ICcnKSB7XG4gICAgICBjb25zb2xlLmxvZygnSW52YWxpZCBkYXRhJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGJsb2IgPSBuZXcgQmxvYihbdGhpcy5jc3ZdLCB7dHlwZTogJ3RleHQvY3N2O2NoYXJzZXQ9dXRmODsnfSk7XG5cbiAgICBpZiAobmF2aWdhdG9yLm1zU2F2ZUJsb2IpIHtcblxuICAgICAgbGV0IGZpbGVuYW1lID0gdGhpcy5vcHRpb25zLmZpbGVuYW1lLnJlcGxhY2UoLyAvZywgJ18nKSArICcuY3N2JztcbiAgICAgIG5hdmlnYXRvci5tc1NhdmVCbG9iKGJsb2IsIGZpbGVuYW1lKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGxldCB1cmkgPSAnZGF0YTphdHRhY2htZW50L2NzdjtjaGFyc2V0PXV0Zi04LCcgKyBlbmNvZGVVUkkodGhpcy5jc3YpO1xuICAgICAgbGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICAgIGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgbGluay5kb3dubG9hZCA9IHRoaXMuZmlsZW5hbWUucmVwbGFjZSgvIC9nLCAnXycpICsgJy5jc3YnO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuXG4gICAgICBsaW5rLmNsaWNrKCk7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgfVxuXG4gICAgdGhpcy5jc3YgPSAnJztcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlIEhlYWRlcnMgZm9yIENzdiBGaWxlXG4gICAqL1xuICBnZXRIZWFkZXJzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaGVhZGVycy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgcm93ID0gJyc7XG4gICAgICBmb3IgKGxldCBjb2x1bW4gb2YgdGhpcy5vcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgcm93ICs9IGNvbHVtbiArIHRoaXMub3B0aW9ucy5maWVsZFNlcGFyYXRvcjtcbiAgICAgIH1cblxuICAgICAgcm93ID0gcm93LnNsaWNlKDAsIC0xKTtcbiAgICAgIHRoaXMuY3N2ICs9IHJvdyArIENzdkNvbmZpZ0NvbnN0cy5FT0w7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBDcmVhdGUgSGVhZGVyc1xuICAgKi9cbiAgZ2V0Qm9keSgpOiB2b2lkIHtcblxuICAgIGZvciAobGV0IGRhdGFSb3cgb2YgdGhpcy5kYXRhKSB7XG5cbiAgICAgIGxldCByb3cgPSAnJztcblxuICAgICAgaWYodGhpcy5pc0VtcHR5T2JqZWN0KGRhdGFSb3cpICYmIHRoaXMub3B0aW9ucy5yZW1vdmVOZXdMaW5lcykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMua2V5cyAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5vcHRpb25zLmtleXMubGVuZ3RoKSB7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IG9mIHRoaXMub3B0aW9ucy5rZXlzKSB7XG4gICAgICAgICAgcm93ICs9IHRoaXMuZm9ybWFydERhdGEoZGF0YVJvd1trZXldKSArIHRoaXMub3B0aW9ucy5maWVsZFNlcGFyYXRvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJvdyA9IHJvdy5zbGljZSgwLCAtMSk7XG4gICAgICAgIHRoaXMuY3N2ICs9IHJvdyArIENzdkNvbmZpZ0NvbnN0cy5FT0w7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGRhdGFSb3cpIHtcbiAgICAgICAgICBpZihkYXRhUm93W2tleV0pIHtcbiAgICAgICAgICAgIHJvdyArPSB0aGlzLmZvcm1hcnREYXRhKGRhdGFSb3dba2V5XSkgKyB0aGlzLm9wdGlvbnMuZmllbGRTZXBhcmF0b3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3N2ICs9IHJvdyArIENzdkNvbmZpZ0NvbnN0cy5FT0w7XG5cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEZvcm1hdCBEYXRhXG4gICAqL1xuICBmb3JtYXJ0RGF0YShkYXRhOiBhbnkpIHtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVjaW1hbHNlcGFyYXRvciA9PT0gJ2xvY2FsZScgJiYgdGhpcy5pc0Zsb2F0KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS50b0xvY2FsZVN0cmluZygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGVjaW1hbHNlcGFyYXRvciAhPT0gJy4nICYmIHRoaXMuaXNGbG9hdChkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKS5yZXBsYWNlKCcuJywgdGhpcy5vcHRpb25zLmRlY2ltYWxzZXBhcmF0b3IpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UoL1wiL2csICdcIlwiJyk7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucXVvdGVTdHJpbmdzIHx8IGRhdGEuaW5kZXhPZignLCcpID4gLTEgfHwgZGF0YS5pbmRleE9mKFwiXFxuXCIpID4gLTEgfHwgZGF0YS5pbmRleE9mKFwiXFxyXCIpID4gLTEpIHtcbiAgICAgICAgZGF0YSA9IHRoaXMub3B0aW9ucy5xdW90ZVN0cmluZ3MgKyBkYXRhICsgdGhpcy5vcHRpb25zLnF1b3RlU3RyaW5ncztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiBkYXRhID8gJ1RSVUUnIDogJ0ZBTFNFJztcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuICAvKipcbiAgICogVmFsaWRhdGUgaWYgb2JqZWN0IGlzIG5vdCBlbXB0eVxuICAgKi9cbiAgaXNFbXB0eU9iamVjdChvYmo6IGFueSkge1xuICAgIHJldHVybiAob2JqICYmIChPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA9PT0gMCkpO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgSW5wdXQgaXMgRmxvYXRcbiAgICovXG4gIGlzRmxvYXQoaW5wdXQ6IGFueSkge1xuICAgIHJldHVybiAraW5wdXQgPT09IGlucHV0ICYmICghaXNGaW5pdGUoaW5wdXQpIHx8IEJvb2xlYW4oaW5wdXQgJSAxKSk7XG4gIH1cbiAgLyoqXG4gICAqIEFkZCBvYmplY3QgVmFsdWVzXG4gICAqL1xuICB0b09iamVjdCh2YWw6IGFueSkge1xuICAgIGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3QodmFsKTtcbiAgfVxuICAvKipcbiAgICogQWRkIFZhbHVlcyB0byBPYmplY3RcbiAgICovXG4gIG9iamVjdEFzc2lnbih0YXJnZXQ6IGFueSwgLi4uc291cmNlOiBhbnlbXSkge1xuICAgIGxldCBmcm9tOiBhbnk7XG4gICAgbGV0IHRvID0gdGhpcy50b09iamVjdCh0YXJnZXQpO1xuICAgIGxldCBzeW1ib2xzOiBhbnk7XG5cbiAgICBsZXQgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICAgIGxldCBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuICAgIGZvciAobGV0IHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG4gICAgICBmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cbiAgICAgIGZvciAobGV0IGtleSBpbiBmcm9tKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcbiAgICAgICAgICB0b1trZXldID0gZnJvbVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICgoPGFueT4gT2JqZWN0KS5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICAgICAgc3ltYm9scyA9ICg8YW55PiBPYmplY3QpLmdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcbiAgICAgICAgZm9yIChsZXQgc3ltYm9sIG9mIHN5bWJvbHMpIHtcbiAgICAgICAgICBpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbCkpIHtcbiAgICAgICAgICAgIHRvW3N5bWJvbF0gPSBmcm9tW3N5bWJvbF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvO1xuICB9XG59XG4vKipcbiAqIE9wdGlvbiBJbnRlcmZhY2VcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zIHtcbiAgZmlsZW5hbWU6IHN0cmluZztcbiAgZmllbGRTZXBhcmF0b3I6IHN0cmluZztcbiAgcXVvdGVTdHJpbmdzOiBzdHJpbmc7XG4gIGRlY2ltYWxzZXBhcmF0b3I6IHN0cmluZztcbiAgc2hvd0xhYmVsczogYm9vbGVhbjtcbiAgc2hvd1RpdGxlOiBib29sZWFuO1xuICB0aXRsZTogc3RyaW5nO1xuICB1c2VCb206IGJvb2xlYW47XG4gIGhlYWRlcnM6IHN0cmluZ1tdO1xuICBrZXlzOiBzdHJpbmdbXTtcbiAgcmVtb3ZlTmV3TGluZXM6IGJvb2xlYW47XG59XG4vKipcbiAqIENzdkNvbmZpZ0NvbnN0c1xuICovXG5leHBvcnQgY2xhc3MgQ3N2Q29uZmlnQ29uc3RzIHtcblxuICBwdWJsaWMgc3RhdGljIEVPTCA9ICdcXHJcXG4nO1xuICBwdWJsaWMgc3RhdGljIEJPTSA9ICdcXHVmZWZmJztcblxuICBwdWJsaWMgc3RhdGljIERFRkFVTFRfRklFTERfU0VQQVJBVE9SID0gJywnO1xuICBwdWJsaWMgc3RhdGljIERFRkFVTFRfREVDSU1BTF9TRVBBUkFUT1IgPSAnLic7XG4gIHB1YmxpYyBzdGF0aWMgREVGQVVMVF9RVU9URSA9ICdcIic7XG4gIHB1YmxpYyBzdGF0aWMgREVGQVVMVF9TSE9XX1RJVExFID0gZmFsc2U7XG4gIHB1YmxpYyBzdGF0aWMgREVGQVVMVF9USVRMRSA9ICdNeSBSZXBvcnQnO1xuICBwdWJsaWMgc3RhdGljIERFRkFVTFRfRklMRU5BTUUgPSAnbXljc3YuY3N2JztcbiAgcHVibGljIHN0YXRpYyBERUZBVUxUX1NIT1dfTEFCRUxTID0gZmFsc2U7XG4gIHB1YmxpYyBzdGF0aWMgREVGQVVMVF9VU0VfQk9NID0gdHJ1ZTtcbiAgcHVibGljIHN0YXRpYyBERUZBVUxUX0hFQURFUjogc3RyaW5nW10gPSBbXTtcbiAgcHVibGljIHN0YXRpYyBERUZBVUxUX0tFWTogc3RyaW5nW10gPSBbXTtcbiAgcHVibGljIHN0YXRpYyBERUZBVUxUX1JFTU9WRV9ORVdfTElORVMgPSBmYWxzZTtcbn1cbi8qKlxuICogRGVmYXVsdCBDb25maWd1cmF0aW9uc1xuICovXG5leHBvcnQgY29uc3QgQ29uZmlnRGVmYXVsdHM6IE9wdGlvbnMgPSB7XG4gIGZpbGVuYW1lOiBDc3ZDb25maWdDb25zdHMuREVGQVVMVF9GSUxFTkFNRSxcbiAgZmllbGRTZXBhcmF0b3I6IENzdkNvbmZpZ0NvbnN0cy5ERUZBVUxUX0ZJRUxEX1NFUEFSQVRPUixcbiAgcXVvdGVTdHJpbmdzOiBDc3ZDb25maWdDb25zdHMuREVGQVVMVF9RVU9URSxcbiAgZGVjaW1hbHNlcGFyYXRvcjogQ3N2Q29uZmlnQ29uc3RzLkRFRkFVTFRfREVDSU1BTF9TRVBBUkFUT1IsXG4gIHNob3dMYWJlbHM6IENzdkNvbmZpZ0NvbnN0cy5ERUZBVUxUX1NIT1dfTEFCRUxTLFxuICBzaG93VGl0bGU6IENzdkNvbmZpZ0NvbnN0cy5ERUZBVUxUX1NIT1dfVElUTEUsXG4gIHRpdGxlOiBDc3ZDb25maWdDb25zdHMuREVGQVVMVF9USVRMRSxcbiAgdXNlQm9tOiBDc3ZDb25maWdDb25zdHMuREVGQVVMVF9VU0VfQk9NLFxuICBoZWFkZXJzOiBDc3ZDb25maWdDb25zdHMuREVGQVVMVF9IRUFERVIsXG4gIGtleXM6IENzdkNvbmZpZ0NvbnN0cy5ERUZBVUxUX0tFWSxcbiAgcmVtb3ZlTmV3TGluZXM6IENzdkNvbmZpZ0NvbnN0cy5ERUZBVUxUX1JFTU9WRV9ORVdfTElORVNcbn07XG4iXX0=