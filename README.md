# Cryptowatch Embed

[![npm version](https://badge.fury.io/js/cryptowatch-embed.svg)](https://badge.fury.io/js/cryptowatch-embed)

Small library for embedding [Cryptowatch](https://cryptowat.ch) charts on a website.

## Live Demo

[https://jsfiddle.net/s2k0ahf1/441/](https://jsfiddle.net/s2k0ahf1/441/)

## Usage

### Vanilla ES5

Include the ES5 build in your page:

```html
<script type="text/javascript" src="https://static.cryptowat.ch/assets/scripts/embed.bundle.js"></script>
```

Use the library in the global `cryptowatch` namespace:

```js
var chart = new cryptowatch.Embed('bitfinex', 'btc/usd');

chart.mount('#chart-container');
```

### ES6/webpack

Install package:

```
npm install cryptowatch-embed --save
```

Import package:

```js
import CryptowatchEmbed from 'cryptowatch-embed';

let chart = new CryptowatchEmbed('bitfinex', 'btc/usd');

chart.mount('#chart-container');
```

## API

At minimum, the library requires an exchange and currency pair.

```js
var chart = new cryptowatch.Embed('bitfinex', 'btc/usd');
```

A few options can be provided to configure the chart.

### `width` and `height`

Fixed dimensions may be defined for the iframe. The default values for both are `100%`.

```js
var chart = new cryptowatch.Embed('bitfinex', 'btc/usd', {
  width: 800,
  height: 500
});
```

### `timePeriod`

Any of the supported time periods may be forcefully loaded on every page load:

`1m`, `3m`, `5m`, `15m`, `30m`, `1h`, `2h`, `4h`, `6h`, `12h`, `1d`, `3d`, `1w`

We recommend omitting this option, which will cause the application to use whatever time period the client
last chose, or `1h` for new visitors.

```js
var chart = new cryptowatch.Embed('bitfinex', 'btc/usd', {
  timePeriod: '4H'
});
```

### `presetColorScheme`

Any of the preset color schemes may be chosen:

```
standard
candycane
albuquerque
epaper
delek
blueprint
ballmer
bushido
ishihara
```

The default value is `standard`.

```js
var chart = new cryptowatch.Embed('bitfinex', 'btc/usd', {
  presetColorScheme: 'delek'
});
```

Future versions of this library will also enable you to add indicators/overlays.
The current version renders only the candlestick chart with volume underneath.
