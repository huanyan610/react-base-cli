import { CSSProperties, Key } from 'react';

type BaseTreeTableProps = {
  readyOnly?: boolean;
  fieldNames?: { label?: string; value?: string; children?: string; status?: string };
  selected?: Key[];
  onChangeCheckbox?: (
    diffKey: Key[],
    args: {
      event: CheckboxChangeEvent;
      auth: any;
      level: number;
      sup: any | undefined;
      sub: any[] | undefined;
    }
  ) => void;
  refersh?: number;
  onDiff?: (diffKey: Key[]) => void;
};

export interface PHorizontalTreeTableProps extends BaseTreeTableProps {
  disabled?: boolean;
  header?: DHeaderColumn[];
  items?: any[];
  maxLevel?: number;
  minBoxWidth?: number | string;
  mode?: 'ago' | 'v260';
}

export type PRowNodeMap = {
  [key: Key]: {
    [key: string]: {
      className: string;
      nodeChildren: React.ReactNode[];
      sup?: PRowItem;
      level: number;
    } & PRowItem;
  };
};

export type PRowItem = {
  id: number;
  title: string;
  status: number;
  children?: PRowPropsItem[];
};

export interface PRowProps extends BaseTreeTableProps {
  key?: Key;
  rowItem: PRowPropsItem;
}

export type DNodeColumn = {
  orignItem: any;
  key: Key;
  className: string;
  sup: any | undefined;
  sub: any[] | undefined;
  level: number;
  nodeChildren: React.ReactNode;
  header?: DHeaderColumn;
  style?: CSSProperties;
};

export type DNodeRow = {
  [key in DHeaderColumn['key']]: DNodeColumn;
};

export type DHeaderColumn = {
  key: React.Key;
  title: React.ReactNode;
  direction?: 'row' | 'column';
  render?: (
    nodeChildren: React.ReactNode[],
    item: any,
    row: React.ReactNode[][],
    index: number
  ) => React.ReactNode;
  style?: CSSProperties;
  className?: string;
  columnClassName?: string;
};
export interface PHeaderProps {
  columns?: DHeaderColumn[];
  maxLevel?: number;
}
