## Getting Started

- dev 명령어 : bunx tauri dev
- build 명령어 : bunx tauri build
- 업데이트 명령어: bun update @tauri-apps/cli @tauri-apps/api

## Trouble Shooting

- `bunx tauri dev` 실행 시 Cannot find module '@tauri-apps/cli-darwin-x64' 에러
 노드 버전을 20.14.0 에서 18.17.0 다운그레이드 하니깐 성공적으로 빌드됨.

## Spec

- packageManager: bun
- UI: nextjs(appRouter), tailwind
- native: tauri
- lang: typescript, rust