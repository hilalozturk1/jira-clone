
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { deleteCookie, setCookie } from "hono/cookie";

import { AUTH_COOKIE } from "../constants";
import { loginSchema, registerSchema } from "../schemas";
import { responses } from "../../../../assets/responses";

import { ID } from "node-appwrite";
import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";

const app = new Hono()
  .get(
    //current user
    "/current",
    sessionMiddleware,
    (c) => {
      try {
        const user = c.get("user");

        return c.json({
          data: user,
          status: responses.current.success.status,
          message: responses.current.success.message,
        });
      } catch (error) {
        console.log("error :>> ", error);
        error === "Unauthorized" && responses.current.error.status;
        return c.json({
          data: [],
          status: responses.current.success.status,
          message: responses.current.success.message,
        });
      }
    }
  )
  .post(
    //login
    "/login",
    zValidator("json", loginSchema, (result, c) => {
      console.log("result :>> ", result);
      if (!result.success) {
        return c.text("Invalid!", 400);
      }
    }),
    async (c) => {
      const { email, password } = c.req.valid("json");

      try {
        const auth: any = process.env.NEXT_PUBLIC_AUTH_COOKIE;
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(
          email,
          password
        );
        setCookie(c, auth, session.secret, {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 30,
        });
      } catch (e) {
        return c.json({
          status: responses.login.error.status,
          message: responses.login.error.message,
        });
      }
      return c.json({
        status: responses.general.success.status,
        message: responses.general.success.message,
      });
    }
  )
  .post(
    //register
    "/register",
    zValidator("json", registerSchema),
    async (c) => {
    try {
      const { name, email, password } = c.req.valid("json");

      const { account } = await createAdminClient();
      const user = await account.create(ID.unique(), email, password, name);

      const session = await account.createEmailPasswordSession(email, password);

      /*setCookie(c, AUTH_COOKIE, session.secret, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30
            });*/

      return c.json({ success: "ok" });
    } catch (error:any) {
      const errorMessage = {status: error.code, message: error.message};
      return c.json({ error: errorMessage });
    }
    }
  )
  .post(
    //logout
    "/logout",
    sessionMiddleware,
    async (c) => {
      try {
        const account = c.get("account");

        deleteCookie(c, AUTH_COOKIE);
        await account.deleteSession("current");
        return c.json({
          status: responses.general.success.status,
          message: responses.general.success.message,
        });
      } catch (error) {
        return c.json({
          status: responses.general.unauthorized.status,
          message: responses.general.unauthorized.message,
        });
      }
    }
  );

export default app;
