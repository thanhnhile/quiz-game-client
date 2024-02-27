import GameJoin from "./pages/GameJoin";
import GameStart from "./pages/GameStart";
import WaitingRoom from "./pages/WaitingRoom";

export type RouteItem = {
  path: string;
  component: any;
};

export const PUBLIC_ROUTES: RouteItem[] = [
  {
    path: "/",
    component: GameJoin,
  },
];

export const USER_ROUTES: RouteItem[] = [
  {
    path: "/start-game",
    component: GameStart,
  },
  {
    path: "/game-waiting/:code",
    component: WaitingRoom,
  },
];
