# nafell's blog

## favicon .svg to .ico procedure

bash$
`convert -background transparent "./public/nafell.dev-icon.svg" -define icon:auto-resize=16,24,32,48,64,72,96,128,256 "./app/favicon.ico"`
