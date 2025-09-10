import React, { useState, useEffect } from "react";
import Spinner from "./spinner.jsx";
import "./spinner.css";

export default function Page() {
  const [loading, setLoading] = useState(true);

  //setLoading変更でローディング時間の調整ができる
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    //loadingとSpinnerが両方真の場合くるくる画面が表示される
    //{loading && <Spinner />}に変更で更新中のみローディング画面を表示することができる
    <>
      <Spinner />
      <main style={{ padding: "20px" }}>
        <h1>接続中...</h1>
      </main>
    </>
  );
}
