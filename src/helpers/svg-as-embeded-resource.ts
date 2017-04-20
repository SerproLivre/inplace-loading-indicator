
export function svgAsEmbededResource(svgContent: string) {
    return svgContent.replace(/\"/g, '\'');
}
