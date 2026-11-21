
// Importamos TextEncoder y TextDecoder desde Node.js.
const { TextEncoder, TextDecoder } = require("util");

// Los hacemos disponibles para React Router durante las pruebas.
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
