import Axios from '@/api/apiConfig/axios';
import { apiFragment } from '@/api/apiConfig/base';

/**
 * @description 获取上传密钥
 * @param {*} data
头像:user_portrait
海龟图片文件:user_turtle
3D gcode文件:user_3d
反馈:user_feedback
作品:user_works
创客:user_maker
素材:user_sucai
题目海龟图片:problem_turtle
${
  process.env.NODE_ENV === 'production'
  ? 'https://api.dingdangcode.com/'
  : 'https://api.dingdangcode.cn/'
}

 * @returns
 */

export const getGipher = async (key: any) => {
  console.log(apiFragment.ddcBase);
  try {
    return await Axios.request({
      url: `${apiFragment.ddcBase}/file/getGipher/${key}`,
      method: 'GET'
    });
  } catch (e) {
    throw e; // 抛出异常
  }
};
