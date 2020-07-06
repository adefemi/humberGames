const stagingBaseUrl = "https://staging.api.humbergames.com/";
const stagingGameUrl = "https://staging.gaming-service.humbergames.com/";

const productionBaseUrl = "https://api.humbergames.com/";
const productionGameUrl = "https://gaming-service.humbergames.com/";

const host = window.location.host.split(".");

export const BASE_URL =
  host[0] === "client" ? productionBaseUrl : stagingBaseUrl;

export const USER_BASE_URL = BASE_URL + "users/v1/";
export const RESET_CODE_URL = USER_BASE_URL + "passwords/reset";
export const CAMPAIGN_BASE_URL = BASE_URL + "campaigns/v1";
export const ETL_BASE_URL = BASE_URL + "etl-filter/";
export const NOTIFICATION_BASE_URL = BASE_URL + "notifications/v1/";
export const GAME_BASE_URL =
  host[0] === "client" ? productionGameUrl : stagingGameUrl;

export const LOGIN_URL = USER_BASE_URL + "auths/login";
export const ROLES_URL = USER_BASE_URL + "roles";
export const FILE_UPLOAD_URL = USER_BASE_URL + "auths/login";
export const NOTIFICATIONS_URL = USER_BASE_URL + "auths/login";
export const USER_ME_URL = USER_BASE_URL + "auths/me";
export const USER_URL = USER_BASE_URL + "users";
export const tempToken = "";
export const GAME_URL = GAME_BASE_URL + "games";
export const GAME_BUNDLE_URL = GAME_BASE_URL + "gameBundles";
export const GAME_BUNDLE_TRANSACTION_URL =
  GAME_BASE_URL + "gameBundleTransactions";
export const CLIENT_SETTING = GAME_BASE_URL + "clientSettings";
export const GAME_INSTANCE_URL = GAME_BASE_URL + "gameInstances";
export const PAYOUT_URL = GAME_BASE_URL + "payout/";
export const CUSTOMER_WINNING_URL = GAME_BASE_URL + "playerWinnings";
export const GAME_TRANSACTION_URL = GAME_BASE_URL + "gameTransactions";
export const GAME_PRICE_URL = GAME_BASE_URL + "prizes";
export const CLIENT_CREATE_URL = USER_BASE_URL + "clients/create";
export const CLIENT_FETCH_URL = USER_BASE_URL + "clients/fetch";
export const USER_FETCH_URL = USER_BASE_URL + "users";
export const WINNING_RULE_URL = GAME_BASE_URL + "winningRules";
export const WINNING_CONDITION_URL = GAME_BASE_URL + "winningConditions";
export const GAME_LICENSE_URL = GAME_BASE_URL + "gameLicenses";
export const GAME_PLAY_URL = GAME_BASE_URL + "play/";
export const REWARDS_URL = GAME_BASE_URL + "rewards";
export const ANALYTICS_KPI_URL = GAME_BASE_URL + "analytics/kpi/";
export const ANALYTICS_GRAPH_URL = GAME_BASE_URL + "analytics/graph/";
export const CAMPAIGN_URL = CAMPAIGN_BASE_URL;
export const ETL_FILTER_URL = GAME_BASE_URL + "etl/proxy";
export const NOTIFICATION_LOGS_URL = NOTIFICATION_BASE_URL + "sms/logs";
export const DRAWS_URL = GAME_BASE_URL + "draws";
export const DRAW_EXECUTE_DRAW_URL = GAME_BASE_URL + "execute/draw/";
export const DRAW_EXECUTE_QUALIFY_URL = GAME_BASE_URL + "execute/qualify/";
export const NOTIFICATION_STATUS_URL =
  NOTIFICATION_BASE_URL + "sms/status?campaignId=";
