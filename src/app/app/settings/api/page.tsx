import { listKeys } from "./actions";
import { ApiKeysUi } from "./api-keys-ui";

export default async function ApiKeysPage() {
  const keys = await listKeys();
  return <ApiKeysUi initialKeys={keys} />;
}
