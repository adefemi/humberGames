import NoImage from "../assets/file.svg";

export const SITETITTLE = "Taskprox";
export const USERTOKEN = "rr_token";
export const USERDATA = "rr_user";

// cookies
export const USERDETAILS = "USERDETAILS";
export const USERROLE = "USERROLE";
export const FrontEndUrl = "https://rfrontend.clubly.io";

export const primaryColor = "#1CA0D7";
export const secondaryColor = "#f18910";
export const noImage = NoImage;

export const durationSelector = [
  { title: "yearly", value: "yearly" },
  { title: "monthly", value: "monthly" },
  { title: "weekly", value: "weekly" },
  { title: "daily", value: "daily" },
  { title: "one off", value: "one_off" }
];

export const genderOptions = [
  { title: "male", value: "male" },
  { title: "female", value: "female" },
  { title: "prefer not to say", value: "prefer_not_to_say" }
];

export const propertySortOptions = [
  { title: "All", value: "" },
  { title: "Date - newest", value: "desc" },
  { title: "Date - oldest", value: "asc" },
  { title: "Price - highest", value: "high" },
  { title: "Price - lowest", value: "low" }
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

export const sizeOptions = [
  { title: "SQM", value: "sqm" },
  { title: "SQFT", value: "sqft" }
];

export const currencyOptions = [
  { title: "NGN", value: "NGN" },
  { title: "USD", value: "USD" },
  { title: "GBP", value: "GBP" }
];

export const propertyStatusOption = [
  { title: "All", value: "" },
  { title: "Sold", value: "sold" },
  { title: "Rented", value: "rented" },
  { title: "Pending", value: "pending" },
  { title: "Published", value: "published" },
  { title: "Unpublished", value: "unpublished" }
];

export const leaseSortOptions = [
  { title: "All lease", value: "all" },
  { title: "Active lease", value: "active" },
  { title: "Pending lease", value: "pending" },
  { title: "Annulled lease", value: "annulled" }
];

export const leaseChargeSortOptions = [
  { title: "All Charge", value: "all" },
  { title: "Paid Charge", value: "paid" },
  { title: "Pending Charge", value: "pending" }
];

export const inspectionSortOptions = [
  { title: "All", value: "all" },
  { title: "Pending", value: "pending" },
  { title: "Completed", value: "completed" },
  { title: "Failed", value: "failed" }
];

export const getNoImage = () => NoImage;

export const maxPercent = 10;
export const minPercent = 5;
export const rentrightPercent = 25;
export const loginUrl = "https://rfrontend.clubly.io/login";
