import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports } from "./x-D_GsiFEI.js";
import { G as GiftFriendModal, S as ShopCodeButton, B as BadgeCheck, M as MousePointerClick, T as TrendingUp } from "./GiftFriendModal-DD2PaLxe.js";
import { s as supabase, u as useLanguage, L as LoaderCircle, bd as CircleX, aN as RefreshCw, be as CircleCheck, bf as Clock, a$ as Copy, x as useAuth, b as useToast, a8 as useAuthStore, A as useProStore, aI as usePriceStore, bg as PRO_PRICE_KEY, F as FullScreenPage, a as Lock, ag as PurchaseConfirmDialog, H as HbcCoin, C as Crown, ar as Gift, bh as Users, I as Image, v as Shirt, j as Send, bi as purchaseLauncherPro, aj as purchaseErrorText, bj as helmUrl } from "./index-BgnzSiMf.js";
import { C as Check } from "./trash-2-Djh6nQ-0.js";
import { f as formatProDate } from "./proFormat-D1yFcuOe.js";
import { S as Sparkles } from "./uiTokenRequest-NBUTHrRg.js";
import "./index-DZI2mFQS.js";
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$3);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
      key: "169xi5"
    }
  ],
  ["path", { d: "M15 5.764v15", key: "1pn4in" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
];
const Map = createLucideIcon("map", __iconNode$2);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
];
const Monitor = createLucideIcon("monitor", __iconNode$1);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
      key: "ul74o6"
    }
  ],
  ["path", { d: "m14 7 3 3", key: "1r5n42" }],
  ["path", { d: "M5 6v4", key: "ilb8ba" }],
  ["path", { d: "M19 14v4", key: "blhpug" }],
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M7 8H3", key: "zfb6yr" }],
  ["path", { d: "M21 16h-4", key: "1cnmox" }],
  ["path", { d: "M11 3H9", key: "1obp7u" }]
];
const WandSparkles = createLucideIcon("wand-sparkles", __iconNode);
const qrcode = function(typeNumber, errorCorrectionLevel) {
  const PAD0 = 236;
  const PAD1 = 17;
  let _typeNumber = typeNumber;
  const _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
  let _modules = null;
  let _moduleCount = 0;
  let _dataCache = null;
  const _dataList = [];
  const _this = {};
  const makeImpl = function(test, maskPattern) {
    _moduleCount = _typeNumber * 4 + 17;
    _modules = function(moduleCount) {
      const modules = new Array(moduleCount);
      for (let row = 0; row < moduleCount; row += 1) {
        modules[row] = new Array(moduleCount);
        for (let col = 0; col < moduleCount; col += 1) {
          modules[row][col] = null;
        }
      }
      return modules;
    }(_moduleCount);
    setupPositionProbePattern(0, 0);
    setupPositionProbePattern(_moduleCount - 7, 0);
    setupPositionProbePattern(0, _moduleCount - 7);
    setupPositionAdjustPattern();
    setupTimingPattern();
    setupTypeInfo(test, maskPattern);
    if (_typeNumber >= 7) {
      setupTypeNumber(test);
    }
    if (_dataCache == null) {
      _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
    }
    mapData(_dataCache, maskPattern);
  };
  const setupPositionProbePattern = function(row, col) {
    for (let r = -1; r <= 7; r += 1) {
      if (row + r <= -1 || _moduleCount <= row + r) continue;
      for (let c = -1; c <= 7; c += 1) {
        if (col + c <= -1 || _moduleCount <= col + c) continue;
        if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
          _modules[row + r][col + c] = true;
        } else {
          _modules[row + r][col + c] = false;
        }
      }
    }
  };
  const getBestMaskPattern = function() {
    let minLostPoint = 0;
    let pattern = 0;
    for (let i = 0; i < 8; i += 1) {
      makeImpl(true, i);
      const lostPoint = QRUtil.getLostPoint(_this);
      if (i == 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = i;
      }
    }
    return pattern;
  };
  const setupTimingPattern = function() {
    for (let r = 8; r < _moduleCount - 8; r += 1) {
      if (_modules[r][6] != null) {
        continue;
      }
      _modules[r][6] = r % 2 == 0;
    }
    for (let c = 8; c < _moduleCount - 8; c += 1) {
      if (_modules[6][c] != null) {
        continue;
      }
      _modules[6][c] = c % 2 == 0;
    }
  };
  const setupPositionAdjustPattern = function() {
    const pos = QRUtil.getPatternPosition(_typeNumber);
    for (let i = 0; i < pos.length; i += 1) {
      for (let j = 0; j < pos.length; j += 1) {
        const row = pos[i];
        const col = pos[j];
        if (_modules[row][col] != null) {
          continue;
        }
        for (let r = -2; r <= 2; r += 1) {
          for (let c = -2; c <= 2; c += 1) {
            if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
              _modules[row + r][col + c] = true;
            } else {
              _modules[row + r][col + c] = false;
            }
          }
        }
      }
    }
  };
  const setupTypeNumber = function(test) {
    const bits = QRUtil.getBCHTypeNumber(_typeNumber);
    for (let i = 0; i < 18; i += 1) {
      const mod = !test && (bits >> i & 1) == 1;
      _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
    }
    for (let i = 0; i < 18; i += 1) {
      const mod = !test && (bits >> i & 1) == 1;
      _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
    }
  };
  const setupTypeInfo = function(test, maskPattern) {
    const data = _errorCorrectionLevel << 3 | maskPattern;
    const bits = QRUtil.getBCHTypeInfo(data);
    for (let i = 0; i < 15; i += 1) {
      const mod = !test && (bits >> i & 1) == 1;
      if (i < 6) {
        _modules[i][8] = mod;
      } else if (i < 8) {
        _modules[i + 1][8] = mod;
      } else {
        _modules[_moduleCount - 15 + i][8] = mod;
      }
    }
    for (let i = 0; i < 15; i += 1) {
      const mod = !test && (bits >> i & 1) == 1;
      if (i < 8) {
        _modules[8][_moduleCount - i - 1] = mod;
      } else if (i < 9) {
        _modules[8][15 - i - 1 + 1] = mod;
      } else {
        _modules[8][15 - i - 1] = mod;
      }
    }
    _modules[_moduleCount - 8][8] = !test;
  };
  const mapData = function(data, maskPattern) {
    let inc = -1;
    let row = _moduleCount - 1;
    let bitIndex = 7;
    let byteIndex = 0;
    const maskFunc = QRUtil.getMaskFunction(maskPattern);
    for (let col = _moduleCount - 1; col > 0; col -= 2) {
      if (col == 6) col -= 1;
      while (true) {
        for (let c = 0; c < 2; c += 1) {
          if (_modules[row][col - c] == null) {
            let dark = false;
            if (byteIndex < data.length) {
              dark = (data[byteIndex] >>> bitIndex & 1) == 1;
            }
            const mask = maskFunc(row, col - c);
            if (mask) {
              dark = !dark;
            }
            _modules[row][col - c] = dark;
            bitIndex -= 1;
            if (bitIndex == -1) {
              byteIndex += 1;
              bitIndex = 7;
            }
          }
        }
        row += inc;
        if (row < 0 || _moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  };
  const createBytes = function(buffer, rsBlocks) {
    let offset = 0;
    let maxDcCount = 0;
    let maxEcCount = 0;
    const dcdata = new Array(rsBlocks.length);
    const ecdata = new Array(rsBlocks.length);
    for (let r = 0; r < rsBlocks.length; r += 1) {
      const dcCount = rsBlocks[r].dataCount;
      const ecCount = rsBlocks[r].totalCount - dcCount;
      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);
      dcdata[r] = new Array(dcCount);
      for (let i = 0; i < dcdata[r].length; i += 1) {
        dcdata[r][i] = 255 & buffer.getBuffer()[i + offset];
      }
      offset += dcCount;
      const rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      const rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);
      const modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (let i = 0; i < ecdata[r].length; i += 1) {
        const modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = modIndex >= 0 ? modPoly.getAt(modIndex) : 0;
      }
    }
    let totalCodeCount = 0;
    for (let i = 0; i < rsBlocks.length; i += 1) {
      totalCodeCount += rsBlocks[i].totalCount;
    }
    const data = new Array(totalCodeCount);
    let index = 0;
    for (let i = 0; i < maxDcCount; i += 1) {
      for (let r = 0; r < rsBlocks.length; r += 1) {
        if (i < dcdata[r].length) {
          data[index] = dcdata[r][i];
          index += 1;
        }
      }
    }
    for (let i = 0; i < maxEcCount; i += 1) {
      for (let r = 0; r < rsBlocks.length; r += 1) {
        if (i < ecdata[r].length) {
          data[index] = ecdata[r][i];
          index += 1;
        }
      }
    }
    return data;
  };
  const createData = function(typeNumber2, errorCorrectionLevel2, dataList) {
    const rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, errorCorrectionLevel2);
    const buffer = qrBitBuffer();
    for (let i = 0; i < dataList.length; i += 1) {
      const data = dataList[i];
      buffer.put(data.getMode(), 4);
      buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
      data.write(buffer);
    }
    let totalDataCount = 0;
    for (let i = 0; i < rsBlocks.length; i += 1) {
      totalDataCount += rsBlocks[i].dataCount;
    }
    if (buffer.getLengthInBits() > totalDataCount * 8) {
      throw "code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")";
    }
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
      buffer.put(0, 4);
    }
    while (buffer.getLengthInBits() % 8 != 0) {
      buffer.putBit(false);
    }
    while (true) {
      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(PAD0, 8);
      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(PAD1, 8);
    }
    return createBytes(buffer, rsBlocks);
  };
  _this.addData = function(data, mode) {
    mode = mode || "Byte";
    let newData = null;
    switch (mode) {
      case "Numeric":
        newData = qrNumber(data);
        break;
      case "Alphanumeric":
        newData = qrAlphaNum(data);
        break;
      case "Byte":
        newData = qr8BitByte(data);
        break;
      case "Kanji":
        newData = qrKanji(data);
        break;
      default:
        throw "mode:" + mode;
    }
    _dataList.push(newData);
    _dataCache = null;
  };
  _this.isDark = function(row, col) {
    if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
      throw row + "," + col;
    }
    return _modules[row][col];
  };
  _this.getModuleCount = function() {
    return _moduleCount;
  };
  _this.make = function() {
    if (_typeNumber < 1) {
      let typeNumber2 = 1;
      for (; typeNumber2 < 40; typeNumber2++) {
        const rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, _errorCorrectionLevel);
        const buffer = qrBitBuffer();
        for (let i = 0; i < _dataList.length; i++) {
          const data = _dataList[i];
          buffer.put(data.getMode(), 4);
          buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
          data.write(buffer);
        }
        let totalDataCount = 0;
        for (let i = 0; i < rsBlocks.length; i++) {
          totalDataCount += rsBlocks[i].dataCount;
        }
        if (buffer.getLengthInBits() <= totalDataCount * 8) {
          break;
        }
      }
      _typeNumber = typeNumber2;
    }
    makeImpl(false, getBestMaskPattern());
  };
  _this.createTableTag = function(cellSize, margin) {
    cellSize = cellSize || 2;
    margin = typeof margin == "undefined" ? cellSize * 4 : margin;
    let qrHtml = "";
    qrHtml += '<table style="';
    qrHtml += " border-width: 0px; border-style: none;";
    qrHtml += " border-collapse: collapse;";
    qrHtml += " padding: 0px; margin: " + margin + "px;";
    qrHtml += '">';
    qrHtml += "<tbody>";
    for (let r = 0; r < _this.getModuleCount(); r += 1) {
      qrHtml += "<tr>";
      for (let c = 0; c < _this.getModuleCount(); c += 1) {
        qrHtml += '<td style="';
        qrHtml += " border-width: 0px; border-style: none;";
        qrHtml += " border-collapse: collapse;";
        qrHtml += " padding: 0px; margin: 0px;";
        qrHtml += " width: " + cellSize + "px;";
        qrHtml += " height: " + cellSize + "px;";
        qrHtml += " background-color: ";
        qrHtml += _this.isDark(r, c) ? "#000000" : "#ffffff";
        qrHtml += ";";
        qrHtml += '"/>';
      }
      qrHtml += "</tr>";
    }
    qrHtml += "</tbody>";
    qrHtml += "</table>";
    return qrHtml;
  };
  _this.createSvgTag = function(cellSize, margin, alt, title) {
    let opts = {};
    if (typeof arguments[0] == "object") {
      opts = arguments[0];
      cellSize = opts.cellSize;
      margin = opts.margin;
      alt = opts.alt;
      title = opts.title;
    }
    cellSize = cellSize || 2;
    margin = typeof margin == "undefined" ? cellSize * 4 : margin;
    alt = typeof alt === "string" ? { text: alt } : alt || {};
    alt.text = alt.text || null;
    alt.id = alt.text ? alt.id || "qrcode-description" : null;
    title = typeof title === "string" ? { text: title } : title || {};
    title.text = title.text || null;
    title.id = title.text ? title.id || "qrcode-title" : null;
    const size = _this.getModuleCount() * cellSize + margin * 2;
    let c, mc, r, mr, qrSvg = "", rect;
    rect = "l" + cellSize + ",0 0," + cellSize + " -" + cellSize + ",0 0,-" + cellSize + "z ";
    qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
    qrSvg += !opts.scalable ? ' width="' + size + 'px" height="' + size + 'px"' : "";
    qrSvg += ' viewBox="0 0 ' + size + " " + size + '" ';
    qrSvg += ' preserveAspectRatio="xMinYMin meet"';
    qrSvg += title.text || alt.text ? ' role="img" aria-labelledby="' + escapeXml([title.id, alt.id].join(" ").trim()) + '"' : "";
    qrSvg += ">";
    qrSvg += title.text ? '<title id="' + escapeXml(title.id) + '">' + escapeXml(title.text) + "</title>" : "";
    qrSvg += alt.text ? '<description id="' + escapeXml(alt.id) + '">' + escapeXml(alt.text) + "</description>" : "";
    qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
    qrSvg += '<path d="';
    for (r = 0; r < _this.getModuleCount(); r += 1) {
      mr = r * cellSize + margin;
      for (c = 0; c < _this.getModuleCount(); c += 1) {
        if (_this.isDark(r, c)) {
          mc = c * cellSize + margin;
          qrSvg += "M" + mc + "," + mr + rect;
        }
      }
    }
    qrSvg += '" stroke="transparent" fill="black"/>';
    qrSvg += "</svg>";
    return qrSvg;
  };
  _this.createDataURL = function(cellSize, margin) {
    cellSize = cellSize || 2;
    margin = typeof margin == "undefined" ? cellSize * 4 : margin;
    const size = _this.getModuleCount() * cellSize + margin * 2;
    const min = margin;
    const max = size - margin;
    return createDataURL(size, size, function(x, y) {
      if (min <= x && x < max && min <= y && y < max) {
        const c = Math.floor((x - min) / cellSize);
        const r = Math.floor((y - min) / cellSize);
        return _this.isDark(r, c) ? 0 : 1;
      } else {
        return 1;
      }
    });
  };
  _this.createImgTag = function(cellSize, margin, alt) {
    cellSize = cellSize || 2;
    margin = typeof margin == "undefined" ? cellSize * 4 : margin;
    const size = _this.getModuleCount() * cellSize + margin * 2;
    let img = "";
    img += "<img";
    img += ' src="';
    img += _this.createDataURL(cellSize, margin);
    img += '"';
    img += ' width="';
    img += size;
    img += '"';
    img += ' height="';
    img += size;
    img += '"';
    if (alt) {
      img += ' alt="';
      img += escapeXml(alt);
      img += '"';
    }
    img += "/>";
    return img;
  };
  const escapeXml = function(s) {
    let escaped = "";
    for (let i = 0; i < s.length; i += 1) {
      const c = s.charAt(i);
      switch (c) {
        case "<":
          escaped += "&lt;";
          break;
        case ">":
          escaped += "&gt;";
          break;
        case "&":
          escaped += "&amp;";
          break;
        case '"':
          escaped += "&quot;";
          break;
        default:
          escaped += c;
          break;
      }
    }
    return escaped;
  };
  const _createHalfASCII = function(margin) {
    const cellSize = 1;
    margin = typeof margin == "undefined" ? cellSize * 2 : margin;
    const size = _this.getModuleCount() * cellSize + margin * 2;
    const min = margin;
    const max = size - margin;
    let y, x, r1, r2, p;
    const blocks = {
      "██": "█",
      "█ ": "▀",
      " █": "▄",
      "  ": " "
    };
    const blocksLastLineNoMargin = {
      "██": "▀",
      "█ ": "▀",
      " █": " ",
      "  ": " "
    };
    let ascii = "";
    for (y = 0; y < size; y += 2) {
      r1 = Math.floor((y - min) / cellSize);
      r2 = Math.floor((y + 1 - min) / cellSize);
      for (x = 0; x < size; x += 1) {
        p = "█";
        if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {
          p = " ";
        }
        if (min <= x && x < max && min <= y + 1 && y + 1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {
          p += " ";
        } else {
          p += "█";
        }
        ascii += margin < 1 && y + 1 >= max ? blocksLastLineNoMargin[p] : blocks[p];
      }
      ascii += "\n";
    }
    if (size % 2 && margin > 0) {
      return ascii.substring(0, ascii.length - size - 1) + Array(size + 1).join("▀");
    }
    return ascii.substring(0, ascii.length - 1);
  };
  _this.createASCII = function(cellSize, margin) {
    cellSize = cellSize || 1;
    if (cellSize < 2) {
      return _createHalfASCII(margin);
    }
    cellSize -= 1;
    margin = typeof margin == "undefined" ? cellSize * 2 : margin;
    const size = _this.getModuleCount() * cellSize + margin * 2;
    const min = margin;
    const max = size - margin;
    let y, x, r, p;
    const white = Array(cellSize + 1).join("██");
    const black = Array(cellSize + 1).join("  ");
    let ascii = "";
    let line = "";
    for (y = 0; y < size; y += 1) {
      r = Math.floor((y - min) / cellSize);
      line = "";
      for (x = 0; x < size; x += 1) {
        p = 1;
        if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {
          p = 0;
        }
        line += p ? white : black;
      }
      for (r = 0; r < cellSize; r += 1) {
        ascii += line + "\n";
      }
    }
    return ascii.substring(0, ascii.length - 1);
  };
  _this.renderTo2dContext = function(context, cellSize) {
    cellSize = cellSize || 2;
    const length = _this.getModuleCount();
    for (let row = 0; row < length; row++) {
      for (let col = 0; col < length; col++) {
        context.fillStyle = _this.isDark(row, col) ? "black" : "white";
        context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  };
  return _this;
};
qrcode.stringToBytes = function(s) {
  const bytes = [];
  for (let i = 0; i < s.length; i += 1) {
    const c = s.charCodeAt(i);
    bytes.push(c & 255);
  }
  return bytes;
};
qrcode.createStringToBytes = function(unicodeData, numChars) {
  const unicodeMap = function() {
    const bin = base64DecodeInputStream(unicodeData);
    const read = function() {
      const b = bin.read();
      if (b == -1) throw "eof";
      return b;
    };
    let count = 0;
    const unicodeMap2 = {};
    while (true) {
      const b0 = bin.read();
      if (b0 == -1) break;
      const b1 = read();
      const b2 = read();
      const b3 = read();
      const k = String.fromCharCode(b0 << 8 | b1);
      const v = b2 << 8 | b3;
      unicodeMap2[k] = v;
      count += 1;
    }
    if (count != numChars) {
      throw count + " != " + numChars;
    }
    return unicodeMap2;
  }();
  const unknownChar = "?".charCodeAt(0);
  return function(s) {
    const bytes = [];
    for (let i = 0; i < s.length; i += 1) {
      const c = s.charCodeAt(i);
      if (c < 128) {
        bytes.push(c);
      } else {
        const b = unicodeMap[s.charAt(i)];
        if (typeof b == "number") {
          if ((b & 255) == b) {
            bytes.push(b);
          } else {
            bytes.push(b >>> 8);
            bytes.push(b & 255);
          }
        } else {
          bytes.push(unknownChar);
        }
      }
    }
    return bytes;
  };
};
const QRMode = {
  MODE_NUMBER: 1 << 0,
  MODE_ALPHA_NUM: 1 << 1,
  MODE_8BIT_BYTE: 1 << 2,
  MODE_KANJI: 1 << 3
};
const QRErrorCorrectionLevel = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2
};
const QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
};
const QRUtil = function() {
  const PATTERN_POSITION_TABLE = [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]
  ];
  const G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
  const G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
  const G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
  const _this = {};
  const getBCHDigit = function(data) {
    let digit = 0;
    while (data != 0) {
      digit += 1;
      data >>>= 1;
    }
    return digit;
  };
  _this.getBCHTypeInfo = function(data) {
    let d = data << 10;
    while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
      d ^= G15 << getBCHDigit(d) - getBCHDigit(G15);
    }
    return (data << 10 | d) ^ G15_MASK;
  };
  _this.getBCHTypeNumber = function(data) {
    let d = data << 12;
    while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
      d ^= G18 << getBCHDigit(d) - getBCHDigit(G18);
    }
    return data << 12 | d;
  };
  _this.getPatternPosition = function(typeNumber) {
    return PATTERN_POSITION_TABLE[typeNumber - 1];
  };
  _this.getMaskFunction = function(maskPattern) {
    switch (maskPattern) {
      case QRMaskPattern.PATTERN000:
        return function(i, j) {
          return (i + j) % 2 == 0;
        };
      case QRMaskPattern.PATTERN001:
        return function(i, j) {
          return i % 2 == 0;
        };
      case QRMaskPattern.PATTERN010:
        return function(i, j) {
          return j % 3 == 0;
        };
      case QRMaskPattern.PATTERN011:
        return function(i, j) {
          return (i + j) % 3 == 0;
        };
      case QRMaskPattern.PATTERN100:
        return function(i, j) {
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
        };
      case QRMaskPattern.PATTERN101:
        return function(i, j) {
          return i * j % 2 + i * j % 3 == 0;
        };
      case QRMaskPattern.PATTERN110:
        return function(i, j) {
          return (i * j % 2 + i * j % 3) % 2 == 0;
        };
      case QRMaskPattern.PATTERN111:
        return function(i, j) {
          return (i * j % 3 + (i + j) % 2) % 2 == 0;
        };
      default:
        throw "bad maskPattern:" + maskPattern;
    }
  };
  _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
    let a = qrPolynomial([1], 0);
    for (let i = 0; i < errorCorrectLength; i += 1) {
      a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0));
    }
    return a;
  };
  _this.getLengthInBits = function(mode, type) {
    if (1 <= type && type < 10) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 10;
        case QRMode.MODE_ALPHA_NUM:
          return 9;
        case QRMode.MODE_8BIT_BYTE:
          return 8;
        case QRMode.MODE_KANJI:
          return 8;
        default:
          throw "mode:" + mode;
      }
    } else if (type < 27) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 12;
        case QRMode.MODE_ALPHA_NUM:
          return 11;
        case QRMode.MODE_8BIT_BYTE:
          return 16;
        case QRMode.MODE_KANJI:
          return 10;
        default:
          throw "mode:" + mode;
      }
    } else if (type < 41) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 14;
        case QRMode.MODE_ALPHA_NUM:
          return 13;
        case QRMode.MODE_8BIT_BYTE:
          return 16;
        case QRMode.MODE_KANJI:
          return 12;
        default:
          throw "mode:" + mode;
      }
    } else {
      throw "type:" + type;
    }
  };
  _this.getLostPoint = function(qrcode2) {
    const moduleCount = qrcode2.getModuleCount();
    let lostPoint = 0;
    for (let row = 0; row < moduleCount; row += 1) {
      for (let col = 0; col < moduleCount; col += 1) {
        let sameCount = 0;
        const dark = qrcode2.isDark(row, col);
        for (let r = -1; r <= 1; r += 1) {
          if (row + r < 0 || moduleCount <= row + r) {
            continue;
          }
          for (let c = -1; c <= 1; c += 1) {
            if (col + c < 0 || moduleCount <= col + c) {
              continue;
            }
            if (r == 0 && c == 0) {
              continue;
            }
            if (dark == qrcode2.isDark(row + r, col + c)) {
              sameCount += 1;
            }
          }
        }
        if (sameCount > 5) {
          lostPoint += 3 + sameCount - 5;
        }
      }
    }
    for (let row = 0; row < moduleCount - 1; row += 1) {
      for (let col = 0; col < moduleCount - 1; col += 1) {
        let count = 0;
        if (qrcode2.isDark(row, col)) count += 1;
        if (qrcode2.isDark(row + 1, col)) count += 1;
        if (qrcode2.isDark(row, col + 1)) count += 1;
        if (qrcode2.isDark(row + 1, col + 1)) count += 1;
        if (count == 0 || count == 4) {
          lostPoint += 3;
        }
      }
    }
    for (let row = 0; row < moduleCount; row += 1) {
      for (let col = 0; col < moduleCount - 6; col += 1) {
        if (qrcode2.isDark(row, col) && !qrcode2.isDark(row, col + 1) && qrcode2.isDark(row, col + 2) && qrcode2.isDark(row, col + 3) && qrcode2.isDark(row, col + 4) && !qrcode2.isDark(row, col + 5) && qrcode2.isDark(row, col + 6)) {
          lostPoint += 40;
        }
      }
    }
    for (let col = 0; col < moduleCount; col += 1) {
      for (let row = 0; row < moduleCount - 6; row += 1) {
        if (qrcode2.isDark(row, col) && !qrcode2.isDark(row + 1, col) && qrcode2.isDark(row + 2, col) && qrcode2.isDark(row + 3, col) && qrcode2.isDark(row + 4, col) && !qrcode2.isDark(row + 5, col) && qrcode2.isDark(row + 6, col)) {
          lostPoint += 40;
        }
      }
    }
    let darkCount = 0;
    for (let col = 0; col < moduleCount; col += 1) {
      for (let row = 0; row < moduleCount; row += 1) {
        if (qrcode2.isDark(row, col)) {
          darkCount += 1;
        }
      }
    }
    const ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
    lostPoint += ratio * 10;
    return lostPoint;
  };
  return _this;
}();
const QRMath = function() {
  const EXP_TABLE = new Array(256);
  const LOG_TABLE = new Array(256);
  for (let i = 0; i < 8; i += 1) {
    EXP_TABLE[i] = 1 << i;
  }
  for (let i = 8; i < 256; i += 1) {
    EXP_TABLE[i] = EXP_TABLE[i - 4] ^ EXP_TABLE[i - 5] ^ EXP_TABLE[i - 6] ^ EXP_TABLE[i - 8];
  }
  for (let i = 0; i < 255; i += 1) {
    LOG_TABLE[EXP_TABLE[i]] = i;
  }
  const _this = {};
  _this.glog = function(n) {
    if (n < 1) {
      throw "glog(" + n + ")";
    }
    return LOG_TABLE[n];
  };
  _this.gexp = function(n) {
    while (n < 0) {
      n += 255;
    }
    while (n >= 256) {
      n -= 255;
    }
    return EXP_TABLE[n];
  };
  return _this;
}();
const qrPolynomial = function(num, shift) {
  if (typeof num.length == "undefined") {
    throw num.length + "/" + shift;
  }
  const _num = function() {
    let offset = 0;
    while (offset < num.length && num[offset] == 0) {
      offset += 1;
    }
    const _num2 = new Array(num.length - offset + shift);
    for (let i = 0; i < num.length - offset; i += 1) {
      _num2[i] = num[i + offset];
    }
    return _num2;
  }();
  const _this = {};
  _this.getAt = function(index) {
    return _num[index];
  };
  _this.getLength = function() {
    return _num.length;
  };
  _this.multiply = function(e) {
    const num2 = new Array(_this.getLength() + e.getLength() - 1);
    for (let i = 0; i < _this.getLength(); i += 1) {
      for (let j = 0; j < e.getLength(); j += 1) {
        num2[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i)) + QRMath.glog(e.getAt(j)));
      }
    }
    return qrPolynomial(num2, 0);
  };
  _this.mod = function(e) {
    if (_this.getLength() - e.getLength() < 0) {
      return _this;
    }
    const ratio = QRMath.glog(_this.getAt(0)) - QRMath.glog(e.getAt(0));
    const num2 = new Array(_this.getLength());
    for (let i = 0; i < _this.getLength(); i += 1) {
      num2[i] = _this.getAt(i);
    }
    for (let i = 0; i < e.getLength(); i += 1) {
      num2[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i)) + ratio);
    }
    return qrPolynomial(num2, 0).mod(e);
  };
  return _this;
};
const QRRSBlock = function() {
  const RS_BLOCK_TABLE = [
    // L
    // M
    // Q
    // H
    // 1
    [1, 26, 19],
    [1, 26, 16],
    [1, 26, 13],
    [1, 26, 9],
    // 2
    [1, 44, 34],
    [1, 44, 28],
    [1, 44, 22],
    [1, 44, 16],
    // 3
    [1, 70, 55],
    [1, 70, 44],
    [2, 35, 17],
    [2, 35, 13],
    // 4
    [1, 100, 80],
    [2, 50, 32],
    [2, 50, 24],
    [4, 25, 9],
    // 5
    [1, 134, 108],
    [2, 67, 43],
    [2, 33, 15, 2, 34, 16],
    [2, 33, 11, 2, 34, 12],
    // 6
    [2, 86, 68],
    [4, 43, 27],
    [4, 43, 19],
    [4, 43, 15],
    // 7
    [2, 98, 78],
    [4, 49, 31],
    [2, 32, 14, 4, 33, 15],
    [4, 39, 13, 1, 40, 14],
    // 8
    [2, 121, 97],
    [2, 60, 38, 2, 61, 39],
    [4, 40, 18, 2, 41, 19],
    [4, 40, 14, 2, 41, 15],
    // 9
    [2, 146, 116],
    [3, 58, 36, 2, 59, 37],
    [4, 36, 16, 4, 37, 17],
    [4, 36, 12, 4, 37, 13],
    // 10
    [2, 86, 68, 2, 87, 69],
    [4, 69, 43, 1, 70, 44],
    [6, 43, 19, 2, 44, 20],
    [6, 43, 15, 2, 44, 16],
    // 11
    [4, 101, 81],
    [1, 80, 50, 4, 81, 51],
    [4, 50, 22, 4, 51, 23],
    [3, 36, 12, 8, 37, 13],
    // 12
    [2, 116, 92, 2, 117, 93],
    [6, 58, 36, 2, 59, 37],
    [4, 46, 20, 6, 47, 21],
    [7, 42, 14, 4, 43, 15],
    // 13
    [4, 133, 107],
    [8, 59, 37, 1, 60, 38],
    [8, 44, 20, 4, 45, 21],
    [12, 33, 11, 4, 34, 12],
    // 14
    [3, 145, 115, 1, 146, 116],
    [4, 64, 40, 5, 65, 41],
    [11, 36, 16, 5, 37, 17],
    [11, 36, 12, 5, 37, 13],
    // 15
    [5, 109, 87, 1, 110, 88],
    [5, 65, 41, 5, 66, 42],
    [5, 54, 24, 7, 55, 25],
    [11, 36, 12, 7, 37, 13],
    // 16
    [5, 122, 98, 1, 123, 99],
    [7, 73, 45, 3, 74, 46],
    [15, 43, 19, 2, 44, 20],
    [3, 45, 15, 13, 46, 16],
    // 17
    [1, 135, 107, 5, 136, 108],
    [10, 74, 46, 1, 75, 47],
    [1, 50, 22, 15, 51, 23],
    [2, 42, 14, 17, 43, 15],
    // 18
    [5, 150, 120, 1, 151, 121],
    [9, 69, 43, 4, 70, 44],
    [17, 50, 22, 1, 51, 23],
    [2, 42, 14, 19, 43, 15],
    // 19
    [3, 141, 113, 4, 142, 114],
    [3, 70, 44, 11, 71, 45],
    [17, 47, 21, 4, 48, 22],
    [9, 39, 13, 16, 40, 14],
    // 20
    [3, 135, 107, 5, 136, 108],
    [3, 67, 41, 13, 68, 42],
    [15, 54, 24, 5, 55, 25],
    [15, 43, 15, 10, 44, 16],
    // 21
    [4, 144, 116, 4, 145, 117],
    [17, 68, 42],
    [17, 50, 22, 6, 51, 23],
    [19, 46, 16, 6, 47, 17],
    // 22
    [2, 139, 111, 7, 140, 112],
    [17, 74, 46],
    [7, 54, 24, 16, 55, 25],
    [34, 37, 13],
    // 23
    [4, 151, 121, 5, 152, 122],
    [4, 75, 47, 14, 76, 48],
    [11, 54, 24, 14, 55, 25],
    [16, 45, 15, 14, 46, 16],
    // 24
    [6, 147, 117, 4, 148, 118],
    [6, 73, 45, 14, 74, 46],
    [11, 54, 24, 16, 55, 25],
    [30, 46, 16, 2, 47, 17],
    // 25
    [8, 132, 106, 4, 133, 107],
    [8, 75, 47, 13, 76, 48],
    [7, 54, 24, 22, 55, 25],
    [22, 45, 15, 13, 46, 16],
    // 26
    [10, 142, 114, 2, 143, 115],
    [19, 74, 46, 4, 75, 47],
    [28, 50, 22, 6, 51, 23],
    [33, 46, 16, 4, 47, 17],
    // 27
    [8, 152, 122, 4, 153, 123],
    [22, 73, 45, 3, 74, 46],
    [8, 53, 23, 26, 54, 24],
    [12, 45, 15, 28, 46, 16],
    // 28
    [3, 147, 117, 10, 148, 118],
    [3, 73, 45, 23, 74, 46],
    [4, 54, 24, 31, 55, 25],
    [11, 45, 15, 31, 46, 16],
    // 29
    [7, 146, 116, 7, 147, 117],
    [21, 73, 45, 7, 74, 46],
    [1, 53, 23, 37, 54, 24],
    [19, 45, 15, 26, 46, 16],
    // 30
    [5, 145, 115, 10, 146, 116],
    [19, 75, 47, 10, 76, 48],
    [15, 54, 24, 25, 55, 25],
    [23, 45, 15, 25, 46, 16],
    // 31
    [13, 145, 115, 3, 146, 116],
    [2, 74, 46, 29, 75, 47],
    [42, 54, 24, 1, 55, 25],
    [23, 45, 15, 28, 46, 16],
    // 32
    [17, 145, 115],
    [10, 74, 46, 23, 75, 47],
    [10, 54, 24, 35, 55, 25],
    [19, 45, 15, 35, 46, 16],
    // 33
    [17, 145, 115, 1, 146, 116],
    [14, 74, 46, 21, 75, 47],
    [29, 54, 24, 19, 55, 25],
    [11, 45, 15, 46, 46, 16],
    // 34
    [13, 145, 115, 6, 146, 116],
    [14, 74, 46, 23, 75, 47],
    [44, 54, 24, 7, 55, 25],
    [59, 46, 16, 1, 47, 17],
    // 35
    [12, 151, 121, 7, 152, 122],
    [12, 75, 47, 26, 76, 48],
    [39, 54, 24, 14, 55, 25],
    [22, 45, 15, 41, 46, 16],
    // 36
    [6, 151, 121, 14, 152, 122],
    [6, 75, 47, 34, 76, 48],
    [46, 54, 24, 10, 55, 25],
    [2, 45, 15, 64, 46, 16],
    // 37
    [17, 152, 122, 4, 153, 123],
    [29, 74, 46, 14, 75, 47],
    [49, 54, 24, 10, 55, 25],
    [24, 45, 15, 46, 46, 16],
    // 38
    [4, 152, 122, 18, 153, 123],
    [13, 74, 46, 32, 75, 47],
    [48, 54, 24, 14, 55, 25],
    [42, 45, 15, 32, 46, 16],
    // 39
    [20, 147, 117, 4, 148, 118],
    [40, 75, 47, 7, 76, 48],
    [43, 54, 24, 22, 55, 25],
    [10, 45, 15, 67, 46, 16],
    // 40
    [19, 148, 118, 6, 149, 119],
    [18, 75, 47, 31, 76, 48],
    [34, 54, 24, 34, 55, 25],
    [20, 45, 15, 61, 46, 16]
  ];
  const qrRSBlock = function(totalCount, dataCount) {
    const _this2 = {};
    _this2.totalCount = totalCount;
    _this2.dataCount = dataCount;
    return _this2;
  };
  const _this = {};
  const getRsBlockTable = function(typeNumber, errorCorrectionLevel) {
    switch (errorCorrectionLevel) {
      case QRErrorCorrectionLevel.L:
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectionLevel.M:
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectionLevel.Q:
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectionLevel.H:
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default:
        return void 0;
    }
  };
  _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {
    const rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);
    if (typeof rsBlock == "undefined") {
      throw "bad rs block @ typeNumber:" + typeNumber + "/errorCorrectionLevel:" + errorCorrectionLevel;
    }
    const length = rsBlock.length / 3;
    const list = [];
    for (let i = 0; i < length; i += 1) {
      const count = rsBlock[i * 3 + 0];
      const totalCount = rsBlock[i * 3 + 1];
      const dataCount = rsBlock[i * 3 + 2];
      for (let j = 0; j < count; j += 1) {
        list.push(qrRSBlock(totalCount, dataCount));
      }
    }
    return list;
  };
  return _this;
}();
const qrBitBuffer = function() {
  const _buffer = [];
  let _length = 0;
  const _this = {};
  _this.getBuffer = function() {
    return _buffer;
  };
  _this.getAt = function(index) {
    const bufIndex = Math.floor(index / 8);
    return (_buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
  };
  _this.put = function(num, length) {
    for (let i = 0; i < length; i += 1) {
      _this.putBit((num >>> length - i - 1 & 1) == 1);
    }
  };
  _this.getLengthInBits = function() {
    return _length;
  };
  _this.putBit = function(bit) {
    const bufIndex = Math.floor(_length / 8);
    if (_buffer.length <= bufIndex) {
      _buffer.push(0);
    }
    if (bit) {
      _buffer[bufIndex] |= 128 >>> _length % 8;
    }
    _length += 1;
  };
  return _this;
};
const qrNumber = function(data) {
  const _mode = QRMode.MODE_NUMBER;
  const _data = data;
  const _this = {};
  _this.getMode = function() {
    return _mode;
  };
  _this.getLength = function(buffer) {
    return _data.length;
  };
  _this.write = function(buffer) {
    const data2 = _data;
    let i = 0;
    while (i + 2 < data2.length) {
      buffer.put(strToNum(data2.substring(i, i + 3)), 10);
      i += 3;
    }
    if (i < data2.length) {
      if (data2.length - i == 1) {
        buffer.put(strToNum(data2.substring(i, i + 1)), 4);
      } else if (data2.length - i == 2) {
        buffer.put(strToNum(data2.substring(i, i + 2)), 7);
      }
    }
  };
  const strToNum = function(s) {
    let num = 0;
    for (let i = 0; i < s.length; i += 1) {
      num = num * 10 + chatToNum(s.charAt(i));
    }
    return num;
  };
  const chatToNum = function(c) {
    if ("0" <= c && c <= "9") {
      return c.charCodeAt(0) - "0".charCodeAt(0);
    }
    throw "illegal char :" + c;
  };
  return _this;
};
const qrAlphaNum = function(data) {
  const _mode = QRMode.MODE_ALPHA_NUM;
  const _data = data;
  const _this = {};
  _this.getMode = function() {
    return _mode;
  };
  _this.getLength = function(buffer) {
    return _data.length;
  };
  _this.write = function(buffer) {
    const s = _data;
    let i = 0;
    while (i + 1 < s.length) {
      buffer.put(
        getCode(s.charAt(i)) * 45 + getCode(s.charAt(i + 1)),
        11
      );
      i += 2;
    }
    if (i < s.length) {
      buffer.put(getCode(s.charAt(i)), 6);
    }
  };
  const getCode = function(c) {
    if ("0" <= c && c <= "9") {
      return c.charCodeAt(0) - "0".charCodeAt(0);
    } else if ("A" <= c && c <= "Z") {
      return c.charCodeAt(0) - "A".charCodeAt(0) + 10;
    } else {
      switch (c) {
        case " ":
          return 36;
        case "$":
          return 37;
        case "%":
          return 38;
        case "*":
          return 39;
        case "+":
          return 40;
        case "-":
          return 41;
        case ".":
          return 42;
        case "/":
          return 43;
        case ":":
          return 44;
        default:
          throw "illegal char :" + c;
      }
    }
  };
  return _this;
};
const qr8BitByte = function(data) {
  const _mode = QRMode.MODE_8BIT_BYTE;
  const _bytes = qrcode.stringToBytes(data);
  const _this = {};
  _this.getMode = function() {
    return _mode;
  };
  _this.getLength = function(buffer) {
    return _bytes.length;
  };
  _this.write = function(buffer) {
    for (let i = 0; i < _bytes.length; i += 1) {
      buffer.put(_bytes[i], 8);
    }
  };
  return _this;
};
const qrKanji = function(data) {
  const _mode = QRMode.MODE_KANJI;
  const stringToBytes = qrcode.stringToBytes;
  !function(c, code) {
    const test = stringToBytes(c);
    if (test.length != 2 || (test[0] << 8 | test[1]) != code) {
      throw "sjis not supported.";
    }
  }("友", 38726);
  const _bytes = stringToBytes(data);
  const _this = {};
  _this.getMode = function() {
    return _mode;
  };
  _this.getLength = function(buffer) {
    return ~~(_bytes.length / 2);
  };
  _this.write = function(buffer) {
    const data2 = _bytes;
    let i = 0;
    while (i + 1 < data2.length) {
      let c = (255 & data2[i]) << 8 | 255 & data2[i + 1];
      if (33088 <= c && c <= 40956) {
        c -= 33088;
      } else if (57408 <= c && c <= 60351) {
        c -= 49472;
      } else {
        throw "illegal char at " + (i + 1) + "/" + c;
      }
      c = (c >>> 8 & 255) * 192 + (c & 255);
      buffer.put(c, 13);
      i += 2;
    }
    if (i < data2.length) {
      throw "illegal char at " + (i + 1);
    }
  };
  return _this;
};
const byteArrayOutputStream = function() {
  const _bytes = [];
  const _this = {};
  _this.writeByte = function(b) {
    _bytes.push(b & 255);
  };
  _this.writeShort = function(i) {
    _this.writeByte(i);
    _this.writeByte(i >>> 8);
  };
  _this.writeBytes = function(b, off, len) {
    off = off || 0;
    len = len || b.length;
    for (let i = 0; i < len; i += 1) {
      _this.writeByte(b[i + off]);
    }
  };
  _this.writeString = function(s) {
    for (let i = 0; i < s.length; i += 1) {
      _this.writeByte(s.charCodeAt(i));
    }
  };
  _this.toByteArray = function() {
    return _bytes;
  };
  _this.toString = function() {
    let s = "";
    s += "[";
    for (let i = 0; i < _bytes.length; i += 1) {
      if (i > 0) {
        s += ",";
      }
      s += _bytes[i];
    }
    s += "]";
    return s;
  };
  return _this;
};
const base64EncodeOutputStream = function() {
  let _buffer = 0;
  let _buflen = 0;
  let _length = 0;
  let _base64 = "";
  const _this = {};
  const writeEncoded = function(b) {
    _base64 += String.fromCharCode(encode(b & 63));
  };
  const encode = function(n) {
    if (n < 0) {
      throw "n:" + n;
    } else if (n < 26) {
      return 65 + n;
    } else if (n < 52) {
      return 97 + (n - 26);
    } else if (n < 62) {
      return 48 + (n - 52);
    } else if (n == 62) {
      return 43;
    } else if (n == 63) {
      return 47;
    } else {
      throw "n:" + n;
    }
  };
  _this.writeByte = function(n) {
    _buffer = _buffer << 8 | n & 255;
    _buflen += 8;
    _length += 1;
    while (_buflen >= 6) {
      writeEncoded(_buffer >>> _buflen - 6);
      _buflen -= 6;
    }
  };
  _this.flush = function() {
    if (_buflen > 0) {
      writeEncoded(_buffer << 6 - _buflen);
      _buffer = 0;
      _buflen = 0;
    }
    if (_length % 3 != 0) {
      const padlen = 3 - _length % 3;
      for (let i = 0; i < padlen; i += 1) {
        _base64 += "=";
      }
    }
  };
  _this.toString = function() {
    return _base64;
  };
  return _this;
};
const base64DecodeInputStream = function(str) {
  const _str = str;
  let _pos = 0;
  let _buffer = 0;
  let _buflen = 0;
  const _this = {};
  _this.read = function() {
    while (_buflen < 8) {
      if (_pos >= _str.length) {
        if (_buflen == 0) {
          return -1;
        }
        throw "unexpected end of file./" + _buflen;
      }
      const c = _str.charAt(_pos);
      _pos += 1;
      if (c == "=") {
        _buflen = 0;
        return -1;
      } else if (c.match(/^\s$/)) {
        continue;
      }
      _buffer = _buffer << 6 | decode(c.charCodeAt(0));
      _buflen += 6;
    }
    const n = _buffer >>> _buflen - 8 & 255;
    _buflen -= 8;
    return n;
  };
  const decode = function(c) {
    if (65 <= c && c <= 90) {
      return c - 65;
    } else if (97 <= c && c <= 122) {
      return c - 97 + 26;
    } else if (48 <= c && c <= 57) {
      return c - 48 + 52;
    } else if (c == 43) {
      return 62;
    } else if (c == 47) {
      return 63;
    } else {
      throw "c:" + c;
    }
  };
  return _this;
};
const gifImage = function(width, height) {
  const _width = width;
  const _height = height;
  const _data = new Array(width * height);
  const _this = {};
  _this.setPixel = function(x, y, pixel) {
    _data[y * _width + x] = pixel;
  };
  _this.write = function(out) {
    out.writeString("GIF87a");
    out.writeShort(_width);
    out.writeShort(_height);
    out.writeByte(128);
    out.writeByte(0);
    out.writeByte(0);
    out.writeByte(0);
    out.writeByte(0);
    out.writeByte(0);
    out.writeByte(255);
    out.writeByte(255);
    out.writeByte(255);
    out.writeString(",");
    out.writeShort(0);
    out.writeShort(0);
    out.writeShort(_width);
    out.writeShort(_height);
    out.writeByte(0);
    const lzwMinCodeSize = 2;
    const raster = getLZWRaster(lzwMinCodeSize);
    out.writeByte(lzwMinCodeSize);
    let offset = 0;
    while (raster.length - offset > 255) {
      out.writeByte(255);
      out.writeBytes(raster, offset, 255);
      offset += 255;
    }
    out.writeByte(raster.length - offset);
    out.writeBytes(raster, offset, raster.length - offset);
    out.writeByte(0);
    out.writeString(";");
  };
  const bitOutputStream = function(out) {
    const _out = out;
    let _bitLength = 0;
    let _bitBuffer = 0;
    const _this2 = {};
    _this2.write = function(data, length) {
      if (data >>> length != 0) {
        throw "length over";
      }
      while (_bitLength + length >= 8) {
        _out.writeByte(255 & (data << _bitLength | _bitBuffer));
        length -= 8 - _bitLength;
        data >>>= 8 - _bitLength;
        _bitBuffer = 0;
        _bitLength = 0;
      }
      _bitBuffer = data << _bitLength | _bitBuffer;
      _bitLength = _bitLength + length;
    };
    _this2.flush = function() {
      if (_bitLength > 0) {
        _out.writeByte(_bitBuffer);
      }
    };
    return _this2;
  };
  const getLZWRaster = function(lzwMinCodeSize) {
    const clearCode = 1 << lzwMinCodeSize;
    const endCode = (1 << lzwMinCodeSize) + 1;
    let bitLength = lzwMinCodeSize + 1;
    const table = lzwTable();
    for (let i = 0; i < clearCode; i += 1) {
      table.add(String.fromCharCode(i));
    }
    table.add(String.fromCharCode(clearCode));
    table.add(String.fromCharCode(endCode));
    const byteOut = byteArrayOutputStream();
    const bitOut = bitOutputStream(byteOut);
    bitOut.write(clearCode, bitLength);
    let dataIndex = 0;
    let s = String.fromCharCode(_data[dataIndex]);
    dataIndex += 1;
    while (dataIndex < _data.length) {
      const c = String.fromCharCode(_data[dataIndex]);
      dataIndex += 1;
      if (table.contains(s + c)) {
        s = s + c;
      } else {
        bitOut.write(table.indexOf(s), bitLength);
        if (table.size() < 4095) {
          if (table.size() == 1 << bitLength) {
            bitLength += 1;
          }
          table.add(s + c);
        }
        s = c;
      }
    }
    bitOut.write(table.indexOf(s), bitLength);
    bitOut.write(endCode, bitLength);
    bitOut.flush();
    return byteOut.toByteArray();
  };
  const lzwTable = function() {
    const _map = {};
    let _size = 0;
    const _this2 = {};
    _this2.add = function(key) {
      if (_this2.contains(key)) {
        throw "dup key:" + key;
      }
      _map[key] = _size;
      _size += 1;
    };
    _this2.size = function() {
      return _size;
    };
    _this2.indexOf = function(key) {
      return _map[key];
    };
    _this2.contains = function(key) {
      return typeof _map[key] != "undefined";
    };
    return _this2;
  };
  return _this;
};
const createDataURL = function(width, height, getPixel) {
  const gif = gifImage(width, height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      gif.setPixel(x, y, getPixel(x, y));
    }
  }
  const b = byteArrayOutputStream();
  gif.write(b);
  const base64 = base64EncodeOutputStream();
  const bytes = b.toByteArray();
  for (let i = 0; i < bytes.length; i += 1) {
    base64.writeByte(bytes[i]);
  }
  base64.flush();
  return "data:image/gif;base64," + base64;
};
qrcode.stringToBytes;
class HbcPaymentError extends Error {
  constructor(code, message) {
    super(message ?? code);
    this.code = code;
  }
}
function toError(error) {
  const message = error.message ?? "";
  if (error.code === "PGRST202" || error.code === "42883") return new HbcPaymentError("unavailable", message);
  if (error.code === "28000" || error.code === "42501" || /not_authenticated/.test(message)) return new HbcPaymentError("login", message);
  if (error.code === "54000" || /too_many_requests/.test(message)) return new HbcPaymentError("limit", message);
  return new HbcPaymentError("unknown", message);
}
function firstRow(data) {
  return (Array.isArray(data) ? data[0] : data) ?? null;
}
async function initHbcPayment(amountUzs) {
  const { data, error } = await supabase.rpc("hbc_payment_init", { p_amount_uzs: amountUzs });
  if (error) throw toError(error);
  const row = firstRow(data);
  if (!row?.transaction_code || !row.expires_at) throw new HbcPaymentError("unknown", "empty response");
  return {
    transactionCode: row.transaction_code,
    amountUzs: Number(row.amount_uzs ?? amountUzs),
    amountHbc: Number(row.amount_hbc ?? 0),
    expiresAt: row.expires_at,
    firstPurchase: row.first_purchase === true
  };
}
async function checkHbcPayment(code) {
  const { data, error } = await supabase.rpc("hbc_payment_status", { p_code: code });
  if (error) throw toError(error);
  const row = firstRow(data);
  if (!row) return null;
  const status = row.status === "success" || row.status === "rejected" ? row.status : "pending";
  return {
    status,
    creditedHbc: row.credited_hbc == null ? null : Number(row.credited_hbc),
    receiptSent: row.receipt_sent === true
  };
}
const BOT_USERNAME = "neoterrauz_bot";
const DEFAULT_RECEIVER = "9860 1866 1405 3814, NeoTerra";
const POLL_MS = 1e4;
const REVIEW_WAIT_MS = 60 * 60 * 1e3;
const COPIED_MS = 2e3;
const SUCCESS_CLOSE_MS = 4e3;
const fmt$1 = (n) => n.toLocaleString("en-US");
const CARD = "relative flex min-w-0 flex-col gap-3 rounded-xl border border-solid border-white/10 bg-white/[.04] p-4";
function Countdown({ endAt, label, onExpire }) {
  const [left, setLeft] = reactExports.useState(() => Math.max(0, endAt - Date.now()));
  const onExpireRef = reactExports.useRef(onExpire);
  onExpireRef.current = onExpire;
  reactExports.useEffect(() => {
    const tick = () => {
      const rest = Math.max(0, endAt - Date.now());
      setLeft(rest);
      if (rest > 0) return false;
      onExpireRef.current();
      return true;
    };
    if (tick()) return;
    const id = setInterval(() => {
      if (tick()) clearInterval(id);
    }, 1e3);
    return () => clearInterval(id);
  }, [endAt]);
  const total = Math.ceil(left / 1e3);
  const mm = String(Math.floor(total / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      role: "timer",
      "aria-label": label,
      className: "flex shrink-0 items-center gap-2 rounded-full border border-solid border-red-500/40 bg-red-500/10 px-3.5 py-1.5 font-mono text-lg font-bold tabular-nums text-red-500",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-[1.05em] w-[1.05em]" }),
        mm,
        ":",
        ss
      ]
    }
  );
}
function QrCanvas({ text }) {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const qr = qrcode(0, "M");
    qr.addData(text);
    qr.make();
    const count = qr.getModuleCount();
    const scale = 8;
    canvas.width = canvas.height = count * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0a0a0a";
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.isDark(r, c)) ctx.fillRect(c * scale, r * scale, scale, scale);
      }
    }
  }, [text]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref, "aria-hidden": "true", className: "block h-full w-full [image-rendering:pixelated]" });
}
function CopyField({ value, big = false, copied, copyLabel, copiedLabel, onCopy }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: onCopy,
      "aria-label": `${copyLabel}: ${value}`,
      className: `relative mt-1.5 flex w-full items-center justify-between gap-2 rounded-lg border border-solid px-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4FF00]/70 ${big ? "py-2.5" : "py-2"} ${copied ? "border-emerald-400/60 bg-emerald-400/10" : "border-white/[.12] bg-black/40 hover:border-[#D4FF00]/50"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `min-w-0 truncate font-mono font-bold ${big ? "text-[26px] leading-none tracking-[.12em]" : "text-[13px]"} ${copied ? "text-emerald-400" : big ? "text-[#FFD700] [text-shadow:0_0_18px_rgba(255,215,0,.55)]" : "text-white"}`,
            children: value
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `shrink-0 ${copied ? "text-emerald-400" : "text-white/50"}`, children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }) }),
        copied && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "status", className: "absolute -top-2.5 right-2 whitespace-nowrap rounded-full bg-emerald-400 px-2 py-px text-[10px] font-bold text-black", children: copiedLabel })
      ]
    }
  );
}
function PaymentModal({ isOpen, onClose, packageData, onSuccess, receiver = DEFAULT_RECEIVER }) {
  const { t } = useLanguage();
  const [phase, setPhase] = reactExports.useState("loading");
  const [tx, setTx] = reactExports.useState(null);
  const [errorCode, setErrorCode] = reactExports.useState("unknown");
  const [receiptSent, setReceiptSent] = reactExports.useState(false);
  const [credited, setCredited] = reactExports.useState(0);
  const [expired, setExpired] = reactExports.useState(false);
  const [attempt, setAttempt] = reactExports.useState(0);
  const [copied, setCopied] = reactExports.useState(null);
  const copiedTimer = reactExports.useRef(null);
  const onSuccessRef = reactExports.useRef(onSuccess);
  onSuccessRef.current = onSuccess;
  const amountUzs = packageData.uzs;
  reactExports.useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setPhase("loading");
    setTx(null);
    setReceiptSent(false);
    setExpired(false);
    setCopied(null);
    initHbcPayment(amountUzs).then((result) => {
      if (cancelled) return;
      setTx(result);
      setPhase("ready");
    }).catch((err) => {
      if (cancelled) return;
      setErrorCode(err instanceof HbcPaymentError ? err.code : "unknown");
      setPhase("error");
    });
    return () => {
      cancelled = true;
    };
  }, [isOpen, amountUzs, attempt]);
  reactExports.useEffect(() => {
    if (!isOpen || phase !== "ready" || !tx) return;
    const code2 = tx.transactionCode;
    const expiresAt = new Date(tx.expiresAt).getTime();
    const openedAt = Date.now();
    let stopped = false;
    let busy = false;
    let hasReceipt = false;
    let id = null;
    const stop = () => {
      stopped = true;
      if (id !== null) clearInterval(id);
      id = null;
    };
    const check = async () => {
      if (stopped || busy) return;
      const deadline = hasReceipt ? openedAt + REVIEW_WAIT_MS : expiresAt + POLL_MS * 2;
      if (Date.now() > deadline) {
        stop();
        return;
      }
      busy = true;
      try {
        const result = await checkHbcPayment(code2);
        if (stopped || !result) return;
        hasReceipt = result.receiptSent;
        setReceiptSent(result.receiptSent);
        if (result.status === "success") {
          stop();
          const amount = result.creditedHbc ?? 0;
          setCredited(amount);
          setPhase("success");
          onSuccessRef.current?.(amount);
        } else if (result.status === "rejected") {
          stop();
          setPhase("rejected");
        }
      } catch {
      } finally {
        busy = false;
      }
    };
    id = setInterval(() => void check(), POLL_MS);
    const onFocus = () => void check();
    window.addEventListener("focus", onFocus);
    return () => {
      stop();
      window.removeEventListener("focus", onFocus);
    };
  }, [isOpen, phase, tx]);
  reactExports.useEffect(() => {
    if (!isOpen || phase !== "success") return;
    const id = setTimeout(onClose, SUCCESS_CLOSE_MS);
    return () => clearTimeout(id);
  }, [isOpen, phase, onClose]);
  reactExports.useEffect(() => {
    if (!isOpen) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, [isOpen, onClose]);
  const code = tx?.transactionCode ?? "";
  const qrUrl = reactExports.useMemo(() => `https://t.me/${BOT_USERNAME}?start=${code}`, [code]);
  if (!isOpen) return null;
  const botHandle = `@${BOT_USERNAME}`;
  const telegramUrl = `tg://resolve?domain=${BOT_USERNAME}&start=${code}`;
  const bonus = tx?.firstPurchase === true;
  const shownHbc = packageData.hbc * (bonus ? 2 : 1);
  const timedOut = expired && !receiptSent;
  const errorText = errorCode === "login" ? t("premium.loginFirst") : errorCode === "unavailable" ? t("premium.pay.errUnavailable") : errorCode === "limit" ? t("premium.pay.errLimit") : t("premium.pay.errUnknown");
  function openTelegram(e) {
    if (timedOut) {
      e.preventDefault();
      return;
    }
    const bridge = window.launcher?.openExternal;
    if (!bridge) return;
    e.preventDefault();
    void bridge(telegramUrl);
  }
  async function copy(kind, text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(kind);
    if (copiedTimer.current) clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopied(null), COPIED_MS);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "payment-modal-title",
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md [-webkit-app-region:no-drag]",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex max-h-[94%] w-[90%] max-w-4xl flex-col overflow-hidden rounded-2xl border border-solid border-[#D4FF00]/20 bg-[#121212] shadow-2xl shadow-[#D4FF00]/10 motion-safe:animate-panel-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex shrink-0 items-start justify-between gap-4 border-0 border-b border-solid border-white/10 px-6 py-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: "payment-modal-title", className: "m-0 font-display text-[26px] font-bold uppercase leading-none tracking-[.04em] text-white", children: t("premium.pay.title") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] font-semibold text-[#D4FF00] [text-shadow:0_0_14px_rgba(212,255,0,.45)]", children: [
              t("premium.pay.amountLine", { uzs: fmt$1(amountUzs), hbc: fmt$1(shownHbc) }),
              bonus && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-[#D4FF00] px-2 py-px text-[11px] font-extrabold uppercase text-black [text-shadow:none]", children: t("premium.pay.bonusChip") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 mt-1 truncate text-xs text-white/50", children: [
              t("premium.pay.receiver"),
              ": ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "font-semibold text-white/80", children: receiver })
            ] })
          ] }),
          phase === "ready" && tx && !receiptSent && /* @__PURE__ */ jsxRuntimeExports.jsx(Countdown, { endAt: new Date(tx.expiresAt).getTime(), label: t("premium.pay.timeLeft"), onExpire: () => setExpired(true) })
        ] }),
        phase === "ready" && tx ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "thin-scrollbar grid min-h-0 grid-cols-1 gap-4 overflow-y-auto p-6 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${CARD} items-center text-center`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square w-full max-w-[200px] overflow-hidden rounded-xl bg-white p-[18px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(QrCanvas, { text: qrUrl }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "aria-hidden": "true",
                  className: "pointer-events-none absolute inset-0 hidden border-0 border-b-2 border-solid border-emerald-500/80 bg-gradient-to-b from-transparent via-emerald-400/5 to-emerald-400/25 motion-safe:block motion-safe:animate-scan-line"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-[13px] leading-snug text-white/80", children: t("premium.pay.qrStep") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `${CARD} items-center justify-center border-[#D4FF00] bg-[#D4FF00]/[.05] pt-7 text-center shadow-[0_0_28px_rgba(212,255,0,.16)]`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#D4FF00] px-3 py-[3px] text-[11px] font-extrabold uppercase tracking-wide text-black", children: t("premium.pay.pcBadge") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: telegramUrl,
                    onClick: openTelegram,
                    "aria-disabled": timedOut,
                    className: `flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-b from-[#2AABEE] to-[#1E88C7] px-4 py-4 text-[15px] font-bold text-white shadow-[0_10px_30px_rgba(34,158,217,.4),inset_0_1px_0_rgba(255,255,255,.3)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200 active:scale-[.985] ${timedOut ? "pointer-events-none opacity-40" : ""}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-5 w-5 shrink-0" }),
                      t("premium.pay.openTelegram")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-[13px] leading-snug text-white/70", children: t("premium.pay.pcHint") })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: CARD, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-[13px] font-semibold text-white/85", children: t("premium.pay.manualTitle") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-xs text-white/55", children: t("premium.pay.step1") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CopyField,
                {
                  value: botHandle,
                  copied: copied === "bot",
                  copyLabel: t("premium.pay.copy"),
                  copiedLabel: t("premium.pay.copied"),
                  onCopy: () => void copy("bot", botHandle)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-xs text-white/55", children: t("premium.pay.step2") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CopyField,
                {
                  big: true,
                  value: code,
                  copied: copied === "code",
                  copyLabel: t("premium.pay.copy"),
                  copiedLabel: t("premium.pay.copied"),
                  onCopy: () => void copy("code", code)
                }
              )
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[260px] flex-col items-center justify-center gap-3 p-6 text-center", children: [
          phase === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-9 w-9 animate-spin text-[#FFD700]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-sm text-white/70", children: t("premium.pay.preparing") })
          ] }),
          phase === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-11 w-11 text-red-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 max-w-md text-sm leading-snug text-white/80", children: errorText }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setAttempt((n) => n + 1),
                className: "mt-1 flex items-center gap-2 rounded-lg border border-solid border-[#D4FF00]/50 bg-[#D4FF00]/10 px-4 py-2 text-[13px] font-semibold text-[#D4FF00] transition hover:bg-[#D4FF00]/20",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
                  t("premium.pay.retry")
                ]
              }
            )
          ] }),
          phase === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-16 w-16 text-emerald-400 drop-shadow-[0_0_22px_rgba(52,211,153,.55)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 font-display text-[28px] font-bold uppercase leading-none tracking-[.04em] text-white", children: t("premium.pay.successTitle") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-base font-semibold text-[#FFD700]", children: t("premium.pay.credited", { hbc: fmt$1(credited) }) })
          ] }),
          phase === "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-16 w-16 text-red-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 font-display text-[28px] font-bold uppercase leading-none tracking-[.04em] text-white", children: t("premium.pay.rejectedTitle") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 max-w-md text-sm leading-snug text-white/75", children: t("premium.pay.rejectedText") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "flex shrink-0 items-center gap-4 border-0 border-t border-solid border-white/10 px-6 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { role: "status", className: "flex min-w-0 flex-1 items-center justify-center gap-2.5 text-center", children: phase === "ready" && (receiptSent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 shrink-0 animate-spin text-emerald-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-[13px] font-medium leading-snug text-emerald-400", children: t("premium.pay.reviewing") })
          ] }) : timedOut ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-[13px] font-semibold text-red-400", children: t("premium.pay.expired") }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 shrink-0 animate-spin text-[#FFD700]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-[13px] font-medium leading-snug text-[#FFD700] motion-safe:animate-pulse", children: t("premium.pay.waiting") })
          ] })) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "shrink-0 rounded-lg border border-solid border-white/10 bg-white/[.06] px-5 py-2 text-[13px] font-semibold text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60",
              children: phase === "success" || phase === "rejected" ? t("common.close") : t("common.cancel")
            }
          )
        ] })
      ] })
    }
  );
}
const TTL_MS = 10 * 6e4;
const STORAGE_KEY = "mcmodhub_hbc_leaders";
let memory = null;
let inflight = null;
function readStored() {
  if (memory) return memory;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.at !== "number" || !Array.isArray(parsed.rows)) return null;
    memory = parsed;
    return parsed;
  } catch {
    return null;
  }
}
function peekHbcLeaders() {
  return readStored()?.rows ?? null;
}
async function fetchHbcLeaders() {
  const cached = readStored();
  if (cached && Date.now() - cached.at < TTL_MS) return cached.rows;
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const { data, error } = await supabase.rpc("top_hbc_holders");
      if (error) return cached?.rows ?? [];
      const rows = (data ?? []).filter((r) => r.username).map((r) => ({ username: r.username, avatarUrl: r.avatar_url, hbc: Number(r.hbc) || 0 })).slice(0, 3);
      memory = { at: Date.now(), rows };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
      } catch {
      }
      return rows;
    } catch {
      return cached?.rows ?? [];
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}
const GOLD = "#FFD700";
const NEON = "#D4FF00";
const PRO_PRICE_HBC = 120;
const HBC_PACKS = [
  { id: "start", priceUzs: 50e3, hbc: 50 },
  { id: "standard", priceUzs: 120e3, hbc: 120 },
  { id: "pro", priceUzs: 250e3, hbc: 250, featured: true },
  { id: "elite", priceUzs: 500e3, hbc: 500, bonus: true },
  { id: "mega", priceUzs: 1e6, hbc: 1000 }
];
const BASE_RATE_UZS = 1000;
const fmt = (n) => n.toLocaleString("en-US");
const CUT = 16;
const CHAMFER = `polygon(${CUT}px 0, calc(100% - ${CUT}px) 0, 100% ${CUT}px, 100% 100%, 0 100%, 0 ${CUT}px)`;
const GLASS_FILL = "rgba(10,13,12,.5)";
function ChamferFrame({
  edge,
  corner,
  fill = GLASS_FILL,
  className = "",
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative ${className}`, style: { clipPath: CHAMFER, background: fill }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "pointer-events-none absolute inset-0 p-px", style: { background: edge, ...RING_MASK } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "pointer-events-none absolute left-0 h-px w-[23px] origin-left -rotate-45", style: { top: CUT, background: corner } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "pointer-events-none absolute right-0 h-px w-[23px] origin-right rotate-45", style: { top: CUT, background: corner } }),
    children
  ] });
}
const RING_MASK = {
  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  maskComposite: "exclude"
};
function IosTile({ icon: Icon, from, to, size }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      "aria-hidden": "true",
      className: "grid shrink-0 place-items-center rounded-[28%] shadow-[0_4px_14px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.35)]",
      style: { width: size, height: size, background: `linear-gradient(145deg, ${from}, ${to})` },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { strokeWidth: 2.3, className: "h-[54%] w-[54%] text-white" })
    }
  );
}
function CoinPyramid({ rows, size }) {
  const coins = [];
  for (let r = 0; r < rows; r++) {
    for (let i = 0; i <= r; i++) coins.push({ x: (i - r / 2) * 0.84, y: (r - (rows - 1) / 2) * 0.42 });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "relative block", style: { fontSize: size, width: "4.2em", height: `${1.5 + rows * 0.42}em` }, children: coins.map(({ x, y }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-1/2 top-1/2 leading-none", style: { transform: `translate(calc(-50% + ${x}em), calc(-50% + ${y}em))` }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(HbcCoin, {}) }, `${x}:${y}`)) });
}
function Glow({ color, w = 210, h = 90 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      "aria-hidden": "true",
      className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
      style: { width: w, height: h, background: `radial-gradient(closest-side, ${color}, transparent)` }
    }
  );
}
function SectionTitle({ kicker, title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[.5em] text-[#FFD700]/85", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-10 bg-gradient-to-r from-transparent to-[#FFD700]/70" }),
      kicker,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-10 bg-gradient-to-l from-transparent to-[#FFD700]/70" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "m-0 font-display text-[clamp(26px,2.7vw,44px)] font-bold uppercase leading-none tracking-[.08em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,.6)]", children: title }),
    children
  ] });
}
function withSlot(template, slot) {
  const i = template.indexOf("{n}");
  if (i < 0) return template;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    template.slice(0, i),
    slot,
    template.slice(i + 3)
  ] });
}
function BonusLine({ text }) {
  const i = text.indexOf("x2");
  if (i < 0) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: text });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    text.slice(0, i),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-[.15em] inline-block rounded-[.3em] bg-[#D4FF00] px-[.35em] text-black [text-shadow:none]", children: "x2" }),
    text.slice(i + 2)
  ] });
}
function TariffCard({ tariff, index, x2Label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative pt-[58px] motion-safe:animate-premium-rise", style: { animationDelay: `${120 + index * 70}ms` }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 z-10 flex h-[112px] items-center justify-center transition-transform duration-300 group-hover:-translate-y-1.5", children: tariff.art }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: tariff.onClick,
        "aria-label": tariff.ariaLabel,
        className: "block w-full transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-200 group-hover:-translate-y-[3px] active:translate-y-0",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          ChamferFrame,
          {
            edge: `linear-gradient(180deg, ${tariff.accent}, ${tariff.accent}33 55%, rgba(255,255,255,.08))`,
            corner: tariff.accent,
            fill: `radial-gradient(90% 55% at 50% 0%, ${tariff.tint}, transparent 72%), ${GLASS_FILL}`,
            className: "flex flex-col items-center pt-[62px] text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  "aria-hidden": "true",
                  className: "pointer-events-none absolute inset-x-[18%] top-0 h-[2px]",
                  style: { background: `linear-gradient(90deg, transparent, ${tariff.accent}, transparent)` }
                }
              ),
              tariff.x2 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-3 rounded-md px-1.5 py-px font-mono text-[10px] font-extrabold uppercase text-black", style: { background: NEON }, children: x2Label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] font-bold uppercase tracking-[.32em]", style: { color: tariff.accent }, children: tariff.kicker }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 font-display text-[clamp(26px,2.5vw,40px)] font-bold uppercase leading-none tracking-[.04em] text-white [text-shadow:0_2px_18px_rgba(0,0,0,.5)]", children: tariff.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-4 mt-2.5 min-h-[20px] px-3 text-[12.5px] font-semibold tabular-nums text-white/65", children: tariff.sub }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "flex w-full items-center justify-center py-[12px] font-display text-[15px] font-bold uppercase tracking-[.14em] tabular-nums transition-[filter] duration-200 group-hover:brightness-110",
                  style: { background: tariff.ctaBg, color: tariff.ctaFg },
                  children: tariff.cta
                }
              )
            ]
          }
        )
      }
    )
  ] });
}
function RateChips() {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center justify-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10.5px] font-bold uppercase tracking-[.3em] text-white/45", children: t("premium.rateTitle") }),
    [1, 10].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "flex items-center gap-1.5 rounded-full border border-solid border-[#FFD700]/35 bg-black/35 px-3 py-1 font-mono text-[13px] font-bold tabular-nums text-white",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HbcCoin, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#FFD700]", children: [
            n,
            " NTC"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "=" }),
          fmt(n * BASE_RATE_UZS),
          " ",
          t("premium.currency")
        ]
      },
      n
    ))
  ] });
}
function FirstBonusStrip() {
  const { t } = useLanguage();
  const sample = HBC_PACKS.find((p) => p.featured) ?? HBC_PACKS[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ChamferFrame,
    {
      edge: `linear-gradient(90deg, ${NEON}, ${NEON}40, ${NEON})`,
      corner: NEON,
      fill: `linear-gradient(90deg, rgba(212,255,0,.14), rgba(212,255,0,.04) 50%, rgba(212,255,0,.12)), ${GLASS_FILL}`,
      className: "mt-6 flex items-center gap-4 px-5 py-3 motion-safe:animate-premium-rise",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IosTile, { icon: Gift, from: "#C6F432", to: "#5FA800", size: 42 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 truncate font-display text-[19px] font-bold leading-tight tracking-[.03em]", style: { color: NEON }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(BonusLine, { text: t("premium.firstBonus") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mt-0.5 truncate text-[12.5px] text-white/60", children: t("premium.firstBonusHint") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex shrink-0 items-center gap-2 font-mono text-[18px] font-bold tabular-nums", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/55", children: fmt(sample.hbc) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-white/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: NEON }, children: [
            fmt(sample.hbc * 2),
            " NTC"
          ] })
        ] })
      ]
    }
  );
}
const PRO_PERKS = [
  { id: "party", icon: Users, from: "#5AC8FA", to: "#1E78D8", title: "premium.benefits.party", hint: "premium.benefits.partyHint" },
  { id: "badge", icon: BadgeCheck, from: "#FFE066", to: "#E8A800", title: "premium.benefits.badge", hint: "premium.benefits.badgeHint" },
  { id: "bg", icon: Image, from: "#B892FF", to: "#7B3FE4", title: "premium.benefits.backgrounds", hint: "premium.benefits.backgroundsHint" },
  { id: "fx", icon: Sparkles, from: "#FF9F6B", to: "#E8590C", title: "premium.benefits.fx", hint: "premium.benefits.fxHint" }
];
const HBC_USES = [
  { id: "skins", icon: Shirt, from: "#3FE08A", to: "#1FA855", title: "premium.uses.skins", hint: "premium.uses.skinsHint" },
  { id: "capes", icon: WandSparkles, from: "#FF6FA8", to: "#E0245E", title: "premium.uses.capes", hint: "premium.uses.capesHint" },
  // Keyslar vaqtincha yashirilgan (`lib/features.ts`) - o'rniga ishlab turgan "do'stlarga sovg'a".
  { id: "gifts", icon: Gift, from: "#FFB547", to: "#F08A00", title: "premium.uses.gifts", hint: "premium.uses.giftsHint" },
  { id: "maps", icon: Map, from: "#5AC8FA", to: "#1E78D8", title: "premium.uses.maps", hint: "premium.uses.mapsHint" }
];
const STEPS = [
  { id: "pick", icon: MousePointerClick, from: "#FFE066", to: "#E8A800", title: "premium.steps.pick", hint: "premium.steps.pickHint" },
  { id: "pay", icon: Send, from: "#5AC8FA", to: "#1E78D8", title: "premium.steps.pay", hint: "premium.steps.payHint" },
  { id: "get", icon: CircleCheck, from: "#7CF0A8", to: "#1FA855", title: "premium.steps.get", hint: "premium.steps.getHint" }
];
function PerkColumn({ accent, heading, items }) {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ChamferFrame,
    {
      edge: `linear-gradient(180deg, ${accent}, ${accent}26 50%, rgba(255,255,255,.06))`,
      corner: accent,
      fill: `radial-gradient(70% 40% at 50% 0%, ${accent}1f, transparent 70%), ${GLASS_FILL}`,
      className: "min-w-0 p-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "m-0 flex items-center gap-2 font-display text-[19px] font-bold uppercase tracking-[.08em]", style: { color: accent }, children: heading }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "m-0 mt-3.5 grid list-none gap-2 p-0", children: items.map(({ id, icon, from, to, title, hint }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex min-w-0 items-center gap-3 rounded-[14px] border border-solid border-white/[.08] bg-black/25 px-3 py-2.5 transition-colors duration-200 hover:border-white/[.18] hover:bg-black/35",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IosTile, { icon, from, to, size: 40 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 leading-tight", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-[14px] font-semibold text-white", children: t(title) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-[11.5px] text-white/55", children: t(hint) })
              ] })
            ]
          },
          id
        )) })
      ]
    }
  );
}
function BenefitsSection() {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "[contain-intrinsic-size:auto_640px] [content-visibility:auto]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { kicker: t("premium.perksKicker"), title: t("premium.perksTitle") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PerkColumn,
        {
          accent: GOLD,
          heading: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { fill: "currentColor", strokeWidth: 1.4, className: "h-5 w-5" }),
            " NeoTerra PRO"
          ] }),
          items: PRO_PERKS
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PerkColumn,
        {
          accent: "#3FE08A",
          heading: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[19px] leading-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HbcCoin, {}) }),
            t("premium.usesTitle")
          ] }),
          items: HBC_USES
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex items-center gap-3 rounded-[16px] border border-solid border-white/10 bg-black/30 px-5 py-4", children: STEPS.map(({ id, icon, from, to, title, hint }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IosTile, { icon, from, to, size: 40 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 leading-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-[11px] font-bold uppercase tracking-[.2em] text-white/40", children: t("premium.stepN", { n: i + 1 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-[14px] font-semibold text-white", children: t(title) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-[11.5px] text-white/50", children: t(hint) })
      ] }),
      i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-auto h-4 w-4 shrink-0 text-white/25" })
    ] }, id)) })
  ] });
}
const PLACE = {
  1: { metal: "linear-gradient(180deg,#FFF3A6,#FFD700 40%,#C99700)", color: "#FFD700", glow: "rgba(255,215,0,.45)", step: 150, avatar: 92 },
  2: { metal: "linear-gradient(180deg,#FFFFFF,#C9CED6 45%,#8E959F)", color: "#D5DAE1", glow: "rgba(213,218,225,.3)", step: 112, avatar: 74 },
  3: { metal: "linear-gradient(180deg,#FFD3B0,#D9824C 45%,#9C5426)", color: "#E39A66", glow: "rgba(227,154,102,.32)", step: 86, avatar: 74 }
};
function Helm({ leader, size, metal }) {
  const preferred = leader ? helmUrl(leader.username, leader.avatarUrl) : null;
  const [src, setSrc] = reactExports.useState(preferred);
  reactExports.useEffect(() => setSrc(preferred), [preferred]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block rounded-[22%] p-[3px] shadow-[0_10px_30px_rgba(0,0,0,.5)]", style: { background: metal, opacity: leader ? 1 : 0.35 }, children: src ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src,
      alt: "",
      draggable: false,
      loading: "lazy",
      onError: () => setSrc("skins/steve-helm.png"),
      className: "block rounded-[18%] bg-black/40 object-cover [image-rendering:pixelated]",
      style: { width: size, height: size }
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block rounded-[18%] bg-black/50", style: { width: size, height: size } }) });
}
function PodiumColumn({ leader, place }) {
  const p = PLACE[place];
  const first = place === 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative flex min-w-0 flex-col items-center", style: { "--pc": p.color, "--pg": p.glow }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex w-full min-w-0 flex-col items-center", children: [
      first && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            "aria-hidden": "true",
            className: "pointer-events-none absolute left-1/2 top-[45%] h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 transition-[transform,opacity] duration-[1200ms] ease-out [mask-image:radial-gradient(closest-side,#000,transparent)] group-hover:rotate-[30deg] group-hover:opacity-100 motion-reduce:transition-none",
            style: { background: "repeating-conic-gradient(from 0deg, rgba(255,215,0,.22) 0deg 7deg, transparent 7deg 20deg)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Crown,
          {
            fill: "currentColor",
            strokeWidth: 1.2,
            className: "relative -mb-1 h-9 w-9 text-[#FFD700] drop-shadow-[0_0_14px_rgba(255,215,0,.9)] transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transition-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-translate-y-2 group-hover:scale-[1.07] motion-reduce:transition-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 opacity-60 transition-[opacity,transform] duration-300 group-hover:scale-125 group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Glow, { color: p.glow, w: p.avatar * 2, h: p.avatar * 1.6 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Helm, { leader, size: p.avatar, metal: p.metal }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `relative mt-3 max-w-full truncate px-2 font-display font-bold tracking-[.03em] text-white transition-colors duration-200 [text-shadow:0_2px_14px_rgba(0,0,0,.7)] group-hover:text-[var(--pc)] ${first ? "text-[24px]" : "text-[19px]"}`,
          children: leader?.username ?? "---"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: `relative mb-3 mt-1.5 flex items-center gap-1.5 rounded-full border border-solid bg-black/45 px-3 py-1 font-mono font-bold tabular-nums transition-[transform,background-color,box-shadow] duration-200 group-hover:scale-105 group-hover:bg-black/60 group-hover:shadow-[0_0_18px_var(--pg)] motion-reduce:transition-none ${first ? "text-[17px]" : "text-[14px]"}`,
          style: { borderColor: `${p.color}66`, color: p.color, opacity: leader ? 1 : 0.4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HbcCoin, {}),
            leader ? fmt(leader.hbc) : "---",
            " NTC"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-[10px] w-full rounded-t-[6px] transition-[filter] duration-300 group-hover:brightness-125",
          style: { background: p.metal, boxShadow: `0 0 28px ${p.glow}` }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative grid w-full place-items-center overflow-hidden border-0 border-x border-solid",
          style: { height: p.step, borderColor: `${p.color}33`, background: `linear-gradient(180deg, ${p.color}26, ${GLASS_FILL} 60%, rgba(10,13,12,.2))` },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                "aria-hidden": "true",
                className: "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                style: { background: `linear-gradient(180deg, ${p.color}38, transparent 75%)` }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                "aria-hidden": "true",
                className: "pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-none group-hover:translate-x-[400%] group-hover:transition-transform group-hover:duration-700 group-hover:ease-out motion-reduce:hidden"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "relative bg-clip-text font-display text-[78px] font-bold leading-none text-transparent opacity-90 transition-[transform,filter,opacity] duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-110 group-hover:opacity-100 group-hover:[filter:drop-shadow(0_0_16px_var(--pg))] motion-reduce:transition-none",
                style: { backgroundImage: p.metal },
                children: place
              }
            )
          ]
        }
      )
    ] })
  ] });
}
function LeaderboardSection({ balance, onTopUp }) {
  const { t } = useLanguage();
  const ref = reactExports.useRef(null);
  const [leaders, setLeaders] = reactExports.useState(() => peekHbcLeaders());
  const [loaded, setLoaded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        void fetchHbcLeaders().then((rows) => {
          if (cancelled) return;
          setLeaders(rows);
          setLoaded(true);
        });
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);
  const [a = null, b = null, c = null] = leaders ?? [];
  const empty = loaded && (leaders?.length ?? 0) === 0;
  const need = c && balance !== null ? Math.max(0, c.hbc - balance + 1) : 0;
  const progress = c && balance !== null ? Math.min(1, balance / Math.max(1, c.hbc)) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, className: "relative [contain-intrinsic-size:auto_640px] [content-visibility:auto]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { kicker: t("premium.topKicker"), title: t("premium.topTitle"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 text-[13px] text-white/55", children: empty ? t("premium.topEmpty") : t("premium.topSub") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto mt-6 max-w-[780px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PodiumColumn, { leader: b, place: 2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PodiumColumn, { leader: a, place: 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PodiumColumn, { leader: c, place: 3 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[2px] w-full bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": "true", className: "mx-auto h-[26px] w-[80%] bg-[radial-gradient(closest-side,rgba(255,215,0,.18),transparent)]" })
    ] }),
    c && balance !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-4 flex max-w-[780px] items-center gap-4 rounded-[16px] border border-solid border-white/10 bg-black/35 px-5 py-3.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IosTile, { icon: TrendingUp, from: "#FFE066", to: "#E8A800", size: 40 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 truncate text-[14px] font-semibold text-white", children: need > 0 ? withSlot(t("premium.topNeed"), /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[#FFD700]", children: [
          fmt(need),
          " NTC"
        ] })) : t("premium.topReached") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-[6px] w-full overflow-hidden rounded-full bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-[#E8A800] to-[#FFE55C]", style: { width: `${Math.max(3, progress * 100)}%` } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 mt-1.5 flex items-center gap-1.5 truncate text-[11.5px] text-white/45", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 shrink-0" }),
          " ",
          t("premium.topYou", { hbc: fmt(balance) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onTopUp,
          className: "shrink-0 rounded-full px-4 py-2 font-display text-[13px] font-bold uppercase tracking-[.1em] text-[#1A1200] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-200",
          style: { background: "linear-gradient(180deg,#FFE55C,#E8A800)" },
          children: t("premium.topUp")
        }
      )
    ] })
  ] });
}
function PremiumPage({ backLabel, onBack }) {
  const { t, lang, numberLocale } = useLanguage();
  const { session, profile, refreshProfile } = useAuth();
  const { showToast } = useToast();
  const requestLogin = useAuthStore((s) => s.requestLogin);
  const scrollRef = reactExports.useRef(null);
  const isPro = useProStore((s) => s.isPro);
  const proUntil = useProStore((s) => s.proUntil);
  const reason = useProStore((s) => s.pageReason);
  const [pay, setPay] = reactExports.useState(null);
  const loggedIn = !!session && !!profile;
  const balance = profile?.hbc ?? 0;
  const proPrice = usePriceStore((s) => s.prices[PRO_PRICE_KEY]) ?? PRO_PRICE_HBC;
  const loadPrices = usePriceStore((s) => s.load);
  reactExports.useEffect(() => {
    void loadPrices();
  }, [loadPrices]);
  const [proDialog, setProDialog] = reactExports.useState(null);
  const [giftPro, setGiftPro] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!loggedIn) return;
    void useProStore.getState().refresh();
  }, [loggedIn]);
  const closePay = reactExports.useCallback(() => setPay(null), []);
  const handlePaid = reactExports.useCallback(() => {
    void refreshProfile();
  }, [refreshProfile]);
  const reasonText = reason?.kind === "party" ? t("pro.reasonParty") : reason?.kind === "map" ? t("pro.reasonMap", { name: reason.name }) : reason?.kind === "background" ? t("pro.reasonBackground", { name: reason.name }) : reason?.kind === "avatar" ? t("pro.reasonAvatar") : null;
  function ensureLoggedIn() {
    if (loggedIn) return true;
    showToast({ kind: "info", title: t("premium.loginFirst") });
    requestLogin();
    return false;
  }
  function handleBuyPro() {
    if (!ensureLoggedIn()) return;
    setProDialog({ busy: false, error: null });
  }
  async function confirmBuyPro() {
    setProDialog({ busy: true, error: null });
    const res = await purchaseLauncherPro();
    if (!res.ok) {
      setProDialog({ busy: false, error: purchaseErrorText(t, res.error) });
      return;
    }
    setProDialog(null);
    await Promise.all([refreshProfile(), useProStore.getState().refresh()]);
    showToast({ kind: "success", title: t("premium.proBought"), message: t("pro.untilShort", { date: formatProDate(res.proUntil, lang) }) });
  }
  function handleSelectPack(pack) {
    if (!ensureLoggedIn()) return;
    setPay(pack);
  }
  const tariffs = buildTariffs({
    t,
    isPro,
    proUntil,
    lang,
    proPrice,
    onBuyPro: handleBuyPro,
    onPack: handleSelectPack,
    onGift: () => ensureLoggedIn() && setGiftPro(true)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    FullScreenPage,
    {
      title: t("premium.title"),
      subtitle: t("premium.subtitle"),
      backLabel,
      onBack,
      closeOnEscape: !pay && !proDialog && !giftPro,
      background: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-md backdrop-saturate-[1.2]" }),
      actions: loggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[clamp(6px,.7vw,12px)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShopCodeButton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "flex items-center gap-1.5 rounded-full border border-solid border-yellow-300/25 bg-yellow-400/10 px-[clamp(10px,1vw,16px)] py-[clamp(5px,.55vw,9px)] font-mono text-[clamp(12px,1vw,17px)] font-bold tabular-nums",
            style: { color: GOLD },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HbcCoin, {}),
              balance.toLocaleString(numberLocale),
              " NTC"
            ]
          }
        )
      ] }) : void 0,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: scrollRef, className: "thin-scrollbar h-full overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[1120px] flex-col gap-16 px-[clamp(16px,2.4vw,44px)] pb-10 pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            !isPro && reasonText && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                role: "status",
                className: "m-0 mx-auto mb-5 flex w-fit max-w-full items-center gap-2 rounded-full border border-solid border-yellow-300/45 bg-yellow-400/10 px-4 py-1.5 text-[13px] font-medium text-[#FDE68A]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-[1.1em] w-[1.1em] shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0", children: reasonText })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { kicker: "NeoTerra", title: t("premium.tariffsTitle"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(RateChips, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-3 gap-x-[clamp(12px,1.4vw,24px)] gap-y-[clamp(10px,1.2vw,20px)]", children: tariffs.map((tariff, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TariffCard, { tariff, index: i, x2Label: t("premium.x2Chip") }, tariff.id)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FirstBonusStrip, {})
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BenefitsSection, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LeaderboardSection, { balance: loggedIn ? balance : null, onTopUp: () => scrollTop(scrollRef) })
        ] }) }),
        proDialog && /* @__PURE__ */ jsxRuntimeExports.jsx(
          PurchaseConfirmDialog,
          {
            target: { id: 0, name: t("premium.proDialogName"), priceHbc: proPrice },
            balance,
            loading: proDialog.busy,
            error: proDialog.error,
            onConfirm: () => void confirmBuyPro(),
            onCancel: () => setProDialog(null),
            onGetHbc: () => {
              setProDialog(null);
              scrollTop(scrollRef);
            }
          }
        ),
        giftPro && /* @__PURE__ */ jsxRuntimeExports.jsx(GiftFriendModal, { target: { kind: "pro" }, onClose: () => setGiftPro(false) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentModal, { isOpen: !!pay, onClose: closePay, packageData: { uzs: pay?.priceUzs ?? 0, hbc: pay?.hbc ?? 0 }, onSuccess: handlePaid })
      ]
    }
  );
}
function scrollTop(ref) {
  ref.current?.scrollTo({ top: 0, behavior: "smooth" });
}
function buildTariffs({ t, isPro, proUntil, lang, proPrice, onBuyPro, onPack, onGift }) {
  const currency = t("premium.currency");
  const byId = (id) => HBC_PACKS.find((p) => p.id === id);
  const pack = (p, look) => {
    const base = Math.floor(p.priceUzs / BASE_RATE_UZS);
    const bonus = p.hbc - base;
    const pct = base > 0 ? Math.round(bonus / base * 100) : 0;
    const price = `${fmt(p.priceUzs)} ${currency}`;
    return {
      id: p.id,
      kicker: look.kicker,
      ctaBg: look.ctaBg,
      ctaFg: look.ctaFg,
      accent: look.accent,
      tint: look.tint,
      title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        fmt(p.hbc),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[.5em] tracking-[.1em] text-white/70", children: "NTC" })
      ] }),
      sub: bonus > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: NEON }, children: t("premium.bonusLine", { bonus: fmt(bonus) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full px-1.5 py-px text-[10.5px] font-extrabold text-black", style: { background: NEON }, children: [
          "+",
          pct,
          "%"
        ] })
      ] }) : t("premium.rateLine", { n: fmt(BASE_RATE_UZS) }),
      art: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Glow, { color: look.glow }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CoinPyramid, { rows: look.rows, size: look.rows >= 4 ? 26 : 30 }) })
      ] }),
      cta: price,
      ariaLabel: t("premium.packLabel", { hbc: fmt(p.hbc), price }),
      x2: true,
      onClick: () => onPack(p)
    };
  };
  const daysLeft = proUntil ? Math.max(0, Math.round((Date.parse(proUntil) - Date.now()) / 864e5)) : null;
  const proSub = isPro && proUntil ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    t("pro.untilShort", { date: formatProDate(proUntil, lang) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/35", children: " · " }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#7CF0A8]", children: daysLeft ? t("pro.daysLeft", { n: daysLeft }) : t("pro.endsToday") })
  ] }) : t("premium.proApprox", { hbc: fmt(proPrice), uzs: fmt(proPrice * BASE_RATE_UZS) });
  return [
    {
      id: "sub",
      kicker: isPro ? t("premium.subActive") : t("premium.subMonthly"),
      title: "NeoTerra PRO",
      sub: proSub,
      art: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Glow, { color: "rgba(255,215,0,.45)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { fill: "currentColor", strokeWidth: 1.2, className: "relative h-[86px] w-[86px] text-[#FFD700] drop-shadow-[0_0_22px_rgba(255,215,0,.7)]" })
      ] }),
      cta: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
        isPro ? t("premium.extendPro") : t("premium.getPro"),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-40", children: "|" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(HbcCoin, {}),
        fmt(proPrice),
        " NTC"
      ] }),
      ariaLabel: `NeoTerra PRO - ${fmt(proPrice)} NTC`,
      ctaBg: "linear-gradient(180deg,#FFE55C,#FFD700 45%,#E8A800)",
      ctaFg: "#1A1200",
      accent: GOLD,
      tint: "rgba(255,215,0,.16)",
      onClick: onBuyPro
    },
    pack(byId("start"), {
      kicker: t("premium.kickerStart"),
      ctaBg: "linear-gradient(180deg,#3FE08A,#1FA855)",
      ctaFg: "#03140A",
      accent: "#3FE08A",
      tint: "rgba(46,204,113,.15)",
      rows: 1,
      glow: "rgba(46,204,113,.42)"
    }),
    pack(byId("standard"), {
      kicker: t("premium.kickerStandard"),
      ctaBg: "linear-gradient(180deg,#5AC8FA,#1E78D8)",
      ctaFg: "#020C18",
      accent: "#5AC8FA",
      tint: "rgba(90,200,250,.15)",
      rows: 2,
      glow: "rgba(90,200,250,.42)"
    }),
    pack(byId("pro"), {
      kicker: t("premium.bestChoice"),
      ctaBg: NEON,
      ctaFg: "#0B0F00",
      accent: NEON,
      tint: "rgba(212,255,0,.14)",
      rows: 3,
      glow: "rgba(212,255,0,.42)"
    }),
    pack(byId("elite"), {
      kicker: t("premium.bestValue"),
      ctaBg: "linear-gradient(180deg,#FFB547,#F08A00)",
      ctaFg: "#1F1000",
      accent: "#FFB547",
      tint: "rgba(255,170,60,.16)",
      rows: 4,
      glow: "rgba(255,170,60,.42)"
    }),
    {
      id: "gift",
      kicker: t("premium.giftKicker"),
      title: t("premium.giftTitle"),
      sub: t("premium.giftSub"),
      art: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Glow, { color: "rgba(255,77,141,.4)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative block -rotate-[8deg]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IosTile, { icon: Gift, from: "#FF7AB6", to: "#E0245E", size: 78 }) })
      ] }),
      cta: t("premium.giftCta"),
      ariaLabel: t("premium.giftTitle"),
      ctaBg: "linear-gradient(180deg,#FF6FA8,#E0245E)",
      ctaFg: "#FFFFFF",
      accent: "#FF6FA8",
      tint: "rgba(255,77,141,.15)",
      onClick: onGift
    }
  ];
}
export {
  HBC_PACKS,
  PRO_PRICE_HBC,
  PremiumPage
};
