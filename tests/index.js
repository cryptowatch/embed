var assert = require('assert');
var URI = require('urijs');
var Browser = require("zombie")
var Embed = require('../dist/main.js');

describe('Embed', function () {
  it('generates the default URL when given no opts', function() {
    assert.equal(
      (new Embed('bitfinex', 'btc/usd').src),
      'https://embed.cryptowat.ch/markets/bitfinex/btc/usd'
    );
  });

  it('handles the timePeriod opt', function() {
    assert.equal(
      (new Embed('bitfinex', 'btc/usd', { timePeriod: '6H' }).src),
      'https://embed.cryptowat.ch/markets/bitfinex/btc/usd/6h'
    );

    // Input should be case insensitive
    assert.equal(
      (new Embed('okcoin', 'btc/cny', { timePeriod: '1w' }).src),
      'https://embed.cryptowat.ch/markets/okcoin/btc/cny/1w'
    );
  });

  it('handles the presetColorScheme opt', function() {
    assert.equal(
      (new Embed('bitfinex', 'btc/usd', { presetColorScheme: 'albuquerque' }).src),
      'https://embed.cryptowat.ch/markets/bitfinex/btc/usd?presetColorScheme=albuquerque'
    );
  });

  it('handles the presetColorScheme opt', function() {
    assert.equal(
      (new Embed('bitfinex', 'btc/usd', { presetColorScheme: 'albuquerque' }).src),
      'https://embed.cryptowat.ch/markets/bitfinex/btc/usd?presetColorScheme=albuquerque'
    );
  });

  it('handles the locale opt', function() {
    assert.equal(
      (new Embed('quoine', 'btc/jpy', { locale: 'ja-JP' }).src),
      'https://embed.cryptowat.ch/markets/quoine/btc/jpy?locale=ja-JP'
    );
  });

  it('handles the host and protocol opts', function() {
    assert.equal(
      (new Embed('bitbank', 'btc/usd', { locale: 'ja-JP', host: 'chart.bitbanktrade.jp', protocol: 'http' }).src),
      'http://chart.bitbanktrade.jp/markets/bitbank/btc/usd?locale=ja-JP'
    );
  });

  it('handles extra query opts', function() {
    assert.equal(
      (new Embed('bitbank', 'btc/usd', { locale: 'ja-JP', host: 'chart.bitbanktrade.jp', protocol: 'http', query: { branding: 'special' } }).src),
      'http://chart.bitbanktrade.jp/markets/bitbank/btc/usd?locale=ja-JP&branding=special'
    );
  });

  it('handles the customColorScheme opt', function() {
    var colors = {
      bg:           "000000",
      text:         "b2b2b2",
      textStrong:   "e5e5e5",
      textWeak:     "7f7f7f",
      short:        "C60606",
      shortFill:    "C60606",
      long:         "00B909",
      longFill:     "000000",
      cta:          "363D52",
      ctaHighlight: "414A67",
      alert:        "FFD506"
    };

    var encodedColors = encodeURIComponent(JSON.stringify(colors));
    var embed = new Embed('bitfinex', 'btc/usd', { customColorScheme: colors });
    var uri = new URI(embed.src);
    var encodedColors = uri.query(true)['customColorScheme'];
    var decodedColors = JSON.parse(URI.decodeQuery(encodedColors));

    // Verify that the colors were encoded correctly (order does not matter)
    for (var key in colors) {
      if (colors.hasOwnProperty(key)) {
        assert.equal(colors[key], decodedColors[key]);
      }
    }
  });

  it('handles the width & height opts', function() {
    var iframe;

    // Shim
    window = new Browser()
    window.visit('');
    document = window.document;

    var embed = new Embed('bitfinex', 'btc/usd');
    iframe = embed.createIframe();

    assert.equal(iframe.getAttribute('width'), '100%');
    assert.equal(iframe.getAttribute('height'), '100%');

    var embed = new Embed('bitfinex', 'btc/usd', { width: 500, height: 300 });
    iframe = embed.createIframe();

    assert.equal(iframe.getAttribute('width'), '500');
    assert.equal(iframe.getAttribute('height'), '300');
  });

});
