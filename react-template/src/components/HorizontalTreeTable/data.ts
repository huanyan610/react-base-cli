// 获取下级
export type TFileldType = {
  label?: string;
  value?: string;
  status?: string;
  children?: string;
};

export const defaultSetting = {
  hiddenFooter: false,
  contentAlign: 'center',
  switch: false,
};

export const defaultFieldNames: TFileldType = {
  label: 'title',
  value: 'id',
  status: 'status',
  children: 'children',
};

export const joinUid = (uids: any[]) => `${uids[0]}${uids[1]}`;
export const spliteUid = (uid: string, dropEnd = false) => {
  const uids = uid.split('');
  if (dropEnd) {
    uids.pop();
    return uids;
  }
  return uids;
};
