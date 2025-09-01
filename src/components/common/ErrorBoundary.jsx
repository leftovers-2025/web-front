// components/common/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // 次のレンダリングでフォールバックUIを表示するために状態を更新
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // エラーログを記録
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReload = () => {
    // ページリロード
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-6">🚫</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              エラーが発生しました
            </h1>
            <p className="text-gray-600 mb-6">
              申し訳ありません。予期しないエラーが発生しました。
              <br />
              ページを再読み込みしてお試しください。
            </p>
            <div className="space-y-3">
              <button
                onClick={this.handleReload}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                ページを再読み込み
              </button>
              <button
                onClick={() => window.history.back()}
                className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                前のページに戻る
              </button>
            </div>
            
            {/* 開発環境でのエラー詳細 */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  エラー詳細 (開発環境のみ)
                </summary>
                <div className="mt-2 p-4 bg-gray-100 rounded text-xs font-mono overflow-auto max-h-40">
                  <p className="text-red-600 font-bold">
                    {this.state.error && this.state.error.toString()}
                  </p>
                  <pre className="mt-2 text-gray-600">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;