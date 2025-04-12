export type HeaderMeta = {
  level: 1 | 2 | 3;
  spacing: 'small' | 'medium' | 'large';
};

export type ParagraphMeta = {
  spacing: 'small' | 'medium' | 'large';
};

export type QuoteMeta = {
  spacing: 'small' | 'medium' | 'large';
};

export type ImageMeta = {
  alignment: 'left' | 'center' | 'right';
  caption: string;

};

export type BlockMeta = HeaderMeta | ParagraphMeta | QuoteMeta | ImageMeta;
