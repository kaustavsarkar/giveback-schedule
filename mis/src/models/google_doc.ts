export default interface GoogleDoc {
  documentId: string;
  title: string;
  body: Body;
}

export interface Body {
  content: Array<StructuralInterface>;
}

export interface StructuralInterface {
  startIndex: number;
  endIndex: number;
  paragraph: Paragraph;
}

export interface Paragraph {
  element: Array<ParagraphElement>;
  paragraphStyle: ParagraphStyle;
}

export interface ParagraphStyle {
  headingId: string;
  namedStyleType: NamedStyleType;
  alignment: Alignment;
  lineSpacing: number;
  direction: ContentDirection;
  spacingMode: SpacingMode;
  spaceAbove: Dimension;
  spaceBelow: Dimension;
}

export interface ParagraphElement {
  startIndex: number;
  endIndex: number;
  textRun: TextRun;
}

export interface TextRun {
  content: string;
  textStyle: TextStyle;
}

export interface TextStyle {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  fontSize: Dimension;
}

export interface Dimension {
  magnitude: number;
  unit: Unit;
}

type SpacingMode =
  | 'SPACING_MODE_UNSPECIFIED'
  | 'NEVER_COLLAPSE'
  | 'COLLAPSE_LISTS';

type ContentDirection =
  | 'CONTENT_DIRECTION_UNSPECIFIED'
  | 'LEFT_TO_RIGHT'
  | 'RIGHT_TO_LEFT';

type Alignment =
  | 'ALIGNMENT_UNSPECIFIED'
  | 'START'
  | 'CENTER'
  | 'END'
  | 'JUSTIFIED';

type NamedStyleType =
  | 'NAMED_STYLE_TYPE_UNSPECIFIED'
  | 'NORMAL_TEXT'
  | 'TITLE'
  | 'SUBTITLE'
  | 'HEADING_1'
  | 'HEADING_2'
  | 'HEADING_3'
  | 'HEADING_4'
  | 'HEADING_5'
  | 'HEADING_6';

type Unit = 'UNIT_UNSPECIFIED' | 'PT';
