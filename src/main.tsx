import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// 在其他 import 下面添加
import { initCornerstone } from './cornerstone-setup';

// 在 render 之前执行
initCornerstone();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
