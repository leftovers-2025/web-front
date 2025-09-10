import React from "react";

// すでに作ってある Header(components→common→pages内で各ユーザ内で管理) を import
import AdminHeader from "../../pages/admin/header/header.jsx";
import TeacherHeader from "../../pages/teacher/header/header.jsx";
import UserHeader from "../../pages/user/header/header.jsx";

// props か Context で "role" を渡す
export default function Header({ role }) {
  switch (role) {
    case "admin":
      return <AdminHeader />;
    case "teacher":
      return <TeacherHeader />;
    case "user":
    default:
      return <UserHeader />;
  }
}
