"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface UserInfo {
  id: number;
  email: string;
  username: string;
  phone: string;
}

export default function MyPageMain() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/signin");
          return;
        }
        throw new Error("사용자 정보를 불러올 수 없습니다.");
      }

      const data = await response.json();
      setUserInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const handleEditProfile = () => {
    router.push("/mypage/edit");
  };

  const handleMyPosts = () => {
    router.push("/mypage/posts");
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeletePassword("");
    setError("");
  };

  const handleDeleteConfirm = async () => {
    if (!deletePassword.trim()) {
      setError("현재 비밀번호를 입력해주세요.");
      return;
    }

    setDeleteLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ currentPassword: deletePassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "회원 탈퇴에 실패했습니다.");
      }

      alert("회원 탈퇴가 완료되었습니다.");
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">마이페이지</h1>

        {userInfo && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">내 정보</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">이메일</label>
                  <p className="text-gray-800">{userInfo.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">이름</label>
                  <p className="text-gray-800">{userInfo.username}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">전화번호</label>
                  <p className="text-gray-800">{userInfo.phone}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={handleEditProfile}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            회원정보 수정
          </button>

          <button
            onClick={handleMyPosts}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-200"
          >
            내가 작성한 글
          </button>

          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-200"
          >
            회원 탈퇴
          </button>
        </div>

        {/* 회원 탈퇴 확인 모달 */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-6 text-center text-red-600">회원 탈퇴 확인</h2>

              <div className="mb-6">
                <p className="text-gray-700 mb-4 text-center">
                  정말로 회원 탈퇴하시겠습니까?
                  <br />
                  <strong className="text-red-600">이 작업은 되돌릴 수 없습니다.</strong>
                </p>

                <div className="mb-4">
                  <label htmlFor="deletePassword" className="block text-sm font-medium text-gray-700 mb-2">
                    현재 비밀번호를 입력해주세요
                  </label>
                  <input
                    id="deletePassword"
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="현재 비밀번호"
                    disabled={deleteLoading}
                  />
                </div>

                {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded mb-4">{error}</div>}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleDeleteCancel}
                  disabled={deleteLoading}
                  className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                >
                  취소
                </button>

                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleteLoading || !deletePassword.trim()}
                  className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                >
                  {deleteLoading ? "탈퇴 중..." : "탈퇴하기"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
