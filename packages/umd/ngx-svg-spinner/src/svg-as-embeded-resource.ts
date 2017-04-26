

export const DATA_SVG_XML_PREFIX = 'data:image/svg+xml;charset=utf-8';

export function svgAsEmbededResource(svgContent: string) {
    const encodedContent = encodeURIComponent(svgContent);
    return `${DATA_SVG_XML_PREFIX},${encodedContent}`;
}
