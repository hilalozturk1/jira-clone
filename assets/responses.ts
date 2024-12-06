type TResponse = {
  status: any;
  message: string;
};

export const responses: Record<string, Record<string, TResponse>> = {
  login: {
    error: { status: 401, message: "Please check the email and password." },
    success: { status: 200, message: "Success." },
  },
};
