import { CSSProperties } from 'react';

import { TFileldType } from '../../data';

export interface PBoxItemProps<T = any> {
  key: React.Key;
  originItem: T;
  level: number;
  sup: T;
  fieldsNames: TFileldType;

  // box-item
  isEmpty?: boolean;
  computeSize?: boolean;
  copyLable?: boolean;
  className?: string;
  style?: CSSProperties;
  itemHeight?: number;
  originItems: T[];
  selected: any[];
  disabled?: boolean;
  readyOnly?: boolean;
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
}
