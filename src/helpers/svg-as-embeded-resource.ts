
export function svgAsEmbededResource(svgContent: string) {
    return 'data:image/svg+xml;charset=utf-8,' + svgContent.replace(/\"/g, "'")
}