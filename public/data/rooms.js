// public/data/rooms.js

// 各部屋のデータをオブジェクトとして定義し、配列に格納します。
const roomsData = [
  // mapIndex: 0 - 学内施設 (現時点ではデータなし)
  // { id: 'roomGakunaishisetsu_1', mapIndex: 0, x: ?, y: ? },

  /* --- mapIndex: 1 - 本館 --- */
  // フロアピンのIDはそのままに、xとy座標を個々の部屋ピンの元々の座標に設定します。
  {
    id: 'honkan_7f_pin',
    mapIndex: 1, // 本館
    x: '34.50%', // (242 - 7) / 700 * 100 = 33.57%
    y: '31.70%', // (258 - 8) / 800 * 100 = 31.25%
    isFloorPin: true,
    floorName: '本館7階',
  },
  {
    id: 'honkan_6f_pin',
    mapIndex: 1, // 本館
    x: '34.50%', // (245 - 7) / 700 * 100 = 34.00%
    y: '47.90%', // (391 - 8) / 800 * 100 = 47.875%
    isFloorPin: true,
    floorName: '本館6階',
  },
  {
    id: 'honkan_5f_pin',
    mapIndex: 1, // 本館
    x: '34.50%', // (244 - 7) / 700 * 100 = 33.857%
    y: '67.00%', // (545 - 8) / 800 * 100 = 67.125%
    isFloorPin: true,
    floorName: '本館5階',
  },
  {
    id: 'honkan_b1_pin',
    mapIndex: 1, // 本館
    x: '33.80%', // (239 - 7) / 700 * 100 = 33.143%
    y: '84.70%', // (692 - 8) / 800 * 100 = 85.5%
    isFloorPin: true,
    floorName: '本館地下1階',
  },
  {
    id: 'honkan_4f_pin',
    mapIndex: 1, // 本館
    x: '65.80%', // (471 - 7) / 700 * 100 = 66.286%
    y: '31.40%', // (258 - 8) / 800 * 100 = 31.25%
    isFloorPin: true,
    floorName: '本館4階',
  },
  {
    id: 'honkan_3f_pin',
    mapIndex: 1, // 本館
    x: '65.80%', // (471 - 7) / 700 * 100 = 66.286%
    y: '47.80%', // (390 - 8) / 800 * 100 = 47.75%
    isFloorPin: true,
    floorName: '本館3階',
  },
  {
    id: 'honkan_2f_pin',
    mapIndex: 1, // 本館
    x: '65.80%', // (471 - 7) / 700 * 100 = 66.286%
    y: '69.50%', // (566 - 8) / 800 * 100 = 69.75%
    isFloorPin: true,
    floorName: '本館2階',
  },
  {
    id: 'honkan_1f_pin',
    mapIndex: 1, // 本館
    x: '65.80%', // (470 - 7) / 700 * 100 = 66.143%
    y: '84.60%', // (692 - 8) / 800 * 100 = 85.5%
    isFloorPin: true,
    floorName: '本館1階',
  },

  /* --- mapIndex: 2 - 中館・北館・西館 --- */
  {
    id: 'nakakan_3f_pin',
    mapIndex: 2, // 中館・北館・西館
    x: '32.20%', // (229 - 7) / 700 * 100 = 31.714%
    y: '39.40%', // (305 - 8) / 800 * 100 = 37.125%
    isFloorPin: true,
    floorName: '中館3階',
  },
  {
    id: 'nakakan_2f_pin',
    mapIndex: 2, // 中館・北館・西館
    x: '32.20%', // (231 - 7) / 700 * 100 = 32.00%
    y: '56.50%', // (446 - 8) / 800 * 100 = 54.75%
    isFloorPin: true,
    floorName: '中館2階',
  },
  {
    id: 'kitakan_3f_pin',
    mapIndex: 2, // 中館・北館・西館
    x: '51.80%', // (371 - 7) / 700 * 100 = 52.00%
    y: '38.90%', // (315 - 8) / 800 * 100 = 38.375%
    isFloorPin: true,
    floorName: '北館3階',
  },
  {
    id: 'kitakan_2f_pin',
    mapIndex: 2, // 中館・北館・西館
    x: '51.80%', // (372 - 7) / 700 * 100 = 52.143%
    y: '56.00%', // (459 - 8) / 800 * 100 = 56.375%
    isFloorPin: true,
    floorName: '北館2階',
  },
  {
    id: 'kitakan_1f_pin',
    mapIndex: 2, // 中館・北館・西館
    x: '50.90%', // (363 - 7) / 700 * 100 = 50.857%
    y: '75.50%', // (610 - 8) / 800 * 100 = 75.25%
    isFloorPin: true,
    floorName: '北館1階',
  },
  {
    id: 'nishikan_5f_pin',
    mapIndex: 2, // 中館・北館・西館
    x: '69.60%', // (500 - 7) / 700 * 100 = 70.429%
    y: '29.10%', // (240 - 8) / 800 * 100 = 29%
    isFloorPin: true,
    floorName: '西館5階',
  },
  {
    id: 'nishikan_4f_pin',
    mapIndex: 2, // 中館・北館・西館
    x: '69.60%', // (498 - 7) / 700 * 100 = 70.143%
    y: '40.00%', // (333 - 8) / 800 * 100 = 40.625%
    isFloorPin: true,
    floorName: '西館4階',
  },
  {
    id: 'nishikan_3f_pin',
    mapIndex: 2, // 中館・北館・西館
    x: '69.60%', // (499 - 7) / 700 * 100 = 70.286%
    y: '51.00%', // (422 - 8) / 800 * 100 = 51.75%
    isFloorPin: true,
    floorName: '西館3階',
  },
  {
    id: 'nishikan_1f_pin',
    mapIndex: 2, // 中館・北館・西館
    x: '69.60%', // (494 - 7) / 700 * 100 = 69.571%
    y: '73.00%', // (597 - 8) / 800 * 100 = 73.625%
    isFloorPin: true,
    floorName: '西館1階',
  },
  {
    id: 'nishikan_b1_pin',
    mapIndex: 2, // 中館・北館・西館
    x: '69.60%', // (499 - 7) / 700 * 100 = 70.286%
    y: '88.60%', // (721 - 8) / 800 * 100 = 89.125%
    isFloorPin: true,
    floorName: '西館地下1階',
  },

  /* --- mapIndex: 3 - 南館 --- */
  {
    id: 'minamikan_5f_pin',
    mapIndex: 3, // 南館
    x: '34.60%', // (244 - 7) / 700 * 100 = 33.857%
    y: '36.40%', // (298 - 8) / 800 * 100 = 36.25%
    isFloorPin: true,
    floorName: '南館5階',
  },
  {
    id: 'minamikan_4f_pin',
    mapIndex: 3,
    x: '33.60%', // (244 - 7) / 700 * 100 = 33.857%
    y: '56.20%', // (463 - 8) / 800 * 100 = 56.875%
    isFloorPin: true,
    floorName: '南館4階',
  },
  {
    id: 'minamikan_3f_pin',
    mapIndex: 3,
    x: '33.60%', // (244 - 7) / 700 * 100 = 33.857%
    y: '79.90%', // (658 - 8) / 800 * 100 = 81.25%
    isFloorPin: true,
    floorName: '南館3階',
  },
  {
    id: 'minamikan_2f_pin',
    mapIndex: 3,
    x: '66.30%', // (472 - 7) / 700 * 100 = 66.429%
    y: '35.00%', // (288 - 8) / 800 * 100 = 35%
    isFloorPin: true,
    floorName: '南館2階',
  },
  {
    id: 'minamikan_1f_pin',
    mapIndex: 3,
    x: '66.30%', // (472 - 7) / 700 * 100 = 66.429%
    y: '56.50%', // (460 - 8) / 800 * 100 = 56.5%
    isFloorPin: true,
    floorName: '南館1階',
  },
  {
    id: 'minamikan_b1_pin',
    mapIndex: 3,
    x: '66.30%', // (475 - 7) / 700 * 100 = 66.857%
    y: '79.50%', // (644 - 8) / 800 * 100 = 79.5%
    isFloorPin: true,
    floorName: '南館地下1階',
  },

  /* --- mapIndex: 4 - 東館・一宮館・MM館 --- */
  {
    id: 'higashikan_3f_pin',
    mapIndex: 4, // 東館・一宮館・MM館
    x: '34.50%', // (241 - 7) / 700 * 100 = 33.429%
    y: '60.60%', // (493 - 8) / 800 * 100 = 60.625%
    isFloorPin: true,
    floorName: '東館3階',
  },
  {
    id: 'higashikan_2f_pin',
    mapIndex: 4, // 東館・一宮館・MM館
    x: '33.50%', // (235 - 7) / 700 * 100 = 32.571%
    y: '85.50%', // (696 - 8) / 800 * 100 = 86%
    isFloorPin: true,
    floorName: '東館2階',
  },
  {
    id: 'ichinomiyakan_pin',
    mapIndex: 4, // 東館・一宮館・MM館
    x: '67.00%', // (475 - 7) / 700 * 100 = 66.857%
    y: '31.70%', // (261 - 8) / 800 * 100 = 31.625%
    isFloorPin: true,
    floorName: '一宮館',
  },
  {
    id: 'mmkan_1f_pin',
    mapIndex: 4, // 東館・一宮館・MM館
    x: '67.00%', // (481 - 7) / 700 * 100 = 67.714%
    y: '61.30%', // (501 - 8) / 800 * 100 = 61.625%
    isFloorPin: true,
    floorName: 'MM館1階',
  },
  {
    id: 'mmkan_b1_pin',
    mapIndex: 4, // 東館・一宮館・MM館
    x: '67.00%', // (481 - 7) / 700 * 100 = 67.714%
    y: '84.60%', // (691 - 8) / 800 * 100 = 85.375%
    isFloorPin: true,
    floorName: 'MM館地下1階',
  },

  /* --- mapIndex: 5 - 北野館 --- */
  {
    id: 'kitanokan_5f_pin',
    mapIndex: 5, // 北野館
    x: '38.40%', // (276 - 7) / 700 * 100 = 38.429%
    y: '31.60%', // (258 - 8) / 800 * 100 = 31.25%
    isFloorPin: true,
    floorName: '北野館5階',
  },
  {
    id: 'kitanokan_4f_pin',
    mapIndex: 5, // 北野館
    x: '38.40%', // (273 - 7) / 700 * 100 = 38.00%
    y: '45.00%', // (374 - 8) / 800 * 100 = 45.75%
    isFloorPin: true,
    floorName: '北野館4階',
  },
  {
    id: 'kitanokan_3f_pin',
    mapIndex: 5, // 北野館
    x: '38.40%', // (270 - 7) / 700 * 100 = 37.571%
    y: '61.50%', // (508 - 8) / 800 * 100 = 62.5%
    isFloorPin: true,
    floorName: '北野館3階',
  },
  {
    id: 'kitanokan_2f_pin',
    mapIndex: 5, // 北野館
    x: '38.40%', // (275 - 7) / 700 * 100 = 38.286%
    y: '78.30%', // (645 - 8) / 800 * 100 = 79.625%
    isFloorPin: true,
    floorName: '北野館2階',
  },
  {
    id: 'kitanokan_1f_pin',
    mapIndex: 5, // 北野館
    x: '73.00%', // (523 - 7) / 700 * 100 = 73.714%
    y: '43.00%', // (353 - 8) / 800 * 100 = 43.125%
    isFloorPin: true,
    floorName: '北野館1階',
  },
  {
    id: 'kitanokan_b1_pin',
    mapIndex: 5, // 北野館
    x: '74.00%', // (525 - 7) / 700 * 100 = 74.00%
    y: '59.30%', // (486 - 8) / 800 * 100 = 59.75%
    isFloorPin: true,
    floorName: '北野館地下1階',
  },
  {
    id: 'kitanokan_b2_pin',
    mapIndex: 5, // 北野館
    x: '74.50%', // (539 - 7) / 700 * 100 = 76.00%
    y: '76.50%', // (626 - 8) / 800 * 100 = 77.25%
    isFloorPin: true,
    floorName: '北野館地下2階',
  },

  /* --- mapIndex: 6 - 共創館 --- */
  {
    id: 'kyousoukan_6f_pin',
    mapIndex: 6, // 共創館
    x: '35.70%', // (253 - 7) / 700 * 100 = 35.143%
    y: '37.80%', // (311 - 8) / 800 * 100 = 37.875%
    isFloorPin: true,
    floorName: '共創館6階',
  },
  {
    id: 'kyousoukan_5f_pin',
    mapIndex: 6, // 共創館
    x: '35.70%', // (254 - 7) / 700 * 100 = 35.286%
    y: '59.70%', // (487 - 8) / 800 * 100 = 59.875%
    isFloorPin: true,
    floorName: '共創館5階',
  },
  {
    id: 'kyousoukan_4f_pin',
    mapIndex: 6, // 共創館
    x: '35.70%', // (255 - 7) / 700 * 100 = 35.429%
    y: '82.00%', // (672 - 8) / 800 * 100 = 83%
    isFloorPin: true,
    floorName: '共創館4階',
  },
  {
    id: 'kyousoukan_3f_pin',
    mapIndex: 6, // 共創館
    x: '66.40%', // (473 - 7) / 700 * 100 = 66.571%
    y: '37.80%', // (310 - 8) / 800 * 100 = 37.75%
    isFloorPin: true,
    floorName: '共創館3階',
  },
  {
    id: 'kyousoukan_2f_pin',
    mapIndex: 6, // 共創館
    x: '66.40%', // (472 - 7) / 700 * 100 = 66.429%
    y: '59.70%', // (490 - 8) / 800 * 100 = 60.25%
    isFloorPin: true,
    floorName: '共創館2階',
  },
  {
    id: 'kyousoukan_1f_pin',
    mapIndex: 6, // 共創館
    x: '66.40%', // (474 - 7) / 700 * 100 = 66.714%
    y: '79.00%', // (646 - 8) / 800 * 100 = 79.75%
    isFloorPin: true,
    floorName: '共創館1階',
  },
];

// このデータを他のファイルで使えるようにエクスポートします。
export default roomsData;