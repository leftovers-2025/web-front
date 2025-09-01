import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'サービス',
      links: [
        { name: '落し物一覧', href: '/lost-items' },
        // { name: '見つけ物', href: '/found-items' },
        // { name: '使い方', href: '/help' },
      ]
    },
    {
      title: 'サポート',
      links: [
        // { name: 'よくある質問', href: '/faq' },
        // { name: 'お問い合わせ', href: '/contact' },
        // { name: 'プライバシーポリシー', href: '/privacy' },
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* サイト情報 */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">📋</span>
              </div>
              <span className="text-xl font-bold">落し物掲示板</span>
            </div>
            <p className="text-gray-400 mb-4">
              落とし物と見つけ物をつなぐプラットフォーム。
              大切な物を見つけるお手伝いをします。
            </p>
            <div className="flex space-x-4">
              {/* SNSリンク（将来実装予定） */}
              {/* <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                📘
              </a> */}
            </div>
          </div>

          {/* フッターリンク */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 区切り線 */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} 落し物掲示板. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400 text-sm">
                大切な物を見つけるために
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;