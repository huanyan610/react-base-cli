/* prettier-ignore */
/* eslint-disable */
const _ChineseCharMap = {
  "，": ",",
  "。": ".",
  "（": "(",
  "）": ")",
  "：": ":",
  "”": '"',
  "“": '"',
  "｛": "{",
  "｝": "}",
  "【": "[",
  "】": "]",
  "》": ">",
  "《": "<",
  "’": "'",
  "‘": "'",
};

const _ChineseRevertCharMap = {
  ',': '，',
  '.': '。',
  '(': '（',
  ')': '）',
  ':': '：',
  '"': '”“',
  '{': '｛',
  '}': '｝',
  '[': '【',
  ']': '】',
  '>': '》',
  '<': '《',
  "'": '’‘',
};

class OutDifferentMaker {
  constructor(standardString, toCompareString) {
    const lineChar = '\n';
    this._standardString = standardString;
    this._toCompareString = toCompareString;
    console.log('4444', this._toCompareString);
    this._stnardLineArray = this._standardString && this._standardString.split(lineChar);
    this._compareLineArray = this._toCompareString && this._toCompareString.split(lineChar);
    this._compareResultMap = {};
  }

  getStringsDifferent() {
    let lineCompareString, lineStandardString, lineCompareResult, msg;
    console.log('55555', this._compareLineArray);
    for (let i = 0; i < this._stnardLineArray.length; i++) {
      lineCompareString = this._compareLineArray && this._compareLineArray[i];
      lineStandardString = this._stnardLineArray && this._stnardLineArray[i];
      if (lineCompareString === lineStandardString) {
        continue;
      }
      if (lineCompareString === undefined) {
        break;
      }
      lineCompareResult = this._compareLineString(lineStandardString, lineCompareString);
      this._compareResultMap[i + 1] = [];
      if (lineCompareResult !== null) {
        msg = new IntelligenceCreator(lineCompareResult).getIntelligenceMsg();
        this._compareResultMap[i + 1].push({
          index: lineCompareResult.lineCharIndex,
          msg: msg,
          msgType: 1,
        });
      } else {
        this._compareResultMap[i + 1].push({
          index: lineStandardString.length,
          msg: this._getExtraCharMsg(),
          msgType: -1,
        });
      }
    }
    if (this._hasLineError) {
      this._getLineErrorMsg();
    }
    console.log(this._compareResultMap);
    return this._compareResultMap;
  }

  _compareLineString(line1, line2) {
    for (let i = 0; i < line1.length; i++) {
      if (line1[i] !== line2[i]) {
        return {
          lineCharIndex: i,
          standardChar: line1[i],
          compareChar: line2[i],
        };
      }
    }
    return null;
  }

  get _hasLineError() {
    return (
      this._stnardLineArray &&
      this._stnardLineArray.length < this._compareLineArray &&
      this._compareLineArray.length
    );
  }

  _getLineErrorMsg() {
    const extraLength = this._compareLineArray.length - this._stnardLineArray.length;
    for (let i = 0; i < extraLength; i++) {
      this._compareResultMap[this._compareLineArray.length + i] = [
        {
          index: 0,
          msg: '多出行',
          msgType: 2,
        },
      ];
    }
  }

  _getExtraCharMsg() {
    return '字符串多出';
  }
}

class IntelligenceCreator {
  constructor(compareData) {
    this._compareData = compareData;
  }

  getIntelligenceMsg() {
    if (this._isChineseChar) {
      return this._getChineseCharMsg();
    } else if (this._isWhiteSpace) {
      return this._getWhiteSpaceMsg();
    } else {
      return this._getNormalMsg();
    }
  }

  _getChineseCharMsg() {
    return (
      '字符 ' + this._compareData.compareChar + ' 请修改为 ' + this._compareData.standardChar + ' '
    );
  }

  get _isChineseChar() {
    return (
      _ChineseCharMap[this._compareData.compareChar] === this._compareData.standardChar &&
      _ChineseRevertCharMap[this._compareData.standardChar].indexOf(
        this._compareData.compareChar
      ) !== -1
    );
  }

  get _isWhiteSpace() {
    return this._compareData.standardChar === ' ' || this._compareData.compareChar === ' ';
  }

  _getWhiteSpaceMsg() {
    const baseMsg = '了空格';
    if (this._compareData.standardChar === ' ') {
      return '缺少' + baseMsg;
    } else {
      return '多出' + baseMsg;
    }
  }

  _getNormalMsg() {
    return (
      '第 ' +
      (this._compareData.lineCharIndex + 1) +
      ' 个字符应该为: ' +
      this._compareData.standardChar
    );
  }
}

// const res = new OutDifferentMaker("ds's\nzxc", "ds‘a\nzxc").getStringsDifferent();  // 中英标点
// const res = new OutDifferentMaker("ds‘s\nzxc", "ds'a\nzxc").getStringsDifferent();  // 英中标点
// const res = new OutDifferentMaker("d s's\nzxc", "ds‘a\nzxc").getStringsDifferent();  // 空格缺失
// const res = new OutDifferentMaker("ds's\nzxc", "d s‘a\nzxc").getStringsDifferent();  // 多出空格
// const res = new OutDifferentMaker("ds's\nzxc", "d s‘a\nzxc\n\n").getStringsDifferent();  // 多出行
// const res = new OutDifferentMaker("das's\nzxc", "dds‘a\nzxc\n\n").getStringsDifferent();  // 字符不同
// const res = new OutDifferentMaker("dds", "dds ").getStringsDifferent();  // 行字符多出
// const res = new OutDifferentMaker("dds", "dd").getStringsDifferent(); // 行字符缺失
// const res = new OutDifferentMaker("dds", "dd").getStringsDifferent();
// const res = new OutDifferentMaker("ad's\nzxc", "ds‘a\nzxc").getStringsDifferent();
// console.log("res:" + res);

export default OutDifferentMaker;
