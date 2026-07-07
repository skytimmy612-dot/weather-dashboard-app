"""本機開發用伺服器：停用瀏覽器快取，確保每次改動立即生效。"""

import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    server = HTTPServer(("127.0.0.1", port), NoCacheHandler)
    print(f"No-cache server running at http://127.0.0.1:{port}/")
    print("按 Ctrl+C 可停止")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n伺服器已停止")
        server.server_close()


if __name__ == "__main__":
    main()
