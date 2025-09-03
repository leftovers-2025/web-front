import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MapSwitcher.css';
import roomsData from '../public/data/rooms.js';
import mockLostItemsData from './data/mockLostItemsData.js';
import FloorRoomSelectorModal from './components/FloorRoomSelectorModal.jsx';
import floorRoomsData from './data/floorRooms.js';

function MapSwitcher() {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentMapIndex, setCurrentMapIndex] = useState(() => {
    return location.state?.initialMapIndex !== undefined ? location.state.initialMapIndex : 0;
  });

  const [clickedCoords, setClickedCoords] = useState({ x: null, y: null });
  const [clickedCoordsPercentage, setClickedCoordsPercentage] = useState({ x: null, y: null });

  const [showRoomSelectionModal, setShowRoomSelectionModal] = useState(false);
  const [selectedBuildingMapIndex, setSelectedBuildingMapIndex] = useState(null);
  const [selectedBuildingName, setSelectedBuildingName] = useState('');
  const [selectedFloorName, setSelectedFloorName] = useState('');

  useEffect(() => {
    if (location.state?.initialMapIndex !== undefined) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const mapImageWrapperRef = useRef(null);
  const mapImageRef = useRef(null);

  const mapFiles = [
    '/maps/map_01.svg', // 学内施設
    '/maps/map_02.svg', // 本館
    '/maps/map_03.svg', // 中館・北館・西館
    '/maps/map_04.svg', // 南館
    '/maps/map_05.svg', // 東館・一宮館・MM館
    '/maps/map_06.svg', // 北野館
    '/maps/map_07.svg', // 共創館
  ];

  const mapNames = [
    '学内施設', '本館', '中館・北館・西館', '南館',
    '東館・一宮館・MM館', '北野館', '共創館',
  ];

  // pinsToDisplay のロジックを変更
  const pinsToDisplay = roomsData
    .filter(room => room.mapIndex === currentMapIndex)
    .map(room => {
      let hasLostItems = false;
      let pinDisplayText = '';

      if (room.isFloorPin) {
        // フロアピンの場合
        // そのフロアに属する部屋 (floorRoomsData) のいずれかに落とし物があるかを確認
        // ただし、mapIndex 0 (学内施設) はこのロジックから除外
        if (room.mapIndex >= 1 && room.mapIndex <= 6) {
          const roomsOnThisFloor = floorRoomsData[room.mapIndex]?.[room.floorName] || [];
          hasLostItems = roomsOnThisFloor.some(floorRoom =>
            mockLostItemsData.some(lostItem => lostItem.roomId === floorRoom.id)
          );
        }
        pinDisplayText = room.floorName;
      } else {
        // 部屋ピンの場合
        // その部屋自体に落とし物があるかを確認
        hasLostItems = mockLostItemsData.some(lostItem => lostItem.roomId === room.id);
        pinDisplayText = room.name || room.id;
      }
      return { ...room, hasLostItems, pinDisplayText };
    })
    .filter(room => {
      // ピンを実際に表示するかどうかのフィルタリング
      // 落とし物があるピンのみ表示する
      return room.hasLostItems;
    });

  const scrollToMap = () => {
    if (mapImageWrapperRef.current) {
      mapImageWrapperRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const goToMap = (index) => {
    setCurrentMapIndex(index);
    setClickedCoords({ x: null, y: null });
    setClickedCoordsPercentage({ x: null, y: null });
    // 地図切り替え時にモーダルは閉じる
    setShowRoomSelectionModal(false); 
    setSelectedFloorName('');
    scrollToMap();
  };

  const showNextMap = () => {
    setCurrentMapIndex((prevIndex) => (prevIndex + 1) % mapFiles.length);
    setClickedCoords({ x: null, y: null });
    setClickedCoordsPercentage({ x: null, y: null });
    // 地図切り替え時にモーダルは閉じる
    setShowRoomSelectionModal(false); 
    setSelectedFloorName('');
    scrollToMap();
  };

  const showPreviousMap = () => {
    setCurrentMapIndex((prevIndex) =>
      (prevIndex - 1 + mapFiles.length) % mapFiles.length
    );
    setClickedCoords({ x: null, y: null });
    setClickedCoordsPercentage({ x: null, y: null });
    // 地図切り替え時にモーダルは閉じる
    setShowRoomSelectionModal(false); 
    setSelectedFloorName('');
    scrollToMap();
  };

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    setClickedCoords({ x: Math.round(clickX), y: Math.round(clickY) });

    if (mapImageRef.current) {
      const imageWidth = mapImageRef.current.clientWidth;
      const imageHeight = mapImageRef.current.clientHeight;

      const percentageX = (clickX / imageWidth) * 100;
      const percentageY = (clickY / imageHeight) * 100;

      setClickedCoordsPercentage({
        x: percentageX.toFixed(2),
        y: percentageY.toFixed(2)
      });
    }
  };

  const handlePinClick = useCallback((room, e) => {
    e.stopPropagation();

    if (room.isFloorPin) {
      // フロアピンがクリックされた場合、そのフロアに落とし物があるならモーダルを表示
      if (room.hasLostItems) {
        setSelectedBuildingMapIndex(room.mapIndex);
        setSelectedBuildingName(mapNames[room.mapIndex]);
        setSelectedFloorName(room.floorName);
        setShowRoomSelectionModal(true);
        console.log(`フロアピン '${room.floorName}' がクリックされました。モーダルを表示します。`);
      } else {
        // 落とし物がなければモーダルは表示しない (ただし、このロジックに到達するピンはhasLostItemsがtrueなので通常はここには来ない)
        console.log(`フロアピン '${room.floorName}' には落とし物がありません。モーダルは表示されません。`);
      }
    } else {
      // 部屋ピンがクリックされた場合、直接詳細ページへ遷移 (表示されている部屋ピンはhasLostItemsがtrueなので遷移可能)
      navigate(`/lost-item/${room.id}`, { state: { prevMapIndex: currentMapIndex } });
      console.log(`部屋ピン '${room.pinDisplayText}' がクリックされました。詳細ページへ遷移します。`);
    }
  }, [currentMapIndex, navigate, mapNames]);

  const handleSelectRoomFromModal = useCallback((roomId) => {
    // モーダルから選択された部屋に落とし物があるか確認
    const hasLostItemsInSelectedRoom = mockLostItemsData.some(item => item.roomId === roomId);

    if (hasLostItemsInSelectedRoom) {
      // 落とし物がある場合は画面遷移し、モーダルを閉じる
      setShowRoomSelectionModal(false);
      navigate(`/lost-item/${roomId}`, { state: { prevMapIndex: currentMapIndex } });
      console.log(`モーダルから部屋 '${roomId}' が選択されました。落とし物があるため遷移します。`);
    } else {
      // 落とし物がない場合は、モーダルを閉じず、画面遷移もしない
      console.log(`モーダル内の部屋 '${roomId}' には落とし物がありません。遷移しません。`);
    }
  }, [currentMapIndex, navigate]);

  return (
    <div className="map-switcher-container">
      <div className="map-display-area">
        <h1>落とし物マップ</h1>

        <div className="map-image-wrapper" ref={mapImageWrapperRef}>
          <img
            src={mapFiles[currentMapIndex]}
            alt={`地図 ${mapNames[currentMapIndex]}`}
            style={{ maxWidth: '80%', height: 'auto', border: '1px solid #ccc' }}
            onClick={handleMapClick}
            className="clickable-map-image"
            ref={mapImageRef}
          />

          {pinsToDisplay.map((room) => (
            <div
              key={room.id}
              // pinsToDisplayはhasLostItemsがtrueのものしか含まれないため、常に'has-items'
              className="map-pin has-items"
              style={{ left: room.x, top: room.y }}
              onClick={(e) => handlePinClick(room, e)}
              // ホバー時のツールチップ表示
              title={
                room.isFloorPin
                  ? `${room.pinDisplayText} (落とし物あり)`
                  : `落とし物あり: ${room.pinDisplayText}`
              }
            >
              <span>！</span>
            </div>
          ))}
        </div>

        {clickedCoords.x !== null && clickedCoords.y !== null && (
          <p className="clicked-coords-display">
            クリック座標: **X: {clickedCoords.x}px**, **Y: {clickedCoords.y}px**
            {clickedCoordsPercentage.x !== null && clickedCoordsPercentage.y !== null && (
              <span>{` (**X: ${clickedCoordsPercentage.x}%, Y: ${clickedCoordsPercentage.y}%)**`}</span>
            )}
          </p>
        )}

        <div className="navigation-buttons">
          <button onClick={showPreviousMap}>前の地図</button>
          <button onClick={showNextMap}>次の地図</button>
        </div>

        <p>現在表示中の地図: {currentMapIndex + 1} / {mapFiles.length}</p>
      </div>

      <div className="map-direct-links">
        <h2>地図を選択</h2>
        {mapNames.map((name, index) => (
          <button
            key={index}
            onClick={() => goToMap(index)}
            className={currentMapIndex === index ? 'active' : ''}
          >
            {name}
          </button>
        ))}
      </div>

      {showRoomSelectionModal && selectedBuildingMapIndex !== null && selectedFloorName && (
        <FloorRoomSelectorModal
          buildingName={selectedBuildingName}
          floorRooms={{
            [selectedFloorName]: (floorRoomsData[selectedBuildingMapIndex]?.[selectedFloorName] || [])
              .map(room => {
                  const hasLostItem = mockLostItemsData.some(lostItem => lostItem.roomId === room.id);
                  return {
                      ...room,
                      hasLostItem: hasLostItem,
                      // name: hasLostItem ? room.name : `${room.name} (落とし物なし)` // この行を削除
                  };
              })
          }}
          onClose={() => setShowRoomSelectionModal(false)}
          onSelectRoom={handleSelectRoomFromModal}
        />
      )}
    </div>
  );
}

export default MapSwitcher;