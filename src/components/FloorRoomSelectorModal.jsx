import React from 'react';
import './FloorRoomSelectorModal.css';

function FloorRoomSelectorModal({ buildingName, floorRooms, onClose, onSelectRoom }) {
  // floorRooms オブジェクトは、常に1つのフロアの情報（例: { '1階': [...] }）を持つと期待される
  const [floorName, rooms] = Object.entries(floorRooms)[0] || [null, []];

  // データが正しく渡されなかった場合は何も表示しない
  if (!floorName || rooms.length === 0) {
    return null;
  }

  return (
    // ★修正点1: modal-overlay から onClick={onClose} を削除します★
    <div className="modal-overlay"> 
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* ★修正点2: <h2> タグの表示を floorName のみに変更します★ */}
        <h2>{floorName}</h2>
        <button className="modal-close-button" onClick={onClose}>×</button>
        <div className="floor-list-container">
          <div key={floorName} className="floor-section">
            {/* ★修正点3: <h3> タグを削除します (<h2>と重複するため) ★ */}
            {/* <h3>{floorName}</h3> */}
            <ul className="room-list">
              {rooms.map((room) => (
                <li key={room.id}>
                  <button
                    onClick={() => onSelectRoom(room.id)}
                    className={`room-button ${room.hasLostItem ? 'has-lost-item' : ''}`}
                    // 落とし物がない部屋のボタンを無効にする場合は disabled={!room.hasLostItem} を追加できます
                    // disabled={!room.hasLostItem}
                  >
                    {/* ★修正点4: 落とし物の有無による表示を統一します★ */}
                    {room.name}{room.hasLostItem ? ' （落とし物あり）' : ' （落とし物なし）'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FloorRoomSelectorModal;