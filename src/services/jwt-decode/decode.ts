import jwt from "jsonwebtoken";

type TokenProps = {
  sub: string;
  role:
    | "INTERNAL_MANAGEMENT"
    | "INTERNAL_PARTNERS"
    | " INTERNAL_FINANCIAL_LEGAL"
    | "CLIENT_RESPONSIBLE"
    | "CLIENT_OWNER"
    | "CLIENT_USER";
  iat: number;
};

export function decodeToken(token: string): TokenProps | null {
  try {
    const decoded = jwt.decode(token);
    return decoded as TokenProps;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
}
