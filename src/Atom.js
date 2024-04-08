import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const voteState = atom({
  key: "voteState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom({
  key: "userState",
  default: {
    name: "",
    id: "",
    img: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const isUser = atom({
  key:'isUser',
  default:false,
})
