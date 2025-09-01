export const mockLostItems = [
  {
    id: "item-001",
    title: "黒い財布",
    imgurl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
    投稿者: "山田太郎",
    発見日時: "2025-08-30T14:30:00Z",
    タグ名: ["財布", "黒", "レザー", "長財布", "カードケース"]
  },
  {
    id: "item-002", 
    title: "iPhone 15 Pro",
    imgurl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
    投稿者: "佐藤花子",
    発見日時: "2025-08-29T10:15:00Z",
    タグ名: ["iPhone", "スマートフォン",  "黒"]
  },
  {
    id: "item-003",
    title: "赤いマフラー",
    imgurl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=200&fit=crop",
    投稿者: "田中一郎",
    発見日時: "2025-08-28T16:45:00Z",
    タグ名: ["マフラー", "赤", "ウール"]
  },
  {
    id: "item-004",
    title: "学生証",
    imgurl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop",
    投稿者: "鈴木次郎",
    発見日時: "2025-08-27T13:20:00Z",
    タグ名: ["学生証", "身分証明書", "カード"]
  },
  {
    id: "item-005",
    title: "青い傘",
    imgurl: "https://images.unsplash.com/photo-1558618047-bb37f6d7e243?w=300&h=200&fit=crop",
    投稿者: "高橋美咲",
    発見日時: "2025-08-26T18:30:00Z",
    タグ名: ["傘", "青", "折り畳み"]
  },
  {
    id: "item-006",
    title: "眼鏡（黒縁）",
    imgurl: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300&h=200&fit=crop",
    投稿者: "伊藤健太",
    発見日時: "2025-08-25T11:00:00Z",
    タグ名: ["眼鏡", "黒縁", "メガネ", "アクセサリー"]
  },
  {
    id: "item-007",
    title: "キーホルダー付きの鍵",
    imgurl: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=300&h=200&fit=crop",
    投稿者: "渡辺さくら",
    発見日時: "2025-08-24T08:45:00Z",
    タグ名: ["鍵", "キーホルダー", "家の鍵"]
  },
  {
    id: "item-008",
    title: "ピンクの手帳",
    imgurl: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=300&h=200&fit=crop",
    投稿者: "加藤雄介",
    発見日時: "2025-08-23T15:10:00Z",
    タグ名: ["手帳", "ピンク"]
  },
  {
    id: "item-009",
    title: "白いイヤホン",
    imgurl: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=300&h=200&fit=crop",
    投稿者: "小林麻衣",
    発見日時: "2025-08-22T12:30:00Z",
    タグ名: ["イヤホン", "白", "AirPods"]
  },
  {
    id: "item-010",
    title: "茶色のバッグ",
    imgurl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
    投稿者: "森田直樹",
    発見日時: "2025-08-21T17:20:00Z",
    タグ名: ["バッグ", "茶色", "レザー"]
  },
  {
    id: "item-011",
    title: "帽子",
    imgurl: "https://images.unsplash.com/photo-1521336575822-6da63fb45455?w=300&h=200&fit=crop",
    投稿者: "吉田智子",
    発見日時: "2025-08-20T14:00:00Z",
    タグ名: ["帽子", "赤"]
  },
  {
    id: "item-012",
    title: "腕時計（シルバー）",
    imgurl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=200&fit=crop",
    投稿者: "中村正人",
    発見日時: "2025-08-19T09:15:00Z",
    タグ名: ["腕時計", "シルバー", "時計", "アクセサリー", "メンズ"]
  }
];

// データ検索・フィルタリング用のユーティリティ関数
export const filterMockData = (items = mockLostItems, params = {}) => {
  let filteredItems = [...items];

  // 検索キーワードでフィルタリング
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredItems = filteredItems.filter(item =>
      item.title.toLowerCase().includes(searchLower) ||
      item.タグ名.some(tag => tag.toLowerCase().includes(searchLower)) ||
      item.投稿者.toLowerCase().includes(searchLower)
    );
  }

  // タグ名でフィルタリング（カテゴリとして使用）
  if (params.category) {
    filteredItems = filteredItems.filter(item =>
      item.タグ名.some(tag => tag.includes(params.category))
    );
  }

  // 日付でソート（新しい順）
  filteredItems.sort((a, b) => new Date(b.発見日時) - new Date(a.発見日時));

  return filteredItems;
};