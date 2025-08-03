import http.server
import socketserver
import webbrowser
import os

PORT = 8081
os.chdir(r'c:\Users\207295\Downloads\Cognizant Neuro Transition Platform')

Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Enhanced Platform running at http://localhost:{PORT}")
    webbrowser.open(f'http://localhost:{PORT}/enhanced-app.html')
    httpd.serve_forever()