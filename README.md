# BOCHA Lab 鼠鼠特派員

探索日常，發現知識。https://bochalab.com

專案說明與開發規範請看 [CLAUDE.md](CLAUDE.md)。

## 本機開發

```bash
npm install
npm run dev      # 開發預覽：http://localhost:3000
npm run build    # 產生靜態網站到 out/
```

## 部署

推送到 `main` 分支後，GitHub Actions（`.github/workflows/deploy.yml`）會自動 build 並部署到 GitHub Pages。
