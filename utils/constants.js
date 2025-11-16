module.exports = {
  // 超级管理员的用户Id
  ADMIN_USER_ID: 1,

  // Token相关
  USER_TOKEN: "user_token_",
  ADMIN_TOKEN: "admin_token_",
  USER_TOKEN_INTERVAL: "user_token_interval_",
  ADMIN_TOKEN_INTERVAL: "admin_token_interval_",
  USER_ACCESS_TOKEN: "user_access_token_",
  ADMIN_ACCESS_TOKEN: "admin_access_token_",
  TOKEN_HEADER: "Authorization",

  // Token过期时间：10天 (秒)
  TOKEN_EXPIRE: 864000,
  TOKEN_INTERVAL: 43200, // 12小时

  // 保存次数
  SAVE_COUNT_IP: "save_count_ip_",
  SAVE_COUNT_USER_ID: "save_count_user_id_",
  SAVE_EXPIRE: 86400,
  SAVE_MAX_COUNT: 15,

  // IP历史记录缓存
  IP_HISTORY: "ip_history",
  IP_HISTORY_STATISTICS: "ip_history_statistics",
  IP_HISTORY_PROVINCE: "ip_history_province",
  IP_HISTORY_IP: "ip_history_ip",
  IP_HISTORY_HOUR: "ip_history_hour",
  IP_HISTORY_COUNT: "ip_history_count",

  // Code过期时间：1天
  CODE_EXPIRE: 86400,

  // 用户相关
  ADMIN: "admin",
  ADMIN_FAMILY: "adminFamily",
  FAMILY_LIST: "familyList",
  USER_CACHE: "user_",
  USER_ARTICLE_LIST: "user_article_list_",

  // 邮件相关
  COMMENT_IM_MAIL: "comment_im_mail_",
  CODE_MAIL: "code_mail_",
  COMMENT_IM_MAIL_COUNT: 1,
  CODE_MAIL_COUNT: 3,
  USER_CODE: "user_code_",
  FORGET_PASSWORD: "forget_password_",

  // 网站相关
  WEB_INFO: "webInfo",
  SORT_INFO: "sortInfo",
  ADMIRE: "admire",

  // 密钥
  CRYPOTJS_KEY: "aoligeimeimaobin",

  // 文章相关
  ARTICLE_LIST: "article_list",
  SORT_ARTICLE_LIST: "sort_article_list",
  COMMENT_COUNT_CACHE: "comment_count_",

  // 默认缓存过期时间
  EXPIRE: 1800,

  // 树洞一次最多查询条数
  TREE_HOLE_COUNT: 200,

  // 顶层评论ID
  FIRST_COMMENT: 0,

  // 文章摘要默认字数
  SUMMARY: 80,

  // 留言的源
  TREE_HOLE_COMMENT_SOURCE: 0,

  // 资源类型
  PATH_TYPE_GRAFFITI: "graffiti",
  PATH_TYPE_ARTICLE_PICTURE: "articlePicture",
  PATH_TYPE_USER_AVATAR: "userAvatar",
  PATH_TYPE_ARTICLE_COVER: "articleCover",
  PATH_TYPE_WEB_BACKGROUND_IMAGE: "webBackgroundImage",
  PATH_TYPE_WEB_AVATAR: "webAvatar",
  PATH_TYPE_RANDOM_AVATAR: "randomAvatar",
  PATH_TYPE_RANDOM_COVER: "randomCover",
  PATH_TYPE_COMMENT_PICTURE: "commentPicture",
  PATH_TYPE_INTERNET_MEME: "internetMeme",
  PATH_TYPE_IM_GROUP_AVATAR: "im/groupAvatar",
  PATH_TYPE_IM_GROUP_MESSAGE: "im/groupMessage",
  PATH_TYPE_IM_FRIEND_MESSAGE: "im/friendMessage",
  PATH_TYPE_FUNNY_URL: "funnyUrl",
  PATH_TYPE_FUNNY_COVER: "funnyCover",
  PATH_TYPE_FAVORITES_COVER: "favoritesCover",
  PATH_TYPE_LOVE_COVER: "love/bgCover",
  PATH_TYPE_LOVE_MAN: "love/manCover",
  PATH_TYPE_LOVE_WOMAN: "love/womanCover",
  PATH_TYPE_VIDEO_ARTICLE: "video/article",
  PATH_TYPE_ASSETS: "assets",

  // 资源路径
  RESOURCE_PATH_TYPE_FRIEND: "friendUrl",
  RESOURCE_PATH_TYPE_FUNNY: "funny",
  RESOURCE_PATH_TYPE_FAVORITES: "favorites",
  RESOURCE_PATH_TYPE_LOVE_PHOTO: "lovePhoto",

  // 微言
  WEIYAN_TYPE_FRIEND: "friend",
  WEIYAN_TYPE_NEWS: "news",

  // 友情链接
  DEFAULT_FRIEND: "🏆友情链接",

  // 用户类型
  USER_TYPE_ADMIN: 0,
  USER_TYPE_DEV: 1,
  USER_TYPE_NORMAL: 2
};
