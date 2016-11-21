# d3plus-priestley

[![NPM Release](http://img.shields.io/npm/v/d3plus-priestley.svg?style=flat)](https://www.npmjs.org/package/d3plus-priestley)
[![Build Status](https://travis-ci.org/d3plus/d3plus-priestley.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-priestley)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-priestley.svg?style=flat)](https://david-dm.org/d3plus/d3plus-priestley)
[![Slack](https://img.shields.io/badge/Slack-Click%20to%20Join!-green.svg?style=social)](https://goo.gl/forms/ynrKdvusekAwRMPf2)

A reusable Priestley timeline built on D3.

## Installing

If you use NPM, `npm install d3plus-priestley`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-priestley/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a [custom bundle using Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-priestley.v0.1.full.min.js"></script>
```


## Getting Started

Priestly Timelines (named after 18th-century English theologian [Joseph Priestly](https://en.wikipedia.org/wiki/Joseph_Priestley)), show the duration of multiple data points over time by stacking blocks to best fit. Given data with unique IDs and start and end dates:

```js
var data = [
  {id: "alpha",   start: 2004, end: 2007},
  {id: "epsilon", start: 2007, end: 2012},
  {id: "beta",    start: 2005, end: 2010},
];
```

It's only requires a few lines of code to create a Priestly Timeline:

```js
new d3plus.Priestley()
  .data(data)
  .render();
```


[<kbd><img src="/example/getting-started.png" width="990px" /></kbd>](https://d3plus.org/examples/d3plus-priestley/getting-started/)

[Click here](https://d3plus.org/examples/d3plus-priestley/getting-started/) to view this example live on the web.


### More Examples

 * [Grouping into Lanes](http://d3plus.org/examples/d3plus-priestley/grouping/)

## API Reference
<a name="Priestley"></a>

### Priestley ⇐ <code>Viz</code>
**Kind**: global class  
**Extends:** <code>Viz</code>  

* [Priestley](#Priestley) ⇐ <code>Viz</code>
    * [new Priestley()](#new_Priestley_new)
    * [.axisConfig([*value*])](#Priestley.axisConfig)
    * [.end([*value*])](#Priestley.end)
    * [.start([*value*])](#Priestley.start)

<a name="new_Priestley_new"></a>

#### new Priestley()
Creates a priestley timeline based on an array of data.

<a name="Priestley.axisConfig"></a>

#### Priestley.axisConfig([*value*])
If *value* is specified, sets the config method for the axis and returns the current class instance. If *value* is not specified, returns the current axis configuration.

**Kind**: static method of <code>[Priestley](#Priestley)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="Priestley.end"></a>

#### Priestley.end([*value*])
If *value* is specified, sets the end accessor to the specified function or key and returns the current class instance. If *value* is not specified, returns the current end accessor.

**Kind**: static method of <code>[Priestley](#Priestley)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | 

<a name="Priestley.start"></a>

#### Priestley.start([*value*])
If *value* is specified, sets the start accessor to the specified function or key and returns the current class instance. If *value* is not specified, returns the current start accessor.

**Kind**: static method of <code>[Priestley](#Priestley)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | 



###### <sub>Documentation generated on Mon, 21 Nov 2016 19:42:16 GMT</sub>
