const validTimePeriods = [
  '1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '12h', '1d', '3d', '1w'
]

const validLocales = [
  'en', 'es', 'zh-CN', 'de', 'ja-JP', 'el-GR', 'da-DK'
]

const requiredColorSchemeKeys = [
    'bg', 'text', 'textStrong', 'textWeak', 'short', 'shortFill', 'long', 'longFill', 'cta', 'ctaHighlight', 'alert'
]

function queryToString(query) {
  let pairs = [];
  for (let key in query) {
    pairs.push(`${key}=${query[key]}`);
  }

  if (pairs.length === 0) {
    return '';
  } else {
    return '?'+pairs.join('&');
  }
}

class Embed {
  constructor(exchange, currencyPair, opts={}) {
    this.exchange = exchange;
    this.currencyPair = currencyPair;
    this.opts = opts;

    // Validate exchange
    if (exchange === undefined) {
      throw new Error('exchange required');
    }

    // Validate currencyPair
    if (currencyPair === undefined) {
      throw new Error('currencyPair required');
    }
    // TODO validate that exchange supports this currencyPair (generated config)
    // As this is now, it will just render an iframe containing the 404 page

    if (opts.timePeriod !== undefined && (typeof opts.timePeriod) === 'string') {
      opts.timePeriod = opts.timePeriod.toLowerCase();
      if (validTimePeriods.indexOf(opts.timePeriod) === -1) {
        throw new Error(`Unknown time period "${opts.timePeriod}"\nValid timePeriods: ${validTimePeriods.join(', ')}`);
      }
      opts.timePeriod = opts.timePeriod.toLowerCase();
    } else {
      opts.timePeriod = null; // Will load last selected for returning users, or default (1H) for new users
    }

    if (opts.locale !== undefined) {
      if (validLocales.indexOf(opts.locale) === -1) {
        throw new Error(`Unknown locale "${opts.locale}"\nValid locales: ${validLocales.join(', ')}`);
      }
    }

    if (opts.host === undefined) opts.host = 'embed.cryptowat.ch';
    if (opts.protocol === undefined) opts.protocol = 'https';
    if (opts.width === undefined) opts.width = '100%';
    if (opts.height === undefined) opts.height = '100%';
  }

  get src() {
    let path = `/markets/${this.exchange}/${this.currencyPair}`;
    if (this.opts.timePeriod !== null) {
      path += `/${this.opts.timePeriod}`;
    }

    let uri = `${this.opts.protocol}://${this.opts.host}${path}`;
    let query = {}
    if (this.opts.locale) {
      query.locale = this.opts.locale;
    }
    if (this.opts.query) {
      // Extend query with additional params that may have been added
      for (let key in this.opts.query) {
        if (query[key] === undefined) query[key] = this.opts.query[key];
      }
    }

    if (this.opts.presetColorScheme !== undefined) {
      query.presetColorScheme = this.opts.presetColorScheme;
    } else if (this.opts.customColorScheme !== undefined) {
      query.customColorScheme = encodeURIComponent(JSON.stringify(this.opts.customColorScheme));
    }

    uri += queryToString(query);
    return uri;
  }

  createIframe() {
    let iframe = document.createElement('iframe');
    iframe.setAttribute('src', this.src);
    iframe.setAttribute('frameborder', 0);
    iframe.setAttribute('allowfullscreen', true);
    iframe.setAttribute('width', this.opts.width);
    iframe.setAttribute('height', this.opts.height);

    return iframe;
  }

  mount(elem) {
    if (typeof elem === 'string') {
      elem = document.querySelector(elem);
    }
    elem.appendChild(this.createIframe());
  }
}

export default Embed;
