import { Platform, StatusBar } from "react-native";
import { Dimensions } from "react-native";

export const STATUSBAR_HEIGHT = Platform.OS === "android" ? StatusBar.currentHeight : 0;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const TEST_SCREEN_WIDTH = 1440;
export const TEST_SCREEN_HEIGHT = 3120;
export const WIDTH_SCALL = SCREEN_WIDTH / TEST_SCREEN_WIDTH;
export const HEIGHT_SCALL = SCREEN_HEIGHT / TEST_SCREEN_HEIGHT;

// export const BACKGROUND_GRADIENT_COLOR = ['rgba(98, 126, 197, 1)', 'rgba(64, 39, 117, 1)', 'rgba(81, 0, 83, 1)'];
export const BACKGROUND_GRADIENT_COLOR = ['rgba(64, 39, 117, 1)', 'rgba(64, 39, 117, 1)', 'rgba(64, 39, 117, 1)'];
// export const BACKGROUND_GRADIENT_COLOR = ['rgba(81, 0, 83, 1)', 'rgba(81, 0, 83, 1)', 'rgba(81, 0, 83, 1)'];

export const BOTTOM_TAPBAR_HEIGHT = 65;
export const HOMETOP_TAPBAR_HEIGHT = STATUSBAR_HEIGHT ? STATUSBAR_HEIGHT + 50 : 50;
export const SEARCHTOP_TAPBAR_HEIGHT = STATUSBAR_HEIGHT ? STATUSBAR_HEIGHT + 115 : 115;
export const SEARCHDETAILTOP_TAPBAR_HEIGHT = STATUSBAR_HEIGHT ? STATUSBAR_HEIGHT + 85 : 85;
export const DETAILTOP_TAPBAR_HEIGHT = STATUSBAR_HEIGHT ? STATUSBAR_HEIGHT + 75 : 75;
export const MESSAGELISTTOP_TAPBAR_HEIGHT = STATUSBAR_HEIGHT ? STATUSBAR_HEIGHT + 73 : 73;
export const MESSAGETOP_TAPBAR_HEIGHT = STATUSBAR_HEIGHT ? STATUSBAR_HEIGHT + 85 : 85;

