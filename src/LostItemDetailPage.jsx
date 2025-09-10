// src/LostItemDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './LostItemDetailPage.css';

// 修正：roomsData を削除し、floorRooms.js をインポート
import floorRooms from './data/floorRooms.js'; 
import mockLostItemsData from './data/mockLostItemsData.js';

function LostItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [lostItemsInRoom, setLostItemsInRoom] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [loading, setLoading] = useState(true);

  const prevMapIndex = location.state?.prevMapIndex;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const foundItems = mockLostItemsData.filter(item => item.roomId === id);

      // floorRooms からすべての部屋を平坦化して検索
      const allRooms = Object.values(floorRooms).flatMap(building =>
        Object.values(building).flatMap(floor => floor)
      );
      const roomInfo = allRooms.find(room => room.id === id);

      if (foundItems.length > 0) {
        setRoomName(roomInfo ? roomInfo.name : '不明な場所');
        setLostItemsInRoom(foundItems);
      } else {
        setRoomName('');
        setLostItemsInRoom([]);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleBackToMap = () => {
    navigate('/', { state: { initialMapIndex: prevMapIndex } });
  };

  if (loading) {
    return <div className="lost-item-detail-container">読み込み中...</div>;
  }

  if (lostItemsInRoom.length === 0) {
    return (
      <div className="lost-item-detail-container no-data">
        <h2>落とし物の情報が見つかりませんでした。</h2>
        <button onClick={handleBackToMap} className="back-button">
          ← マップに戻る
        </button>
      </div>
    );
  }

  return (
    <div className="lost-item-detail-container">
      <button onClick={handleBackToMap} className="back-button">
        ← マップに戻る
      </button>
      <h1>{roomName} の落とし物</h1>

      {lostItemsInRoom.map((item) => (
        <div key={item.itemId} className="lost-item-card">
          <h2>{item.itemName}</h2>
          <p><strong>特徴:</strong> {item.description}</p>
          <p><strong>発見日:</strong> {new Date(item.foundDate).toLocaleDateString()}</p>

          {item.images && item.images.length > 0 && (
            <div className="lost-item-images">
              <h3>写真</h3>
              {item.images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`落とし物写真 ${index + 1}`}
                  className="lost-item-image"
                />
              ))}
            </div>
          )}
          <button className="contact-button">担当者に連絡する</button>
        </div>
      ))}
    </div>
  );
}

export default LostItemDetailPage;