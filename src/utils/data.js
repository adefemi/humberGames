export const SITETITTLE = "HumberGames";
export const USERTOKEN = "hb_token";
export const SESSION_EXPIRY = "hb_session_expiry";

export const clientID = "default";
export const waitInterval = 5; // this is the time the system can be idle before the user is logged out

export const momentFullDateFormat = "YYYY-MM-DD H:m:s";

export const primaryColor = "#6541a4";
export const secondaryColor = "#ff683c";

export const durationSelector = [
  { title: "yearly", value: "yearly" },
  { title: "monthly", value: "monthly" },
  { title: "weekly", value: "weekly" },
  { title: "daily", value: "daily" },
  { title: "one off", value: "one_off" }
];

export const genderOptions = [
  { title: "male", value: "male" },
  { title: "female", value: "female" }
];

export const gameTypeSort = [
  { title: "All", value: "" },
  { title: "Number - type", value: "NUMBER" },
  { title: "Raffle - type", value: "RAFFLE" },
  { title: "Instant - mode", value: "INSTANT" },
  { title: "Scheduled - mode", value: "SCHEDULED" }
];

export const gameStatusSort = [
  { title: "All", value: "" },
  { title: "Active", value: "active" },
  { title: "Inactive", value: "inactive" }
];

export const gameTypeMainSort = [
  { title: "Number", value: "0" },
  { title: "Raffle", value: "1" }
];

export const ruleTypeMainSort = [
  { title: "Any Match", value: "0" },
  { title: "Sequence", value: "1" }
];

export const ruleTypeSort = [
  { title: "All", value: "" },
  { title: "Any Match", value: "ANY_MATCH" },
  { title: "Sequence", value: "SEQUENCE" }
];

export const conditionSort = [
  { title: "GamePlay", value: "0" },
  { title: "Time", value: "1" },
  { title: "Revenue", value: "2" },
  { title: "PrizeQuantity", value: "3" }
];

export const operatorSort = [
  { title: "Equals", value: "0" },
  { title: "Greater Than", value: "1" },
  { title: "Less Than", value: "2" }
];

export const gameModeSort = [
  { title: "Instant", value: "0" },
  { title: "Scheduled", value: "1" }
];

export const campaignChannelOptions = [
  { title: "IVR", value: "ivr" },
  { title: "SMS", value: "sms" },
  { title: "USSD", value: "ussd" }
];

export const campaignNetworkOptions = [
  { title: "MTN", value: "mtn" },
  { title: "GLO", value: "glo" },
  { title: "9MOBILE", value: "9mobile" }
];

export const timeSortOption = [
  { title: "All", value: "" },
  { title: "Newest first", value: "createdAt,asc" },
  { title: "Oldest first", value: "createdAt,desc" }
];

export const maritalStatusOption = [
  { title: "married", value: "married" },
  { title: "single", value: "single" },
  { title: "divorced", value: "divorced" }
];

export const countryCode = [
  { title: "+234", value: "234" },
  { title: "+41", value: "41" },
  { title: "+111", value: "111" }
];

export const statusMode = [
  { title: "All", value: "all" },
  { title: "Active", value: "active" },
  { title: "Inactive", value: "inactive" }
];

export const durationType = [
  { title: "Daily", value: "daily" },
  { title: "Weekly", value: "weekly" },
  { title: "Monthly", value: "monthly" }
];

export const rewardRuleTypes = [
  { title: "Client Customer Transaction", value: "ClientCustomerTransaction" },
  { title: "Client Customer Enroll", value: "ClientCustomerEnroll" }
];

export const ageRangeOptions = [
  { title: "0-17", value: "0-17" },
  { title: "18-24", value: "18-24" },
  { title: "25-34", value: "25-34" },
  { title: "35-45", value: "35-45" },
  { title: "46+", value: "46+" }
];

export const transactionTypeOptions = [
  { title: "Deposit", value: "Deposit" },
  { title: "Bill Payment", value: "BillPayment" },
  { title: "Airtime", value: "Airtime" },
  { title: "Fund Transfer", value: "Fund Transfer" }
];

export const transactionChannelOptions = [
  { title: "ATM", value: "ATM" },
  { title: "BANK", value: "BANK" },
  { title: "POS", value: "POS" },
  { title: "MOBILE", value: "MOBILE" },
  { title: "USSD", value: "USSD" }
];

export const ccEnRules = [
  { title: "Name", value: "name", type: "string" },
  { title: "Phone", value: "phone", type: "string" },
  { title: "DOB", value: "DOB", type: "date", format: "DD/MM" },
  {
    title: "Age Range",
    value: "AgeRange",
    type: "option",
    optionList: ageRangeOptions
  },
  { title: "State", value: "State", type: "string" },
  {
    title: "Gender",
    value: "Gender",
    type: "option",
    optionList: genderOptions
  },
  {
    title: "Account Create Date",
    value: "AccountCreateDate",
    type: "date",
    format: "YYYY-MM-DD"
  },
  {
    title: "Last Transaction Date",
    value: "LastTransactionDate",
    type: "date",
    format: "YYYY-MM-DD"
  },
  { title: "Balance", value: "Balance", type: "number" }
];

export const ccTRules = [
  { title: "Transaction Count", value: "TransactionCount", type: "number" },
  {
    title: "Transaction Type",
    value: "TransactionType",
    type: "option",
    optionList: transactionTypeOptions
  },
  {
    title: "Transaction Timestamp",
    value: "TransactionTimestamp",
    type: "date",
    format: "YYYY-MM-DD"
  },
  { title: "Transaction Amount", value: "TransactionAmount", type: "number" },
  { title: "Transaction Channel", value: "TransactionChannel", type: "number" }
];

export const ccMainRules = [
  { title: "Greater Than", value: "gt", optionTypes: ["date", "number"] },
  { title: "Less Than", value: "lt", optionTypes: ["date", "number"] },
  { title: "Equals", value: "eq", optionTypes: ["date", "number", "string"] },
  { title: "Contains", value: "ct", optionTypes: ["string"] }
];

export const winningRules = [
  { title: "ODDS_1_IN_100", value: "ODDS_1_IN_100" },
  { title: "ODDS_5_IN_3000", value: "ODDS_5_IN_3000" },
  { title: "ODDS_100_IN_100000", value: "ODDS_100_IN_100000" },
  { title: "ODDS_10_IN_10000", value: "ODDS_10_IN_10000" },
  { title: "ODDS_15_IN_25000", value: "ODDS_15_IN_25000" }
];

export const tempClientList = [
  {
    name: "Access",
    client_id:
      "staging_FyogPTOWjOOUDPh.TTb5xfWUUprCO.6eQuZIbFMs4HVL6HwYA66H4t5S3P92HBhElGYyh53yJeqAkwNsVEGwzrOpu-TZi1F._.Dn"
  }
];
