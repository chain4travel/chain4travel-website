// Preloaded by `npm run build:offline` (NODE_OPTIONS=--require): any attempt to
// open a network connection during the build throws, proving the archive
// build is fully offline. Local IPC/unix sockets are still allowed.
const net = require('net')
const fail = (what) => { throw new Error(`[no-network] blocked ${what} during archive build`) }
const origConnect = net.Socket.prototype.connect
net.Socket.prototype.connect = function (...args) {
  const opts = args[0]
  if (opts && typeof opts === 'object' && opts.path) return origConnect.apply(this, args)
  if (typeof opts === 'string' && isNaN(Number(opts))) return origConnect.apply(this, args)
  fail(`socket connect ${JSON.stringify(opts && (opts.host || opts.port) || opts)}`)
}
globalThis.fetch = (url) => fail(`fetch ${url}`)
