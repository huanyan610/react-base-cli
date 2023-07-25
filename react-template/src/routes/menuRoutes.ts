export const staticMenuRoutes = [
  {
    path: '/dataAssets',
    name: '数据资产',
    childrenType: 'menu',
    hiddinMenu: true,
    children: [
      { path: '', name: '数据概览' },
      { path: '', name: '资产分布' },
      { path: '', name: '敏感数据' },
    ],
  },
];

export const projectMenuRoutes = [
  {
    path: '/publicOpinion',
    name: '舆情分析',
    childrenType: 'menu',
    hiddinMenu: false,
    children: [
      { path: '/publicOpinion/overview', name: '舆情总览' },
      { path: '/publicOpinion/emotional', name: '情感分析' },
      { path: '/publicOpinion/frequency', name: '词频分析' },
      { path: '/publicOpinion/providers', name: '三方舆情' },
      { path: '/publicOpinion/GSanalyse', name: 'GS分析' },
    ],
  },
];

export const roleMenuRoutes = [
  {
    path: '/hooksDemo',
    name: 'home',
    childrenType: 'menu',
    hiddinMenu: true,
  },
  { path: '/situation', name: '态势集成', childrenType: '', hiddinMenu: true },
  {
    path: '/dataAssets',
    name: '数据资产',
    childrenType: 'menu',
    hiddinMenu: true,
    children: [
      { path: '', name: '数据概览' },
      { path: '', name: '资产分布' },
      { path: '', name: '敏感数据' },
    ],
  },
];
