const floorRoomsData = {
  1: {
    '本館1階': [
      { id: 'honkan-1f-digital-anime-lab2', name: 'デジタルアニメラボ Ⅱ' },
      { id: 'honkan-1f-biz-field', name: 'ビジネス分野' },
    ],
    '本館2階': [
      { id: 'honkan-2f-intl-comm', name: '国際コミュニケーション学科' },
    ],
    '本館3階': [
      { id: 'honkan-3f-it-south', name: 'IT分野（南）' },
      { id: 'honkan-3f-it-north', name: 'IT分野（北）' },
    ],
    '本館4階': [
      { id: 'honkan-4f-arch-design', name: '建築インテリデザイン学科' },
    ],
    '本館5階': [
      { id: 'honkan-5f-intl-comm', name: '国際コミュニケーション学科' },
    ],
    '本館6階': [
      { id: 'honkan-6f-arch-design', name: '建築インテリデザイン学科' },
    ],
    '本館地下1階': [
      { id: 'honkan-b1f-perf-studio', name: 'パフォーマンススタジオ' },
    ],
    '本館7階': [
      { id: 'honkan-7f-arch-research', name: '建築1（総合研究科）' },
    ],
  },
  2: {
    '中館3階': [
      { id: 'chukan-3f-wc-female', name: '女 WC' },
    ],
    '中館2階': [
      { id: 'chukan-2f-wc-male', name: '男 WC' },
    ],
    '北館3階': [
      { id: 'kitakan-3f-id-lab2', name: 'IDラボ Ⅱ' },
      { id: 'kitakan-3f-wc-female', name: '女 WC' },
    ],
    '北館2階': [
      { id: 'kitakan-2f-hard-lab', name: 'ハードラボ' },
      { id: 'kitakan-2f-wc-male', name: '男 WC' },
    ],
    '北館1階': [
      { id: 'kitakan-1f-id-lab3', name: 'IDラボ Ⅲ' },
    ],
    '西館5階': [
      { id: 'nishikan-5f-arch-design', name: '建築インテリデザイン学科' },
    ],
    '西館4階': [
      { id: 'nishikan-4f-graphic-field', name: 'グラフィック分野' },
    ],
    '西館3階': [
      { id: 'nishikan-3f-digi-sound-lab2', name: 'デジタルサウンドラボ Ⅱ' },
    ],
    '西館1階': [
      { id: 'nishikan-1f-id-lab1', name: 'IDラボ Ⅰ' },
      { id: 'nishikan-1f-wc-male', name: '男 WC' },
      { id: 'nishikan-1f-wc-female', name: '女 WC' },
    ],
    '西館地下1階': [
      { id: 'nishikan-b1f-ma-room', name: 'MAルーム' },
    ],
  },
  3: {
    '南館1階': [
      { id: 'minamikan-1f-net-lab1', name: 'ネットワークラボ Ⅰ' },
      { id: 'minamikan-1f-net-lab2', name: 'ネットワークラボ Ⅱ' },
      { id: 'minamikan-1f-it-biz-course', name: 'ITビジネスコース' },
    ],
    '南館2階': [
      { id: 'minamikan-2f-game-a', name: 'ゲームソフト分野 A' },
      { id: 'minamikan-2f-game-b', name: 'ゲームソフト分野 B' },
      { id: 'minamikan-2f-game-c', name: 'ゲームソフト分野 C' },
      { id: 'minamikan-2f-game-d', name: 'ゲームソフト分野 D' },
      { id: 'minamikan-2f-game-e', name: 'ゲームソフト分野 E' },
    ],
    '南館3階': [
      { id: 'minamikan-3f-game-a', name: 'ゲームソフト分野 A' },
      { id: 'minamikan-3f-game-b', name: 'ゲームソフト分野 B' },
      { id: 'minamikan-3f-game-c', name: 'ゲームソフト分野 C' },
      { id: 'minamikan-3f-game-d', name: 'ゲームソフト分野 D' },
      { id: 'minamikan-3f-game-e', name: 'ゲームソフト分野 E' },
    ],
    '南館4階': [
      { id: 'minamikan-4f-it-a', name: 'IT分野 A' },
      { id: 'minamikan-4f-it-b', name: 'IT分野 B' },
      { id: 'minamikan-4f-it-c', name: 'IT分野 C' },
      { id: 'minamikan-4f-it-d', name: 'IT分野 D' },
      { id: 'minamikan-4f-it-e', name: 'IT分野 E' },
      { id: 'minamikan-4f-wc-male', name: '男 WC' },
    ],
    '南館5階': [
      { id: 'minamikan-5f-it-field', name: 'IT分野' },
      { id: 'minamikan-5f-game-field', name: 'ゲームソフト分野' },
      { id: 'minamikan-5f-indie-studio', name: 'INDIE STUDIO' },
      { id: 'minamikan-5f-wc-female', name: '女 WC' },
    ],
    '南館地下1階': [
      { id: 'minamikan-b1f-wc-male', name: '男 WC' },
      { id: 'minamikan-b1f-wc-female', name: '女 WC' },
    ],
  },
  4: {
    '東館2階': [
      { id: 'tohkan-2f-3dcg-lab4', name: '3DCGラボ Ⅳ' },
      { id: 'tohkan-2f-3dcg-lab3', name: '3DCGラボ Ⅲ' },
    ],
    '東館3階': [
      { id: 'tohkan-3f-3dcg-lab1', name: '3DCGラボ Ⅰ' },
      { id: 'tohkan-3f-3dcg-lab2', name: '3DCGラボ Ⅱ' },
    ],
    'MM館1階': [
      { id: 'mmkan-1f-foley-studio', name: 'フォーリースタジオ' },
      { id: 'mmkan-1f-video-edit', name: '映像編集室' },
    ],
    'MM館地下1階': [
      { id: 'mmkan-b1f-digi-sound-lab1', name: 'デジタルサウンドラボ Ⅰ' },
      { id: 'mmkan-b1f-multimedia-studio', name: 'マルチメディアスタジオ' },
      { id: 'mmkan-b1f-wc-male', name: '男 WC' },
      { id: 'mmkan-b1f-wc-female', name: '女 WC' },
    ],
    '一宮館': [
      { id: 'ichinomiya-career-center', name: 'キャリアセンター' },
    ],
  },
  5: {
    '北野館1階': [
      { id: 'kitanokan-1f-entrance-gallery', name: 'エントランスギャラリー' },
    ],
    '北野館2階': [
      { id: 'kitanokan-2f-graphics-lab1', name: 'グラフィックスラボ Ⅰ' },
      { id: 'kitanokan-2f-ecad-lab', name: 'ECADラボ' },
      { id: 'kitanokan-2f-multimedia-pc-lab', name: 'マルチメディアPCラボ' },
      { id: 'kitanokan-2f-wc-male', name: '男 WC' },
      { id: 'kitanokan-2f-wc-female', name: '女 WC' },
      { id: 'kitanokan-2f-wc-barrier-free', name: 'バリアフリー WC' },
    ],
    '北野館3階': [
      { id: 'kitanokan-3f-gaming-prog-lab1', name: 'ゲーミングプログラミングラボ Ⅰ' },
      { id: 'kitanokan-3f-gaming-prog-lab2', name: 'ゲーミングプログラミングラボ Ⅱ' },
      { id: 'kitanokan-3f-cad-lab1', name: 'CADラボ Ⅰ' },
    ],
    '北野館4階': [
      { id: 'kitanokan-4f-digital-anime-lab1', name: 'デジタルアニメラボ Ⅰ' },
      { id: 'kitanokan-4f-literacy-lab', name: 'リテラシーラボ' },
      { id: 'kitanokan-4f-collaboration-studio', name: 'コラボレーションスタジオ' },
    ],
    '北野館5階': [
      { id: 'kitanokan-5f-dome-hall', name: 'ドームホール' },
      { id: 'kitanokan-5f-terrace', name: 'テラス' },
      { id: 'kitanokan-5f-recording-ctrl-room', name: 'レコーディングスタジオコントロールルーム' },
      { id: 'kitanokan-5f-wc-male', name: '男 WC' },
      { id: 'kitanokan-5f-wc-female', name: '女 WC' },
    ],
    '北野館地下1階': [
      { id: 'kitanokan-b1f-sonic-hall', name: 'ソニックホール' },
      { id: 'kitanokan-b1f-foyer', name: 'ホワイエ' },
      { id: 'kitanokan-b1f-wc-male', name: '男 WC' },
      { id: 'kitanokan-b1f-wc-female', name: '女 WC' },
    ],
    '北野館地下2階': [
      { id: 'kitanokan-b2f-dressing-room', name: '楽屋' },
      { id: 'kitanokan-b2f-perf-studio1', name: 'パフォーマンススタジオ Ⅰ' },
    ],
  },
  6: {
    '共創館1階': [
      { id: 'kyosokan-1f-graphics-field', name: 'グラフィックス分野' },
      { id: 'kyosokan-1f-wc-barrier-free', name: 'バリアフリーWC' },
    ],
    '共創館2階': [
      { id: 'kyosokan-2f-graphics-lab2', name: 'グラフィックスラボ Ⅱ' },
      { id: 'kyosokan-2f-wc-male', name: '男 WC' },
    ],
    '共創館3階': [
      { id: 'kyosokan-3f-graphics-lab3', name: 'グラフィックスラボ Ⅲ' },
      { id: 'kyosokan-3f-wc-female', name: '女 WC' },
    ],
    '共創館4階': [
      { id: 'kyosokan-4f-game-esports-a', name: 'ゲームソフト分野（esports）' },
      { id: 'kyosokan-4f-wc-male', name: '男 WC' },
    ],
    '共創館5階': [
      { id: 'kyosokan-5f-game-esports-b', name: 'ゲームソフト分野（esports）' },
      { id: 'kyosokan-5f-wc-female', name: '女 WC' },
    ],
    '共創館6階': [
      { id: 'kyosokan-6f-graphics-lab4', name: 'グラフィックスラボ Ⅳ' },
      { id: 'kyosokan-6f-wc-male', name: '男 WC' },
    ],
  },
};

export default floorRoomsData;