export const ICON_HOME = require('@/assets/images/icons/home.png');
export const ICON_SEARCH = require('@/assets/images/icons/search.png');
export const ICON_POST = require('@/assets/images/icons/post.png');
export const ICON_MESSEAGE = require('@/assets/images/icons/message.png');
export const ICON_PROFILE = require('@/assets/images/icons/profile.png');
export const ICON_ADD = require('@/assets/images/icons/add.png');
export const ICON_HEART = require('@/assets/images/icons/heart.png');
export const ICON_HEARTFILL = require('@/assets/images/icons/heartfill.png');
export const ICON_HEARTGRAD = require('@/assets/images/icons/heartgrad.png');
export const ICON_COMMENT = require('@/assets/images/icons/comment.png');
export const ICON_SHARE = require('@/assets/images/icons/share.png');
export const ICON_BACK = require('@/assets/images/icons/back.png');
export const ICON_STAR = require('@/assets/images/icons/star.png');
export const ICON_AD = require('@/assets/images/icons/ad.png');
export const ICON_EMOJI = require('@/assets/images/icons/emoji.png');
export const ICON_UP = require('@/assets/images/icons/up.png');
export const ICON_DOWN = require('@/assets/images/icons/down.png');
export const ICON_MORE = require('@/assets/images/icons/more.png');
export const ICON_SEND = require('@/assets/images/icons/send.png');
export const ICON_EDIT = require('@/assets/images/icons/edit.png');
export const ICON_LISTLINE = require('@/assets/images/icons/listline.png');
export const ICON_HEARTLINE = require('@/assets/images/icons/heartline.png');
export const ICON_CAMERAFILL = require('@/assets/images/icons/camerafill.png');
export const ICON_CAMERA = require('@/assets/images/icons/camera.png');
export const ICON_WECHAT = require('@/assets/images/icons/wechat.png');
export const ICON_TIKTOK = require('@/assets/images/icons/tiktok.png');
export const ICON_USER = require('@/assets/images/icons/user.png');
export const ICON_USERLOCK = require('@/assets/images/icons/userlock.png');
export const ICON_EMAIL = require('@/assets/images/icons/email.png');
export const ICON_EYE = require('@/assets/images/icons/eye.png');
export const ICON_EYEOFF = require('@/assets/images/icons/eyeoff.png');
export const ICON_COMMENTPOST = require('@/assets/images/icons/commentpost.png');
export const ICON_CLOSE = require('@/assets/images/icons/close.png');
export const ICON_SELECTALL = require('@/assets/images/icons/selectall.png');
export const ICON_SELECTALLOFF = require('@/assets/images/icons/selectalloff.png');
export const ICON_CHECK = require('@/assets/images/icons/check.png');
export const ICON_CHECKONE = require('@/assets/images/icons/checkone.png');
export const ICON_CHECKONEOFF = require('@/assets/images/icons/checkoneoff.png');
export const ICON_REPLY = require('@/assets/images/icons/reply.png');
export const ICON_COPY = require('@/assets/images/icons/copy.png');
export const ICON_DELETE = require('@/assets/images/icons/delete.png');
export const ICON_PLAY = require('@/assets/images/icons/play.png');
export const ICON_PAUSE = require('@/assets/images/icons/pause.png');
export const ICON_PLAYFILL = require('@/assets/images/icons/playfill.png');
export const ICON_PAUSEFILL = require('@/assets/images/icons/pausefill.png');
export const ICON_MUSIC = require('@/assets/images/icons/music.png');
export const ICON_FLIP = require('@/assets/images/icons/flip.png');
export const ICON_SPEED = require('@/assets/images/icons/speed.png');
export const ICON_BEAUTY = require('@/assets/images/icons/beauty.png');
export const ICON_FILTER = require('@/assets/images/icons/filter.png');
export const ICON_TIMER = require('@/assets/images/icons/timer.png');
export const ICON_UNION = require('@/assets/images/icons/union.png');
export const ICON_CAPTURE = require('@/assets/images/icons/capture.png');
export const ICON_RECORDSTART = require('@/assets/images/icons/recordstart.png');
export const ICON_RECORDSTOP = require('@/assets/images/icons/recordstop.png');
export const ICON_CONFIRM = require('@/assets/images/icons/confirm.png');
export const ICON_SAVE = require('@/assets/images/icons/save.png');
export const ICON_CANCEL = require('@/assets/images/icons/cancel.png');
export const ICON_MOVIE = require('@/assets/images/icons/movie.png');
export const ICON_EFFECT = require('@/assets/images/icons/effect.png');
export const ICON_SPLIT = require('@/assets/images/icons/split.png');
export const ICON_PHOTO = require('@/assets/images/icons/photo.png');
export const ICON_VIDEO = require('@/assets/images/icons/video.png');
export const ICON_ALBUM = require('@/assets/images/icons/album.png');
export const ICON_AVATAR = require('@/assets/images/icons/avatar.png');

export const IMAGE_BG = require('@/assets/images/hd/bg (1).png')
export const IMAGE_BG2 = require('@/assets/images/hd/bg (2).png')
export const IMAGE_BG3 = require('@/assets/images/hd/bg (3).png')
export const IMAGE_BG4 = require('@/assets/images/hd/bg (4).png')
export const IMAGE_BG5 = require('@/assets/images/hd/bg (5).png')
export const IMAGE_BG6 = require('@/assets/images/hd/bg (6).png')
export const IMAGE_BG7 = require('@/assets/images/hd/bg (7).png')
export const IMAGE_BG8 = require('@/assets/images/hd/bg (8).png')
export const IMAGE_BG9 = require('@/assets/images/hd/bg (9).png')
export const IMAGE_BG10 = require('@/assets/images/hd/bg (10).png')

export const CHINESE_EMOJI_LANG = {
    recently_used: '最近使用',
    smileys_emotion: '笑脸与情感',
    people_body: '人物与身体',
    animals_nature: '动物与自然',
    food_drink: '食物与饮料',
    travel_places: '旅行与地点',
    activities: '活动',
    objects: '物体',
    symbols: '符号',
    flags: '旗帜',
    search: '搜索',
};