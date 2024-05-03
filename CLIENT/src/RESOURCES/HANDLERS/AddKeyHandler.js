import { v4 } from "uuid";

export default function AddKeyHandler(data) {
  return data.map((e) => (e = { ...e, key: v4() }));
}
