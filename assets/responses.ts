type TResponse = {
  status: any;
  message: string;
  data?: {};
};

export const responses: Record<string, Record<string, TResponse>> = {
  login: {
    error: { status: 401, message: "Please check the email and password." },
    success: { status: 200, message: "Success." },
  },
  projects: {
    error: { status: 401, message: "Failed to fetch projects." },
    success: { status: 200, message: "Success." },
  },
  current: {
    error: { status: 401, message: "Do not found user." },
    success: { status: 200, message: "Success." },
  },
  general: {
    notfound: { status: 404, message: "Not found" },
    badrequest: { status: 400, message: "Bad request" },
    zoderror: { status: 400, message: "Invalid type" },
    membernotfound: { status: 401, message: "Unauthorized Member not found" },
    servererror: { status: 500, message: "Internal Server Error" },
    error: { status: 401, message: "Error." },
    success: { status: 200, message: "Success." },
  },
};
