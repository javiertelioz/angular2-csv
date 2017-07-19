# Angular2-csv | Export to CSV  in Angular2

> Helper library for create CSV file in Angular2
> 

## Installation

```javascript
npm install --save angular2-csv
```

## Example
```javascript

import { Angular2Csv } from 'angular2-csv/Angular2-csv';

var data = [
  {
    name: "Test 1",
    age: 13,
    average: 8.2,
    approved: true,
    description: "using 'Content here, content here' "
  },
  {
    name: 'Test 2',
    age: 11,
    average: 8.2,
    approved: true,
    description: "using 'Content here, content here' "
  },
  {
    name: 'Test 4',
    age: 10,
    average: 8.2,
    approved: true,
    description: "using 'Content here, content here' "
  },
];

new Angular2Csv(data, 'My Report');

```

## API | **Angular2Csv(data, filename, options)**


| Option        | Default           | Description  |
| :------------- |:-------------:| -----|
| **fieldSeparator**      | , | Defines the field separator character |
| **quoteStrings**      | "      | If provided, will use this characters to "escape" fields, otherwise will use double quotes as deafult |
| **decimalseparator** | .      | Defines the decimal separator character (default is .). If set to "locale", it uses the [language sensitive representation of the number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString).|
| **showLabels** | false      | If provided, would use this attribute to create a header row |
| **showTitle** | false      |   |
| **useBom** | true      | If true, adds a BOM character at the start of the CSV |
| **overrideSystemSeparator** | false   | If true, it specifies the separator inside the CSV file. This allows Excel to override user's system regional settings and always display the file correctly.


**Example**
---

```javascript
  var options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true, 
    showTitle: true,
    useBom: true,
    overrideSystemSeparator: true
  };

  Angular2Csv(data, filename, options);

```
#Credits
---

|                |
| :------------- |
| **[sn123](https://github.com/sn123)** |
| **[arf1980](https://github.com/arf1980)** |
