# 自托管字体

Anton、Oswald 与 Roboto Mono 为既有英文字体，各自许可见同目录 OFL 文件。

`noto-sans-sc-subset.woff2` 来自 Google Fonts 的 Noto Sans SC（400–900 可变字重，SIL OFL），本地提供约 183 KiB 的字符子集。页面运行与构建不访问 Google 字体服务。

`noto-sans-sc-characters.txt` 记录此次字形集合，覆盖 `content/`、`features/`、`components/` 与 `messages/` 中现有中文文案和中文提示词。新增中文内容时应同步扩充子集，并保留既有字符；没有覆盖的字符由系统中文字体回退，不会显示空白。

更新方式：收集这些目录中 U+3000–303F、U+4E00–9FFF、U+FF00–FFEF 范围的唯一字符，加上“简体中文”，作为 Google Fonts CSS2 请求的 `text` 参数；字体族为 `Noto Sans SC:wght@400..900`，使用支持 WOFF2 的浏览器 User-Agent。加载中、打开预览、复制成功等短暂状态也必须纳入字符清单。

将返回 CSS 中的 WOFF2 下载到同目录临时文件，先确认文件非空、能够作为 WOFF2 解析，并检查所需字符均已覆盖；通过后再用同一文件系统内的原子重命名替换 `noto-sans-sc-subset.woff2`，同步保存字符清单并保留 OFL 许可。不要直接向正在被开发服务器读取的字体文件写入下载流，也不要把远程样式表接入页面。2026-10-28 序列效果入库后的核对记录为 665 个请求字符、186972 字节，已通过 Next.js 内置 fontkit 验证全部字符均被覆盖，并保留调整前的全部字形；完整清单见 `noto-sans-sc-characters.txt`。

官方来源：[Google Fonts Noto Sans SC](https://github.com/google/fonts/tree/main/ofl/notosanssc)。
