import { Platform, StatusBar } from "react-native";
import { Dimensions } from "react-native";

export const STATUSBAR_HEIGHT = Platform.OS === "android" ? StatusBar.currentHeight : 0;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const TEST_SCREEN_WIDTH = 1440;
export const TEST_SCREEN_HEIGHT = 3120;
export const WIDTH_SCALL = SCREEN_WIDTH / TEST_SCREEN_WIDTH;
export const HEIGHT_SCALL = SCREEN_HEIGHT / TEST_SCREEN_HEIGHT;

export const TRANSPARENT_BACKGROUND_COLOR = 'rgba(255, 255, 255, 0)';
export const WHITE_BACKGROUND_COLOR = 'rgba(255, 255, 255, 1)';
export const BACKGROUND_GRADIENT_COLOR = ['rgba(98, 126, 197, 1)', 'rgba(64, 39, 117, 1)', 'rgba(81, 0, 83, 1)'];

export const TEXT_FONT_SIZE = 12;
export const TEXT_COLOR = 'rgba(255, 255, 255, 0.5)';
export const TEXT_ACTIVE_COLOR = 'rgba(255, 255, 255, 1)';

export const LINE_COLOR = 'rgba(88, 119, 234, 1)';
export const LINE_ACTIVE_COLOR = 'rgba(41, 191, 255, 1)';

export const ICON_HOME = require('@/assets/images/icons/home.png');
export const ICON_SEARCH = require('@/assets/images/icons/search.png');
export const ICON_POST = require('@/assets/images/icons/post.png');
export const ICON_MESSEAGE = require('@/assets/images/icons/message.png');
export const ICON_PROFILE = require('@/assets/images/icons/profile.png');
export const ICON_USER = require('@/assets/images/icons/user.png');
export const ICON_ADD = require('@/assets/images/icons/add.png');
export const ICON_HEART = require('@/assets/images/icons/heart.png');
export const ICON_COMMENT = require('@/assets/images/icons/comment.png');
export const ICON_SHARE = require('@/assets/images/icons/share.png');

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