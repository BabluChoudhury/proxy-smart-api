import { own_db } from "./lib/custom";
import { typesModemSales, typesResellerData } from "./lib/utils/types";

async function test() {
  try {
    const conn = own_db();
    const reseller = conn
      ?.prepare("SELECT * FROM resellers WHERE api_key=?")
      .get("98D3E15B1DAEA35757B5BDFE5F2D3374") as typesResellerData;
    console.log(reseller);
    const modemQuery = conn
      ?.prepare("SELECT * FROM modems WHERE (id=? OR IMEI=?) AND sold_to=?")
      .get(
        "860493043298989",
        "860493043298989",
        reseller.telegram
      ) as typesModemSales;
    conn?.close;

    console.log(modemQuery);
  } catch (_e) {
    console.warn(_e);
  }
}
test();
