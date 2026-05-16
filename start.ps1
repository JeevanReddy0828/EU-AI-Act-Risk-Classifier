# Start backend
Start-Process -FilePath "E:\projects\Company\backend\venv\Scripts\uvicorn.exe" `
  -ArgumentList "main:app", "--reload", "--port", "8000" `
  -WorkingDirectory "E:\projects\Company\backend" `
  -WindowStyle Normal

Start-Sleep -Seconds 2

# Start frontend
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd "E:\projects\Company\frontend"; npm run dev'

Write-Host "Backend: http://localhost:8000"
Write-Host "Frontend: http://localhost:5173"
